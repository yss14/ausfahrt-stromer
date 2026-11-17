import { describe, expect, it } from 'vitest';
import { DEFAULT_INPUTS } from './defaults';
import { buyMode, dieselLongRun } from './scenarios.fixture';
import { computeTco } from './tco';

describe('computeTco', () => {
  it('matches the reference totals for the default switch scenario', () => {
    const result = computeTco(DEFAULT_INPUTS);
    expect(Math.round(result.ice.total)).toBe(23738);
    expect(Math.round(result.ev.total)).toBe(25808);
  });

  it('adds the combustion purchase fees in buy mode', () => {
    const result = computeTco(buyMode);
    expect(Math.round(result.ice.total)).toBe(23858);
    expect(Math.round(result.ev.total)).toBe(25808);
  });

  it('matches the reference totals for ten years of high-mileage diesel driving', () => {
    const result = computeTco(dieselLongRun);
    expect(Math.round(result.ice.total)).toBe(68925);
    expect(Math.round(result.ev.total)).toBe(55679);
  });

  it('uses an explicit residual value instead of the estimate', () => {
    const result = computeTco({
      ...dieselLongRun,
      ev: { ...dieselLongRun.ev, residualOverrideEur: 5000 },
    });
    expect(Math.round(result.ev.total)).toBe(57114);
    expect(result.ev.costs.depreciation).toBe(17000);
  });

  it('starts the EV vehicle tax after the exemption ends', () => {
    // Exempt until 2032; 2033 to 2036 are taxed at 56.25 € each.
    const result = computeTco(dieselLongRun);
    expect(result.ev.costs.tax).toBe(225);
  });

  it('books benefits as negative costs', () => {
    const result = computeTco(DEFAULT_INPUTS);
    expect(result.ev.costs.thgPremium).toBe(-1250);
  });

  it('starts the sale curve at the one-off costs and ends at the total', () => {
    const result = computeTco(DEFAULT_INPUTS);
    expect(result.ev.curve[0]).toBe(1470);
    expect(Math.round(result.ev.curve[5])).toBe(25808);
  });

  it('splits charging between home, public AC and DC', () => {
    const { mix } = computeTco(DEFAULT_INPUTS);
    expect(mix.home).toBeCloseTo(0.7);
    expect(mix.ac).toBeCloseTo(0.15);
    expect(mix.dc).toBeCloseTo(0.15);
    expect(mix.avgPriceEurPerKwh).toBeCloseTo(0.431);
  });
});
