import type { CalculatorInputs, Fuel } from './inputs';

/** Example values with German market prices from November 2026. */
export const DEFAULT_INPUTS: CalculatorInputs = {
  scenario: {
    mode: 'switch',
    years: 5,
    kmPerYear: 13000,
    startYear: 2027,
    interestRatePct: 3,
  },
  ice: {
    fuel: 'petrol',
    consumptionLPer100: 6.5,
    fuelPriceEurPerL: 1.98,
    fuelPriceGrowthPct: 3,
    valueEur: 12000,
    depreciationPct: 9,
    residualOverrideEur: null,
    annualTaxEur: 98,
    insuranceEur: 650,
    maintenanceEur: 800,
    tiresEur: 150,
    inspectionEur: 70,
    oneOffRepairEur: 0,
    purchaseFeesEur: 120,
    taxHelper: { period: '2014to2020', displacementCcm: 1400, co2GPerKm: 130 },
  },
  ev: {
    priceEur: 22000,
    firstRegistrationYear: 2022,
    depreciationPct: 11,
    residualOverrideEur: null,
    consumptionKwhPer100: 17,
    chargingLossPct: 10,
    homeSharePct: 70,
    dcShareOfRestPct: 50,
    homePriceCt: 35,
    acPriceCt: 55,
    dcPriceCt: 69,
    electricityPriceGrowthPct: 1.5,
    grossWeightKg: 2000,
    thgPremiumEur: 250,
    insuranceEur: 800,
    maintenanceEur: 520,
    tiresEur: 190,
    inspectionEur: 55,
    otherBenefitsEur: 0,
    batteryReserveEur: 0,
    wallboxEur: 1200,
    purchaseFeesEur: 270,
  },
};

/** ADAC nationwide average, 11 Nov 2026 (E10 1.978 €, diesel 2.217 €). */
export const DEFAULT_FUEL_PRICE: Record<Fuel, number> = {
  petrol: 1.98,
  diesel: 2.22,
};

/**
 * When the fuel type changes, swap the price to the new fuel's default, but
 * only if the user has not typed a price of their own.
 */
export function fuelPriceAfterFuelChange(currentPriceEurPerL: number, nextFuel: Fuel): number {
  const previousFuel: Fuel = nextFuel === 'diesel' ? 'petrol' : 'diesel';
  const isUntouchedDefault = Math.abs(currentPriceEurPerL - DEFAULT_FUEL_PRICE[previousFuel]) < 0.005;
  return isUntouchedDefault ? DEFAULT_FUEL_PRICE[nextFuel] : currentPriceEurPerL;
}

export const SOURCES = [
  { key: 'adacFuel', url: 'https://www.adac.de/news/aktueller-spritpreis/' },
  { key: 'bdewPower', url: 'https://www.bdew.de/media/documents/BDEW_Strompreisanalyse_102026_1.pdf' },
  {
    key: 'autobildCharging',
    url: 'https://www.autobild.de/artikel/e-auto-laden-stromkosten-bei-ionity-enbw-tesla-allego-und-charge-now-19438557.html',
  },
  {
    key: 'zdfTaxExemption',
    url: 'https://www.zdfheute.de/politik/deutschland/elektro-auto-kfz-steuerbefreiung-verlaengerung-2035-100.html',
  },
  { key: 'finanztipThg', url: 'https://www.finanztip.de/thg-quote/' },
  {
    key: 'adacInspection',
    url: 'https://www.adac.de/rund-ums-fahrzeug/auto-kaufen-verkaufen/autokosten/inspektionskosten-e-auto-verbrenner/',
  },
  {
    key: 'verivoxInsurance',
    url: 'https://www.autohaus.de/nachrichten/autohandel/kfz-versicherung-fuer-e-autos-stromer-zunehmend-teurer-als-verbrenner-3761655',
  },
  { key: 'adacChargingLoss', url: 'https://insideevs.de/news/610241/ladeverluste-elektroautos-adac-studie/' },
  {
    key: 'fraunhoferResidual',
    url: 'https://ecomento.de/2026/06/01/gebrauchte-e-autos-in-deutschland-ein-reifer-markt-mit-guten-perspektiven/',
  },
  {
    key: 'vmfDepreciation',
    url: 'https://www.elektroauto-news.net/news/vmf-studie-gebrauchtwagenmarkt-elektroautos',
  },
  {
    key: 'carlyBattery',
    url: 'https://www.elektroquatsch.de/artikel/studie-gebrauchte-e-autos-2026-restwerte-vertrauen-batterie-soh',
  },
  {
    key: 'co2Price',
    url: 'https://www.techzeitgeist.de/co2-preis-2027-was-der-beschluss-fuer-heizen-und-tanken-bedeutet/',
  },
] as const;

export type SourceKey = (typeof SOURCES)[number]['key'];
