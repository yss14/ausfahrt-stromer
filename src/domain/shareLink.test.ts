import { describe, expect, it } from 'vitest';
import { DEFAULT_INPUTS } from './defaults';
import { decodeShareFragment, encodeShareFragment } from './shareLink';

describe('share links', () => {
  it('encodes only the fields that differ from the defaults', () => {
    const inputs = { ...DEFAULT_INPUTS, scenario: { ...DEFAULT_INPUTS.scenario, kmPerYear: 25000 } };
    expect(encodeShareFragment(inputs)).toBe('v1.eyJzY2VuYXJpbyI6eyJrbVBlclllYXIiOjI1MDAwfX0');
  });

  it('encodes the defaults as an empty object', () => {
    expect(encodeShareFragment(DEFAULT_INPUTS)).toBe('v1.e30');
  });

  it('restores the shared fields on top of the defaults', () => {
    const decoded = decodeShareFragment(
      '#v1.eyJpY2UiOnsiZnVlbCI6ImRpZXNlbCJ9LCJldiI6eyJwcmljZUV1ciI6MTg1MDB9fQ',
    );
    expect(decoded).toEqual({
      ...DEFAULT_INPUTS,
      ice: { ...DEFAULT_INPUTS.ice, fuel: 'diesel' },
      ev: { ...DEFAULT_INPUTS.ev, priceEur: 18500 },
    });
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
    expect(decodeShareFragment('#v1.bm90IGpzb24')).toBeNull();
    expect(decodeShareFragment('#v1.%%%')).toBeNull();
  });

  it('falls back to defaults for tampered fields', () => {
    const tampered = btoa(JSON.stringify({ scenario: { kmPerYear: 'viel', years: 7 } }));
    expect(decodeShareFragment(`v1.${tampered}`)?.scenario).toEqual({ ...DEFAULT_INPUTS.scenario, years: 7 });
  });
});
