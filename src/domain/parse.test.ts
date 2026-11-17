import { describe, expect, it } from 'vitest';
import { DEFAULT_INPUTS } from './defaults';
import { parseInputs } from './parse';

describe('parseInputs', () => {
  it('keeps valid stored values and replaces invalid ones with defaults', () => {
    const parsed = parseInputs({
      scenario: { mode: 'buy', years: 'ten', kmPerYear: 20000 },
      ice: {
        fuel: 'hydrogen',
        residualOverrideEur: 4000,
        taxHelper: { period: 'from2021', co2GPerKm: null },
      },
      ev: { residualOverrideEur: null, priceEur: Number.NaN },
    });
    expect(parsed.scenario).toEqual({ ...DEFAULT_INPUTS.scenario, mode: 'buy', kmPerYear: 20000 });
    expect(parsed.ice.fuel).toBe('petrol');
    expect(parsed.ice.residualOverrideEur).toBe(4000);
    expect(parsed.ice.taxHelper).toEqual({ period: 'from2021', displacementCcm: 1400, co2GPerKm: 130 });
    expect(parsed.ev.residualOverrideEur).toBeNull();
    expect(parsed.ev.priceEur).toBe(22000);
  });

  it('falls back to the defaults for data that is not an object', () => {
    expect(parseInputs('garbage')).toEqual(DEFAULT_INPUTS);
  });
});
