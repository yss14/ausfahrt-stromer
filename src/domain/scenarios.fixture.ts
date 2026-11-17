import type { CalculatorInputs } from './inputs';
import { V1_LINK_BASE } from './shareLinkBases';

/**
 * The first published defaults, frozen. Tests pin their numbers against these
 * inputs, so refreshing DEFAULT_INPUTS does not change what the math tests check.
 */
export const REFERENCE_INPUTS: CalculatorInputs = V1_LINK_BASE;

export const buyMode: CalculatorInputs = {
  ...REFERENCE_INPUTS,
  scenario: { ...REFERENCE_INPUTS.scenario, mode: 'buy' },
};

export const dieselLongRun: CalculatorInputs = {
  scenario: { ...REFERENCE_INPUTS.scenario, mode: 'buy', years: 10, kmPerYear: 25000 },
  ice: { ...REFERENCE_INPUTS.ice, fuel: 'diesel', fuelPriceEurPerL: 2.22 },
  ev: REFERENCE_INPUTS.ev,
};
