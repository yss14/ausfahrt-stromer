import { DEFAULT_INPUTS } from './defaults';
import type { CalculatorInputs } from './inputs';

export const buyMode: CalculatorInputs = {
  ...DEFAULT_INPUTS,
  scenario: { ...DEFAULT_INPUTS.scenario, mode: 'buy' },
};

export const dieselLongRun: CalculatorInputs = {
  scenario: { ...DEFAULT_INPUTS.scenario, mode: 'buy', years: 10, kmPerYear: 25000 },
  ice: { ...DEFAULT_INPUTS.ice, fuel: 'diesel', fuelPriceEurPerL: 2.22 },
  ev: DEFAULT_INPUTS.ev,
};
