import { describe, expect, it } from 'vitest';
import { buyMode, dieselLongRun, REFERENCE_INPUTS } from './scenarios.fixture';
import {
  breakEvenKmPerYear,
  breakEvenYear,
  cashNeededToday,
  co2Tonnes,
  firstCurveCrossing,
  verdict,
} from './insights';
import { computeTco } from './tco';

describe('breakEvenKmPerYear', () => {
  it('finds the mileage for the reference scenario, rounded up to 500 km', () => {
    expect(breakEvenKmPerYear(REFERENCE_INPUTS)).toEqual({ kind: 'at', km: 24500 });
  });

  it('shifts with the buy scenario', () => {
    expect(breakEvenKmPerYear(buyMode)).toEqual({ kind: 'at', km: 24000 });
  });

  it('drops for expensive diesel over ten years', () => {
    expect(breakEvenKmPerYear(dieselLongRun)).toEqual({ kind: 'at', km: 8500 });
  });

  it('never breaks even when electricity costs more per km than fuel', () => {
    const pricyPower = {
      ...REFERENCE_INPUTS,
      ev: { ...REFERENCE_INPUTS.ev, homePriceCt: 150, acPriceCt: 150, dcPriceCt: 150 },
    };
    expect(breakEvenKmPerYear(pricyPower)).toEqual({ kind: 'never' });
  });

  it('is always cheaper when the EV wins without driving', () => {
    const cheapEv = { ...REFERENCE_INPUTS, ev: { ...REFERENCE_INPUTS.ev, priceEur: 2000 } };
    expect(breakEvenKmPerYear(cheapEv)).toEqual({ kind: 'always' });
  });
});

describe('breakEvenYear', () => {
  it('reports no break-even within the reference period, with the EV still behind', () => {
    expect(breakEvenYear(computeTco(REFERENCE_INPUTS))).toEqual({ kind: 'notWithin', evBehind: true });
  });

  it('interpolates the year in which the EV catches up', () => {
    const result = breakEvenYear(computeTco(dieselLongRun));
    expect(result.kind).toBe('at');
    if (result.kind === 'at') expect(result.years.toFixed(1)).toBe('3.0');
  });
});

describe('firstCurveCrossing', () => {
  it('locates the crossing on the combustion curve', () => {
    const crossing = firstCurveCrossing(computeTco(dieselLongRun));
    expect(crossing?.years.toFixed(1)).toBe('3.0');
    expect(crossing?.inForecast).toBe(false);
  });

  it('finds a crossing in the forecast years after the chosen period', () => {
    const moreKm = { ...REFERENCE_INPUTS, scenario: { ...REFERENCE_INPUTS.scenario, kmPerYear: 17000 } };
    const crossing = firstCurveCrossing(computeTco(moreKm));
    expect(crossing?.years.toFixed(1)).toBe('6.8');
    expect(crossing?.inForecast).toBe(true);
  });

  it('returns null when the curves do not cross within the forecast', () => {
    expect(firstCurveCrossing(computeTco(REFERENCE_INPUTS))).toBeNull();
  });
});

describe('cashNeededToday', () => {
  it('nets the trade-in value against the EV purchase when switching', () => {
    expect(cashNeededToday(REFERENCE_INPUTS)).toEqual({ eur: 11470, basis: 'afterTradeIn' });
  });

  it('compares both purchases when buying', () => {
    expect(cashNeededToday(buyMode)).toEqual({ eur: 11350, basis: 'buyBoth' });
  });

  it('counts only the EV side when the old car has no trade-in value', () => {
    const noTradeIn = { ...REFERENCE_INPUTS, ice: { ...REFERENCE_INPUTS.ice, valueEur: 0 } };
    expect(cashNeededToday(noTradeIn)).toEqual({ eur: 23470, basis: 'evOnly' });
  });
});

describe('co2Tonnes', () => {
  it('uses the tailpipe factor of the fuel and the German grid mix', () => {
    const tonnes = co2Tonnes(computeTco(REFERENCE_INPUTS), REFERENCE_INPUTS);
    // 4225 l × 2.37 kg; 12155 kWh × 0.34 kg
    expect(tonnes.ice).toBeCloseTo(10.013, 3);
    expect(tonnes.ev).toBeCloseTo(4.133, 3);
  });
});

describe('verdict', () => {
  it('favours the combustion car in the reference scenario', () => {
    const result = verdict(computeTco(REFERENCE_INPUTS));
    expect(result.kind).toBe('iceCheaper');
    if (result.kind === 'iceCheaper') expect(Math.round(result.diff)).toBe(2202);
  });

  it('favours the EV for high-mileage diesel driving', () => {
    const result = verdict(computeTco(dieselLongRun));
    expect(result.kind).toBe('evCheaper');
    if (result.kind === 'evCheaper') expect(Math.round(result.diff)).toBe(12700);
  });

  it('calls it a tie below 50 €', () => {
    // 440 € a year of other benefits closes all but about 2 € of the 2202 € gap.
    const tied = { ...REFERENCE_INPUTS, ev: { ...REFERENCE_INPUTS.ev, otherBenefitsEur: 440 } };
    expect(verdict(computeTco(tied))).toEqual({ kind: 'tie' });
  });
});
