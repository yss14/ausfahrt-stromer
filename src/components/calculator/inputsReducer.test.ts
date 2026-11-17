import { describe, expect, it } from 'vitest';
import { DEFAULT_INPUTS } from '@/domain/defaults';
import { inputsReducer } from './inputsReducer';

describe('inputsReducer', () => {
  it('switches an untouched fuel price to the new fuel default', () => {
    const next = inputsReducer(DEFAULT_INPUTS, { type: 'setFuel', fuel: 'diesel' });
    expect(next.ice.fuel).toBe('diesel');
    expect(next.ice.fuelPriceEurPerL).toBe(2.38);
  });

  it('keeps a fuel price the user typed', () => {
    const custom = inputsReducer(DEFAULT_INPUTS, {
      type: 'setField',
      group: 'ice',
      key: 'fuelPriceEurPerL',
      value: 1.75,
    });
    expect(inputsReducer(custom, { type: 'setFuel', fuel: 'diesel' }).ice.fuelPriceEurPerL).toBe(1.75);
  });

  it('applies the tax helper result rounded to whole euros', () => {
    const helper = { period: 'from2021' as const, displacementCcm: 1498, co2GPerKm: 150 };
    const withHelper = inputsReducer(DEFAULT_INPUTS, {
      type: 'setField',
      group: 'ice',
      key: 'taxHelper',
      value: helper,
    });
    expect(inputsReducer(withHelper, { type: 'applyTaxHelper' }).ice.annualTaxEur).toBe(152);
  });
});
