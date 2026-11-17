import type { CalculatorInputs, EvInputs } from './inputs';
import { evAnnualTaxAfterExemption, evTaxExemptUntilYear } from './tax';

/**
 * Cost categories in breakdown order. Benefits are stored as negative
 * amounts so every total is a plain sum.
 */
export const COST_CATEGORIES = [
  { key: 'depreciation', sign: 1 },
  { key: 'interest', sign: 1 },
  { key: 'energy', sign: 1 },
  { key: 'tax', sign: 1 },
  { key: 'insurance', sign: 1 },
  { key: 'maintenance', sign: 1 },
  { key: 'tires', sign: 1 },
  { key: 'inspection', sign: 1 },
  { key: 'batteryReserve', sign: 1 },
  { key: 'oneOff', sign: 1 },
  { key: 'thgPremium', sign: -1 },
  { key: 'otherBenefits', sign: -1 },
] as const;

export type CostCategory = (typeof COST_CATEGORIES)[number]['key'];
type RecurringCategory = Exclude<CostCategory, 'depreciation' | 'oneOff'>;
/** Unsigned amounts for one year; the registry sign is applied when summing. */
type YearlyAmounts = Record<RecurringCategory, number>;

const RECURRING_CATEGORIES = COST_CATEGORIES.filter(
  (c): c is Extract<(typeof COST_CATEGORIES)[number], { key: RecurringCategory }> =>
    c.key !== 'depreciation' && c.key !== 'oneOff',
);

export type SideResult = {
  costs: Record<CostCategory, number>;
  total: number;
  /** Running costs per year, including interest and benefits, excluding depreciation and one-offs. */
  yearlyRunning: number[];
  /** Cumulative cost if the car is sold after t years, t = 0..years. */
  curve: number[];
  startValue: number;
  residualValue: number;
  autoResidualValue: number;
};

export type ChargingMix = { home: number; ac: number; dc: number; avgPriceEurPerKwh: number };

export type TcoResult = {
  years: number;
  ice: SideResult;
  ev: SideResult;
  mix: ChargingMix;
  evTaxAfterExemption: number;
  evExemptUntilYear: number;
  litersTotal: number;
  kwhTotal: number;
};

export function chargingMix(ev: EvInputs): ChargingMix {
  const home = ev.homeSharePct / 100;
  const dc = ((1 - home) * ev.dcShareOfRestPct) / 100;
  const ac = 1 - home - dc;
  const avgPriceEurPerKwh = (home * ev.homePriceCt + ac * ev.acPriceCt + dc * ev.dcPriceCt) / 100;
  return { home, ac, dc, avgPriceEurPerKwh };
}

type ValueTrajectory = { start: number; residual: number; autoResidual: number; path: number[] };

/**
 * Value at the start of each year. Exponential when both ends are positive,
 * linear otherwise (an exponential path cannot reach or leave zero).
 */
function valueTrajectory(
  start: number,
  depreciationPct: number,
  residualOverride: number | null,
  years: number,
): ValueTrajectory {
  const autoResidual = start * Math.pow(1 - depreciationPct / 100, years);
  const residual = residualOverride ?? autoResidual;
  const path = Array.from({ length: years + 1 }, (_, t) =>
    start > 0 && residual > 0
      ? start * Math.pow(residual / start, t / years)
      : start + ((residual - start) * t) / years,
  );
  return { start, residual, autoResidual, path };
}

function buildSide(
  value: ValueTrajectory,
  oneOffEur: number,
  years: number,
  amountsInYear: (yearIndex: number) => YearlyAmounts,
): SideResult {
  const yearly = Array.from({ length: years }, (_, i) => amountsInYear(i));
  const signedTotal = (key: RecurringCategory, sign: number) =>
    sign * yearly.reduce((sum, amounts) => sum + amounts[key], 0);
  const yearlyRunning = yearly.map((amounts) =>
    RECURRING_CATEGORIES.reduce((sum, { key, sign }) => sum + sign * amounts[key], 0),
  );

  const costs: Record<CostCategory, number> = {
    depreciation: value.start - value.residual,
    oneOff: oneOffEur,
    interest: 0,
    energy: 0,
    tax: 0,
    insurance: 0,
    maintenance: 0,
    tires: 0,
    inspection: 0,
    batteryReserve: 0,
    thgPremium: 0,
    otherBenefits: 0,
  };
  for (const { key, sign } of RECURRING_CATEGORIES) costs[key] = signedTotal(key, sign);

  const curve: number[] = [];
  let paidSoFar = oneOffEur;
  for (let t = 0; t <= years; t++) {
    curve.push(paidSoFar + (value.start - value.path[t]));
    if (t < years) paidSoFar += yearlyRunning[t];
  }

  return {
    costs,
    total: Object.values(costs).reduce((a, b) => a + b, 0),
    yearlyRunning,
    curve,
    startValue: value.start,
    residualValue: value.residual,
    autoResidualValue: value.autoResidual,
  };
}

export function computeTco(inputs: CalculatorInputs, kmOverride?: number): TcoResult {
  const { scenario, ice, ev } = inputs;
  const years = Math.max(1, Math.round(scenario.years));
  const km = kmOverride ?? scenario.kmPerYear;
  const rate = scenario.interestRatePct / 100;
  const isBuy = scenario.mode === 'buy';

  const mix = chargingMix(ev);
  const evExemptUntilYear = evTaxExemptUntilYear(ev.firstRegistrationYear);
  const evTaxAfterExemption = evAnnualTaxAfterExemption(ev.grossWeightKg);
  const litersPerYear = (km * ice.consumptionLPer100) / 100;
  const kwhPerYear = ((km * ev.consumptionKwhPer100) / 100) * (1 + ev.chargingLossPct / 100);

  const iceValue = valueTrajectory(ice.valueEur, ice.depreciationPct, ice.residualOverrideEur, years);
  const evValue = valueTrajectory(ev.priceEur, ev.depreciationPct, ev.residualOverrideEur, years);

  const iceSide = buildSide(
    iceValue,
    ice.oneOffRepairEur + (isBuy ? ice.purchaseFeesEur : 0),
    years,
    (i) => ({
      interest: rate * iceValue.path[i],
      energy: litersPerYear * ice.fuelPriceEurPerL * Math.pow(1 + ice.fuelPriceGrowthPct / 100, i),
      tax: ice.annualTaxEur,
      insurance: ice.insuranceEur,
      maintenance: ice.maintenanceEur,
      tires: ice.tiresEur,
      inspection: ice.inspectionEur,
      batteryReserve: 0,
      thgPremium: 0,
      otherBenefits: 0,
    }),
  );

  const evSide = buildSide(evValue, ev.wallboxEur + ev.purchaseFeesEur, years, (i) => ({
    interest: rate * evValue.path[i],
    energy: kwhPerYear * mix.avgPriceEurPerKwh * Math.pow(1 + ev.electricityPriceGrowthPct / 100, i),
    tax: scenario.startYear + i > evExemptUntilYear ? evTaxAfterExemption : 0,
    insurance: ev.insuranceEur,
    maintenance: ev.maintenanceEur,
    tires: ev.tiresEur,
    inspection: ev.inspectionEur,
    batteryReserve: ev.batteryReserveEur,
    thgPremium: ev.thgPremiumEur,
    otherBenefits: ev.otherBenefitsEur,
  }));

  return {
    years,
    ice: iceSide,
    ev: evSide,
    mix,
    evTaxAfterExemption,
    evExemptUntilYear,
    litersTotal: litersPerYear * years,
    kwhTotal: kwhPerYear * years,
  };
}
