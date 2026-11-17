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
  /** The same curve continued for t = years + 1..years + FORECAST_YEARS, with unchanged assumptions. */
  forecast: number[];
  startValue: number;
  residualValue: number;
  autoResidualValue: number;
};

/** Years the cost curves are extrapolated beyond the chosen period. */
export const FORECAST_YEARS = 2;

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

/** Price in each year of the period, growing by a fixed percentage from the start price. */
export function priceTrajectory(startPrice: number, growthPct: number, years: number): number[] {
  return Array.from({ length: years }, (_, i) => startPrice * Math.pow(1 + growthPct / 100, i));
}

/** Mileage the yearly depreciation rates assume (KBA 2025: 10,616 km per car, 11,312 km per EV). */
export const REFERENCE_KM_PER_YEAR = 11_000;

/**
 * Value lost per 10,000 km driven above the reference, at the same age, and gained
 * below it. US listings show about 3 % for combustion cars and EVs alike
 * (Roberson et al. 2024).
 */
const VALUE_LOSS_PER_10000_KM = 0.03;

/** Yearly value loss at the given mileage. A car does not gain value by standing still. */
export function effectiveDepreciationPct(depreciationPct: number, kmPerYear: number): number {
  const ageFactor = 1 - depreciationPct / 100;
  const mileageFactor = Math.pow(1 - VALUE_LOSS_PER_10000_KM, (kmPerYear - REFERENCE_KM_PER_YEAR) / 10_000);
  return Math.max(0, (1 - ageFactor * mileageFactor) * 100);
}

type ValueTrajectory = { start: number; residual: number; autoResidual: number; path: number[] };

/**
 * Value at the start of each year, through the forecast horizon. Exponential
 * when both ends are positive, so the forecast keeps the yearly rate. Linear
 * otherwise (an exponential path cannot reach or leave zero), and then flat
 * after the chosen period, because a value cannot drop below zero.
 */
function valueTrajectory(
  start: number,
  depreciationPct: number,
  residualOverride: number | null,
  years: number,
): ValueTrajectory {
  const autoResidual = start * Math.pow(1 - depreciationPct / 100, years);
  const residual = residualOverride ?? autoResidual;
  const path = Array.from({ length: years + FORECAST_YEARS + 1 }, (_, t) => {
    if (start > 0 && residual > 0) return start * Math.pow(residual / start, t / years);
    return t <= years ? start + ((residual - start) * t) / years : residual;
  });
  return { start, residual, autoResidual, path };
}

function buildSide(
  value: ValueTrajectory,
  oneOffEur: number,
  years: number,
  amountsInYear: (yearIndex: number) => YearlyAmounts,
): SideResult {
  const horizon = years + FORECAST_YEARS;
  const yearly = Array.from({ length: horizon }, (_, i) => amountsInYear(i));
  const running = yearly.map((amounts) =>
    RECURRING_CATEGORIES.reduce((sum, { key, sign }) => sum + sign * amounts[key], 0),
  );
  const inPeriod = yearly.slice(0, years);

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
  for (const { key, sign } of RECURRING_CATEGORIES) {
    costs[key] = sign * inPeriod.reduce((sum, amounts) => sum + amounts[key], 0);
  }

  const cumulative: number[] = [];
  let paidSoFar = oneOffEur;
  for (let t = 0; t <= horizon; t++) {
    cumulative.push(paidSoFar + (value.start - value.path[t]));
    if (t < horizon) paidSoFar += running[t];
  }

  return {
    costs,
    total: Object.values(costs).reduce((a, b) => a + b, 0),
    yearlyRunning: running.slice(0, years),
    curve: cumulative.slice(0, years + 1),
    forecast: cumulative.slice(years + 1),
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
  const horizon = years + FORECAST_YEARS;
  const fuelPrices = priceTrajectory(ice.fuelPriceEurPerL, ice.fuelPriceGrowthPct, horizon);
  const powerPrices = priceTrajectory(mix.avgPriceEurPerKwh, ev.electricityPriceGrowthPct, horizon);

  const iceValue = valueTrajectory(
    ice.valueEur,
    effectiveDepreciationPct(ice.depreciationPct, km),
    ice.residualOverrideEur,
    years,
  );
  const evValue = valueTrajectory(
    ev.priceEur,
    effectiveDepreciationPct(ev.depreciationPct, km),
    ev.residualOverrideEur,
    years,
  );

  const iceSide = buildSide(
    iceValue,
    ice.oneOffRepairEur + (isBuy ? ice.purchaseFeesEur : 0),
    years,
    (i) => ({
      interest: rate * iceValue.path[i],
      energy: litersPerYear * fuelPrices[i],
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
    energy: kwhPerYear * powerPrices[i],
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
