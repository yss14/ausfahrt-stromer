import { DEFAULT_INPUTS, fuelPriceAfterFuelChange } from '@/domain/defaults';
import type { CalculatorInputs, Fuel, InputGroup } from '@/domain/inputs';
import { iceAnnualTax } from '@/domain/tax';

/**
 * Key and value are correlated at the call site through `GroupSetter`; the
 * action itself only needs to carry them.
 */
type SetField<G extends InputGroup> = {
  type: 'setField';
  group: G;
  key: keyof CalculatorInputs[G];
  value: CalculatorInputs[G][keyof CalculatorInputs[G]];
};

export type InputsAction =
  | SetField<'scenario'>
  | SetField<'ice'>
  | SetField<'ev'>
  | { type: 'setFuel'; fuel: Fuel }
  | { type: 'applyTaxHelper' }
  | { type: 'reset' }
  | { type: 'restore'; inputs: CalculatorInputs };

export function inputsReducer(state: CalculatorInputs, action: InputsAction): CalculatorInputs {
  switch (action.type) {
    case 'setField':
      return { ...state, [action.group]: { ...state[action.group], [action.key]: action.value } };
    case 'setFuel':
      return {
        ...state,
        ice: {
          ...state.ice,
          fuel: action.fuel,
          fuelPriceEurPerL: fuelPriceAfterFuelChange(state.ice.fuelPriceEurPerL, action.fuel),
        },
      };
    case 'applyTaxHelper': {
      const { period, displacementCcm, co2GPerKm } = state.ice.taxHelper;
      const tax = iceAnnualTax(period, displacementCcm, co2GPerKm, state.ice.fuel);
      return { ...state, ice: { ...state.ice, annualTaxEur: Math.round(tax) } };
    }
    case 'reset':
      return DEFAULT_INPUTS;
    case 'restore':
      return action.inputs;
  }
}

/** Typed setter for one input group, so sections never spell out the action shape. */
export type GroupSetter<G extends InputGroup> = <K extends keyof CalculatorInputs[G]>(
  key: K,
  value: CalculatorInputs[G][K],
) => void;

export type NumericKey<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];
