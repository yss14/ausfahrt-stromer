import type { CalculatorInputs } from './inputs';
import { computeTco, type TcoResult } from './tco';

/** Below this absolute difference the two options count as a tie. */
const TIE_THRESHOLD_EUR = 50;
export const BREAK_EVEN_KM_CAP = 150_000;
const BREAK_EVEN_KM_STEP = 500;

export type BreakEvenKm =
  { kind: 'always' } | { kind: 'never' } | { kind: 'tooHigh' } | { kind: 'at'; km: number };

/**
 * Annual mileage from which the EV is cheaper. The cost difference is linear
 * in mileage, so two evaluations are enough to solve for the root.
 */
export function breakEvenKmPerYear(inputs: CalculatorInputs): BreakEvenKm {
  const diffAt = (km: number) => {
    const result = computeTco(inputs, km);
    return result.ev.total - result.ice.total;
  };
  const d0 = diffAt(0);
  const slope = (diffAt(10_000) - d0) / 10_000;
  if (slope >= 0) return { kind: 'never' };
  const km = -d0 / slope;
  if (km <= 0) return { kind: 'always' };
  if (km > BREAK_EVEN_KM_CAP) return { kind: 'tooHigh' };
  return { kind: 'at', km: Math.ceil(km / BREAK_EVEN_KM_STEP) * BREAK_EVEN_KM_STEP };
}

const curveDiff = (result: TcoResult) => result.ev.curve.map((v, t) => v - result.ice.curve[t]);

export type BreakEvenYear =
  { kind: 'at'; years: number } | { kind: 'immediately' } | { kind: 'notWithin'; evBehind: boolean };

/** When the EV, starting behind, catches up with the combustion car. */
export function breakEvenYear(result: TcoResult): BreakEvenYear {
  const diff = curveDiff(result);
  for (let t = 1; t <= result.years; t++) {
    if (diff[t - 1] > 0 && diff[t] <= 0) {
      return { kind: 'at', years: t - 1 + diff[t - 1] / (diff[t - 1] - diff[t]) };
    }
  }
  const end = diff[result.years];
  if (diff[0] <= 0 && end <= 0) return { kind: 'immediately' };
  return { kind: 'notWithin', evBehind: end > 0 };
}

export type CurveCrossing = { years: number; costEur: number; inForecast: boolean };

/** First point where the cost curves cross in either direction, forecast years included. */
export function firstCurveCrossing(result: TcoResult): CurveCrossing | null {
  const ice = [...result.ice.curve, ...result.ice.forecast];
  const ev = [...result.ev.curve, ...result.ev.forecast];
  for (let t = 1; t < ice.length; t++) {
    const prev = ev[t - 1] - ice[t - 1];
    const next = ev[t] - ice[t];
    if ((prev > 0 && next <= 0) || (prev < 0 && next >= 0)) {
      const fraction = prev / (prev - next);
      const years = t - 1 + fraction;
      return {
        years,
        costEur: ice[t - 1] + (ice[t] - ice[t - 1]) * fraction,
        inForecast: years > result.years,
      };
    }
  }
  return null;
}

export type CashNeeded = {
  /** Extra money the EV option needs today compared with the combustion option. */
  eur: number;
  basis: 'buyBoth' | 'afterTradeIn' | 'evOnly';
};

export function cashNeededToday({ scenario, ice, ev }: CalculatorInputs): CashNeeded {
  const evOneOffs = ev.priceEur + ev.wallboxEur + ev.purchaseFeesEur;
  if (scenario.mode === 'buy') {
    const iceOneOffs = ice.valueEur + ice.purchaseFeesEur + ice.oneOffRepairEur;
    return { eur: evOneOffs - iceOneOffs, basis: 'buyBoth' };
  }
  return {
    eur: evOneOffs - ice.valueEur - ice.oneOffRepairEur,
    basis: ice.valueEur > 0 ? 'afterTradeIn' : 'evOnly',
  };
}

const KG_CO2_PER_LITER = { petrol: 2.37, diesel: 2.65 } as const;
/** German grid mix 2025, power plant emissions only (UBA estimate: 344 g/kWh). */
export const KG_CO2_PER_KWH = 0.34;

export function co2Tonnes(result: TcoResult, inputs: CalculatorInputs): { ice: number; ev: number } {
  return {
    ice: (result.litersTotal * KG_CO2_PER_LITER[inputs.ice.fuel]) / 1000,
    ev: (result.kwhTotal * KG_CO2_PER_KWH) / 1000,
  };
}

export type Verdict =
  { kind: 'tie' } | { kind: 'evCheaper'; diff: number } | { kind: 'iceCheaper'; diff: number };

export function verdict(result: TcoResult): Verdict {
  const diff = result.ev.total - result.ice.total;
  if (Math.abs(diff) < TIE_THRESHOLD_EUR) return { kind: 'tie' };
  return diff < 0 ? { kind: 'evCheaper', diff: -diff } : { kind: 'iceCheaper', diff };
}
