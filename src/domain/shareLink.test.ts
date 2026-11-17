import { describe, expect, it } from 'vitest';
import { DEFAULT_INPUTS } from './defaults';
import { decodeShareFragment, encodeShareFragment } from './shareLink';

describe('share links', () => {
  it('encodes only the fields that differ from the defaults', () => {
    const inputs = { ...DEFAULT_INPUTS, scenario: { ...DEFAULT_INPUTS.scenario, kmPerYear: 25000 } };
    expect(encodeShareFragment(inputs)).toBe('v2.eyJzY2VuYXJpbyI6eyJrbVBlclllYXIiOjI1MDAwfX0');
  });

  it('encodes the defaults as an empty object', () => {
    expect(encodeShareFragment(DEFAULT_INPUTS)).toBe('v2.e30');
  });

  it('restores the shared fields on top of the defaults', () => {
    const decoded = decodeShareFragment(
      '#v2.eyJpY2UiOnsiZnVlbCI6ImRpZXNlbCJ9LCJldiI6eyJwcmljZUV1ciI6MTg1MDB9fQ',
    );
    expect(decoded).toEqual({
      ...DEFAULT_INPUTS,
      ice: { ...DEFAULT_INPUTS.ice, fuel: 'diesel' },
      ev: { ...DEFAULT_INPUTS.ev, priceEur: 18500 },
    });
  });

  it('opens v1 links with the defaults they were created with', () => {
    const decoded = decodeShareFragment('#v1.eyJzY2VuYXJpbyI6eyJrbVBlclllYXIiOjI1MDAwfX0');
    expect(decoded?.scenario).toEqual({
      mode: 'switch',
      years: 5,
      kmPerYear: 25000,
      startYear: 2027,
      interestRatePct: 3,
    });
    expect(decoded?.ice.fuelPriceEurPerL).toBe(1.98);
    expect(decoded?.ev.depreciationPct).toBe(11);
    expect(decoded?.ev.wallboxEur).toBe(1200);
  });

  it('round-trips nested and nullable fields', () => {
    const inputs = {
      scenario: { ...DEFAULT_INPUTS.scenario, mode: 'buy' as const, years: 10 },
      ice: {
        ...DEFAULT_INPUTS.ice,
        residualOverrideEur: 4000,
        taxHelper: { ...DEFAULT_INPUTS.ice.taxHelper, co2GPerKm: 155 },
      },
      ev: { ...DEFAULT_INPUTS.ev, homePriceCt: 28.5 },
    };
    expect(decodeShareFragment(encodeShareFragment(inputs))).toEqual(inputs);
  });

  it('ignores fragments that are not share links', () => {
    expect(decodeShareFragment('')).toBeNull();
    expect(decodeShareFragment('#faq')).toBeNull();
    expect(decodeShareFragment('#v2.bm90IGpzb24')).toBeNull();
    expect(decodeShareFragment('#v2.%%%')).toBeNull();
    expect(decodeShareFragment('#v9.e30')).toBeNull();
  });

  it('falls back to defaults for tampered fields', () => {
    const tampered = btoa(JSON.stringify({ scenario: { kmPerYear: 'viel', years: 7 } }));
    expect(decodeShareFragment(`v2.${tampered}`)?.scenario).toEqual({ ...DEFAULT_INPUTS.scenario, years: 7 });
  });

  // v2 links store their changes relative to these values. If this fails, copy the
  // old snapshot into shareLinkBases.ts as the v2 base and bump CURRENT_VERSION.
  it('keeps the defaults that v2 links are based on', () => {
    expect(DEFAULT_INPUTS).toMatchInlineSnapshot(`
      {
        "ev": {
          "acPriceCt": 55,
          "batteryReserveEur": 0,
          "chargingLossPct": 10,
          "consumptionKwhPer100": 17,
          "dcPriceCt": 69,
          "dcShareOfRestPct": 50,
          "depreciationPct": 9,
          "electricityPriceGrowthPct": 1.5,
          "firstRegistrationYear": 2022,
          "grossWeightKg": 2000,
          "homePriceCt": 35,
          "homeSharePct": 70,
          "inspectionEur": 55,
          "insuranceEur": 800,
          "maintenanceEur": 520,
          "otherBenefitsEur": 0,
          "priceEur": 22000,
          "purchaseFeesEur": 270,
          "residualOverrideEur": null,
          "thgPremiumEur": 220,
          "tiresEur": 190,
          "wallboxEur": 1500,
        },
        "ice": {
          "annualTaxEur": 98,
          "consumptionLPer100": 6.5,
          "depreciationPct": 9,
          "fuel": "petrol",
          "fuelPriceEurPerL": 2.15,
          "fuelPriceGrowthPct": 3,
          "inspectionEur": 80,
          "insuranceEur": 650,
          "maintenanceEur": 800,
          "oneOffRepairEur": 0,
          "purchaseFeesEur": 120,
          "residualOverrideEur": null,
          "taxHelper": {
            "co2GPerKm": 130,
            "displacementCcm": 1400,
            "period": "2014to2020",
          },
          "tiresEur": 150,
          "valueEur": 12000,
        },
        "scenario": {
          "interestRatePct": 2.25,
          "kmPerYear": 11000,
          "mode": "switch",
          "startYear": 2027,
          "years": 6,
        },
      }
    `);
  });
});
