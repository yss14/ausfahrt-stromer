import { describe, expect, it } from 'vitest';
import { evAnnualTaxAfterExemption, evTaxExemption, evTaxExemptUntilYear, iceAnnualTax } from './tax';

describe('iceAnnualTax', () => {
  it('charges 2 € per started 100 ccm plus 2 € per g above 95 for 2014 to 2020 petrol cars', () => {
    expect(iceAnnualTax('2014to2020', 1400, 130, 'petrol')).toBe(98);
  });

  it('applies the progressive CO2 bands for cars registered from 2021', () => {
    // 15 × 2 € + 20 g × 2.00 € + 20 g × 2.20 € + 15 g × 2.50 €
    expect(iceAnnualTax('from2021', 1498, 150, 'petrol')).toBe(151.5);
  });

  it('uses the diesel displacement rate', () => {
    // 20 × 9.50 € + 20 g × 2.00 € + 20 g × 2.20 € + 5 g × 2.50 €
    expect(iceAnnualTax('from2021', 1968, 140, 'diesel')).toBe(286.5);
  });

  it('charges only displacement for diesel cars registered before July 2009', () => {
    // 20 × 15.44 €
    expect(iceAnnualTax('before2009', 1998, 180, 'diesel')).toBe(308.8);
  });
});

describe('evAnnualTaxAfterExemption', () => {
  it('halves 11.25 € per started 200 kg up to 2000 kg', () => {
    expect(evAnnualTaxAfterExemption(2000)).toBe(56.25);
  });

  it('charges 12.02 € per started 200 kg between 2000 and 3000 kg', () => {
    expect(evAnnualTaxAfterExemption(2400)).toBe(68.27);
  });
});

describe('evTaxExemptUntilYear', () => {
  it('runs ten years from first registration', () => {
    expect(evTaxExemptUntilYear(2022)).toBe(2032);
  });

  it('ends in 2035 at the latest', () => {
    expect(evTaxExemptUntilYear(2030)).toBe(2035);
  });
});

describe('evTaxExemption', () => {
  it('counts the exempt years inside the period', () => {
    expect(evTaxExemption(2022, 2027, 10)).toEqual({ kind: 'active', untilYear: 2032, freeYears: 6 });
  });

  it('reports an exemption that already ended', () => {
    expect(evTaxExemption(2014, 2027, 5)).toEqual({ kind: 'expired', untilYear: 2024 });
  });
});
