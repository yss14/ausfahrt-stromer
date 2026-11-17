export const MODES = ['switch', 'buy'] as const;
export type Mode = (typeof MODES)[number];

export const FUELS = ['petrol', 'diesel'] as const;
export type Fuel = (typeof FUELS)[number];

export const ICE_TAX_PERIODS = ['from2021', '2014to2020', '2012to2013', '2009to2011', 'before2009'] as const;
export type IceTaxPeriod = (typeof ICE_TAX_PERIODS)[number];

export type ScenarioInputs = {
  mode: Mode;
  years: number;
  kmPerYear: number;
  startYear: number;
  interestRatePct: number;
};

export type IceTaxHelperInputs = {
  period: IceTaxPeriod;
  displacementCcm: number;
  co2GPerKm: number;
};

export type IceInputs = {
  fuel: Fuel;
  consumptionLPer100: number;
  fuelPriceEurPerL: number;
  fuelPriceGrowthPct: number;
  /** Trade-in value when switching, purchase price when buying. */
  valueEur: number;
  depreciationPct: number;
  /** `null` means "estimate from the depreciation rate". */
  residualOverrideEur: number | null;
  annualTaxEur: number;
  insuranceEur: number;
  maintenanceEur: number;
  tiresEur: number;
  inspectionEur: number;
  oneOffRepairEur: number;
  /** Only counted in `buy` mode. */
  purchaseFeesEur: number;
  taxHelper: IceTaxHelperInputs;
};

export type EvInputs = {
  priceEur: number;
  firstRegistrationYear: number;
  depreciationPct: number;
  /** `null` means "estimate from the depreciation rate". */
  residualOverrideEur: number | null;
  consumptionKwhPer100: number;
  chargingLossPct: number;
  homeSharePct: number;
  dcShareOfRestPct: number;
  homePriceCt: number;
  acPriceCt: number;
  dcPriceCt: number;
  electricityPriceGrowthPct: number;
  grossWeightKg: number;
  thgPremiumEur: number;
  insuranceEur: number;
  maintenanceEur: number;
  tiresEur: number;
  inspectionEur: number;
  otherBenefitsEur: number;
  batteryReserveEur: number;
  wallboxEur: number;
  purchaseFeesEur: number;
};

export type CalculatorInputs = {
  scenario: ScenarioInputs;
  ice: IceInputs;
  ev: EvInputs;
};

export type InputGroup = keyof CalculatorInputs;
