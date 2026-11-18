import type { CalculatorInputs, Fuel } from './inputs';

/** Example values with German market prices from November 2026. */
export const DEFAULT_INPUTS: CalculatorInputs = {
  scenario: {
    mode: 'switch',
    years: 6,
    kmPerYear: 11000,
    startYear: 2027,
    interestRatePct: 2.25,
  },
  ice: {
    fuel: 'petrol',
    consumptionLPer100: 6.5,
    fuelPriceEurPerL: 2.15,
    fuelPriceGrowthPct: 3,
    valueEur: 12000,
    depreciationPct: 10,
    residualOverrideEur: null,
    annualTaxEur: 98,
    insuranceEur: 650,
    maintenanceEur: 800,
    tiresEur: 150,
    inspectionEur: 80,
    oneOffRepairEur: 0,
    purchaseFeesEur: 120,
    taxHelper: { period: '2014to2020', displacementCcm: 1400, co2GPerKm: 130 },
  },
  ev: {
    priceEur: 22000,
    firstRegistrationYear: 2022,
    depreciationPct: 9,
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
    thgPremiumEur: 220,
    insuranceEur: 800,
    maintenanceEur: 520,
    tiresEur: 190,
    inspectionEur: 55,
    otherBenefitsEur: 0,
    batteryReserveEur: 0,
    wallboxEur: 1500,
    purchaseFeesEur: 270,
  },
};

/**
 * ADAC nationwide average on 11 Nov 2026 (E10 1.978 €, diesel 2.217 €) plus the
 * temporary 17 ct/l fuel tax cut that ends on 31 Dec 2026.
 */
export const DEFAULT_FUEL_PRICE: Record<Fuel, number> = {
  petrol: 2.15,
  diesel: 2.38,
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
  {
    key: 'fuelTaxCut',
    url: 'https://www.ebnerstolz.de/de/unser-angebot/leistungen/steuerberatung/zollrecht-energiesteuer-aussenwirtschaft/erneuter-tankrabatt-ab-01.10.2026-113433.html',
  },
  { key: 'bdewPower', url: 'https://www.bdew.de/media/documents/BDEW_Strompreisanalyse_102026_1.pdf' },
  { key: 'aceCharging', url: 'https://www.ace.de/elektromobilitaet/laden-wallbox/ladepreise/' },
  {
    key: 'kbaMileage',
    url: 'https://www.kba.de/DE/Presse/Pressemitteilungen/Allgemein/2026/pm38_2026_verkehr_in_kilometern.html',
  },
  {
    key: 'zollTaxExemption',
    url: 'https://www.zoll.de/SharedDocs/Fachmeldungen/Aktuelle-Einzelmeldungen/2026/kfz_verlaengerung_steuerbefreiung_elektrofahrzeuge.html',
  },
  { key: 'autobildThg', url: 'https://www.autobild.de/artikel/thg-quoten-vergleich-anbieter-21337529.html' },
  { key: 'co2Price', url: 'https://www.bundestag.de/1210950' },
  {
    key: 'adacInspection',
    url: 'https://www.adac.de/rund-ums-fahrzeug/auto-kaufen-verkaufen/autokosten/inspektionskosten-e-auto-verbrenner/',
  },
  { key: 'adacHu', url: 'https://www.adac.de/rund-ums-fahrzeug/reparatur-pflege-wartung/hu-und-au/tuev-kosten/' },
  {
    key: 'verivoxInsurance',
    url: 'https://www.autohaus.de/nachrichten/autohandel/kfz-versicherung-fuer-e-autos-stromer-zunehmend-teurer-als-verbrenner-3761655',
  },
  {
    key: 'adacChargingLoss',
    url: 'https://www.adac.de/rund-ums-fahrzeug/elektromobilitaet/laden/ladeverluste-elektroauto-studie/',
  },
  { key: 'adacWallbox', url: 'https://www.adac.de/rund-ums-fahrzeug/elektromobilitaet/laden/wallbox-kosten/' },
  {
    key: 'datResidual',
    url: 'https://www.autohaus.de/nachrichten/gw-trends/dat-spritpreise-machen-gebrauchte-e-autos-teurer-3909599',
  },
  {
    key: 'carlyBattery',
    url: 'https://www.firmenauto.de/fahrzeuge/pkw/soh-daten-machen-den-batteriezustand-bei-gebrauchten-e-autos-zum-wertfaktor/',
  },
  {
    key: 'ubaGridCo2',
    url: 'https://www.umweltbundesamt.de/themen/co2-emissionen-pro-kilowattstunde-strom-2025-nur',
  },
  {
    key: 'assumptionsResearch',
    url: 'https://github.com/yss14/ausfahrt-stromer/blob/main/docs/research/annahmen-2026-11.md',
  },
] as const;

export type SourceKey = (typeof SOURCES)[number]['key'];
