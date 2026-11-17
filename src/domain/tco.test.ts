import { describe, expect, it } from 'vitest';
import { buyMode, dieselLongRun, REFERENCE_INPUTS } from './scenarios.fixture';
import { computeTco, effectiveDepreciationPct, priceTrajectory } from './tco';

describe('computeTco', () => {
  it('matches the reference totals for the switch scenario', () => {
    const result = computeTco(REFERENCE_INPUTS);
    expect(Math.round(result.ice.total)).toBe(23946);
    expect(Math.round(result.ev.total)).toBe(26148);
  });

  it('adds the combustion purchase fees in buy mode', () => {
    const result = computeTco(buyMode);
    expect(Math.round(result.ice.total)).toBe(24066);
    expect(Math.round(result.ev.total)).toBe(26148);
  });

  it('matches the reference totals for ten years of high-mileage diesel driving', () => {
    const result = computeTco(dieselLongRun);
    expect(Math.round(result.ice.total)).toBe(70203);
    expect(Math.round(result.ev.total)).toBe(57503);
  });

  it('uses an explicit residual value instead of the estimate', () => {
    const result = computeTco({
      ...dieselLongRun,
      ev: { ...dieselLongRun.ev, residualOverrideEur: 5000 },
    });
    expect(Math.round(result.ev.total)).toBe(57113);
    expect(result.ev.costs.depreciation).toBe(17000);
  });

  it('starts the EV vehicle tax after the exemption ends', () => {
    // Exempt until 2032; 2033 to 2036 are taxed at 56 € each.
    const result = computeTco(dieselLongRun);
    expect(result.ev.costs.tax).toBe(224);
  });

  it('books benefits as negative costs', () => {
    const result = computeTco(REFERENCE_INPUTS);
    expect(result.ev.costs.thgPremium).toBe(-1250);
  });

  it('starts the sale curve at the one-off costs and ends at the total', () => {
    const result = computeTco(REFERENCE_INPUTS);
    expect(result.ev.curve[0]).toBe(1470);
    expect(Math.round(result.ev.curve[5])).toBe(26148);
  });

  it('continues the sale curve for the forecast years at the same yearly cost', () => {
    // 715 l × 1.98 € + 98 + 650 + 800 + 150 + 70 = 3183.70 € a year, with no value loss at the reference mileage.
    const steady = {
      ...REFERENCE_INPUTS,
      scenario: { ...REFERENCE_INPUTS.scenario, interestRatePct: 0, kmPerYear: 11000 },
      ice: { ...REFERENCE_INPUTS.ice, depreciationPct: 0, fuelPriceGrowthPct: 0 },
    };
    const { ice } = computeTco(steady);
    expect(ice.curve[5]).toBeCloseTo(15918.5);
    expect(ice.forecast[0]).toBeCloseTo(19102.2);
    expect(ice.forecast[1]).toBeCloseTo(22285.9);
  });

  it('keeps a residual of zero flat and adds the EV tax once the exemption ends', () => {
    // 2431 kWh × 0.431 € + 800 + 520 + 190 + 55 − 250 = 2362.761 € a year, plus 56 € tax from 2033.
    const worthless = {
      ...REFERENCE_INPUTS,
      scenario: { ...REFERENCE_INPUTS.scenario, interestRatePct: 0 },
      ev: { ...REFERENCE_INPUTS.ev, residualOverrideEur: 0, electricityPriceGrowthPct: 0 },
    };
    const { ev } = computeTco(worthless);
    expect(ev.forecast[0] - ev.curve[5]).toBeCloseTo(2362.761);
    expect(ev.forecast[1] - ev.forecast[0]).toBeCloseTo(2418.761);
  });

  it('grows prices by a fixed percentage a year', () => {
    expect(priceTrajectory(2, 5, 3).map((price) => price.toFixed(4))).toEqual(['2.0000', '2.1000', '2.2050']);
  });

  it('splits charging between home, public AC and DC', () => {
    const { mix } = computeTco(REFERENCE_INPUTS);
    expect(mix.home).toBeCloseTo(0.7);
    expect(mix.ac).toBeCloseTo(0.15);
    expect(mix.dc).toBeCloseTo(0.15);
    expect(mix.avgPriceEurPerKwh).toBeCloseTo(0.431);
  });
});

describe('effectiveDepreciationPct', () => {
  it('keeps the rate at 11,000 km a year', () => {
    expect(effectiveDepreciationPct(9, 11000)).toBeCloseTo(9);
  });

  it('adds 3 % of value loss per 10,000 km above the reference', () => {
    // 1 − 0.91 × 0.97
    expect(effectiveDepreciationPct(9, 21000)).toBeCloseTo(11.73);
  });

  it('lowers the loss below the reference but never turns it into a gain', () => {
    // 1 − 0.91 / 0.97
    expect(effectiveDepreciationPct(9, 1000)).toBeCloseTo(6.186, 3);
    expect(effectiveDepreciationPct(0, 3000)).toBe(0);
  });

  it('values a 22,000 € EV after six years at 16,500 km a year at about 11,300 €', () => {
    const inputs = {
      ...REFERENCE_INPUTS,
      scenario: { ...REFERENCE_INPUTS.scenario, years: 6, kmPerYear: 16500 },
      ev: { ...REFERENCE_INPUTS.ev, priceEur: 22000, depreciationPct: 9 },
    };
    // 22,000 € × 0.91^6 × 0.97^3.3
    expect(Math.round(computeTco(inputs).ev.residualValue)).toBe(11298);
  });
});
