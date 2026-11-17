import type { Fuel, IceTaxPeriod } from './inputs';

type Co2Band = { fromG: number; toG: number; eurPerG: number };

type IceTaxRule = {
  eurPer100Ccm: Record<Fuel, number>;
  co2Bands: readonly Co2Band[];
};

const MODERN_DISPLACEMENT_RATE: Record<Fuel, number> = { petrol: 2, diesel: 9.5 };

const linearAbove = (fromG: number): Co2Band[] => [{ fromG, toG: Infinity, eurPerG: 2 }];

/** Motor vehicle tax (KraftStG § 9) by first-registration period. */
const ICE_TAX_RULES: Record<IceTaxPeriod, IceTaxRule> = {
  from2021: {
    eurPer100Ccm: MODERN_DISPLACEMENT_RATE,
    co2Bands: [
      { fromG: 95, toG: 115, eurPerG: 2.0 },
      { fromG: 115, toG: 135, eurPerG: 2.2 },
      { fromG: 135, toG: 155, eurPerG: 2.5 },
      { fromG: 155, toG: 175, eurPerG: 2.9 },
      { fromG: 175, toG: 195, eurPerG: 3.4 },
      { fromG: 195, toG: Infinity, eurPerG: 4.0 },
    ],
  },
  '2014to2020': { eurPer100Ccm: MODERN_DISPLACEMENT_RATE, co2Bands: linearAbove(95) },
  '2012to2013': { eurPer100Ccm: MODERN_DISPLACEMENT_RATE, co2Bands: linearAbove(110) },
  '2009to2011': { eurPer100Ccm: MODERN_DISPLACEMENT_RATE, co2Bands: linearAbove(120) },
  before2009: { eurPer100Ccm: { petrol: 6.75, diesel: 15.44 }, co2Bands: [] },
};

const roundToCents = (eur: number) => Math.round(eur * 100) / 100;

export function iceAnnualTax(
  period: IceTaxPeriod,
  displacementCcm: number,
  co2GPerKm: number,
  fuel: Fuel,
): number {
  const rule = ICE_TAX_RULES[period];
  const started100Ccm = Math.ceil(Math.max(0, displacementCcm) / 100);
  const displacementPart = started100Ccm * rule.eurPer100Ccm[fuel];
  const co2Part = rule.co2Bands.reduce(
    (sum, band) =>
      co2GPerKm > band.fromG ? sum + (Math.min(co2GPerKm, band.toG) - band.fromG) * band.eurPerG : sum,
    0,
  );
  return roundToCents(displacementPart + co2Part);
}

/** KraftStG § 9 Abs. 1 Nr. 3: rate per started 200 kg of gross vehicle weight. */
const WEIGHT_BANDS = [
  { fromKg: 0, toKg: 2000, eurPer200Kg: 11.25 },
  { fromKg: 2000, toKg: 3000, eurPer200Kg: 12.02 },
  { fromKg: 3000, toKg: Infinity, eurPer200Kg: 12.78 },
] as const;

/** KraftStG § 9 Abs. 2: electric cars pay half the weight-based rate. */
const EV_REDUCTION = 0.5;

export function evAnnualTaxAfterExemption(grossWeightKg: number): number {
  const taxedKg = Math.ceil(Math.max(0, grossWeightKg) / 200) * 200;
  const fullTax = WEIGHT_BANDS.reduce(
    (sum, band) =>
      taxedKg > band.fromKg
        ? sum + ((Math.min(taxedKg, band.toKg) - band.fromKg) / 200) * band.eurPer200Kg
        : sum,
    0,
  );
  // KraftStG § 11 Abs. 5: the tax due is rounded down to whole euros.
  return Math.floor(roundToCents(fullTax * EV_REDUCTION));
}

/** Ten years from first registration, but no later than 31 Dec 2035. */
export function evTaxExemptUntilYear(firstRegistrationYear: number): number {
  return Math.min(firstRegistrationYear + 10, 2035);
}

export type EvTaxExemption =
  { kind: 'expired'; untilYear: number } | { kind: 'active'; untilYear: number; freeYears: number };

export function evTaxExemption(
  firstRegistrationYear: number,
  startYear: number,
  years: number,
): EvTaxExemption {
  const untilYear = evTaxExemptUntilYear(firstRegistrationYear);
  if (untilYear < startYear) return { kind: 'expired', untilYear };
  return { kind: 'active', untilYear, freeYears: Math.min(years, untilYear - startYear + 1) };
}
