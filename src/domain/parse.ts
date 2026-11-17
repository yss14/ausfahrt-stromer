import { DEFAULT_INPUTS } from './defaults';
import { FUELS, ICE_TAX_PERIODS, MODES, type CalculatorInputs } from './inputs';

const ENUM_VALUES: Partial<Record<string, readonly string[]>> = {
  mode: MODES,
  fuel: FUELS,
  period: ICE_TAX_PERIODS,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

function isValidLeaf(key: string, fallback: unknown, candidate: unknown): boolean {
  if (typeof fallback === 'string') {
    return typeof candidate === 'string' && (ENUM_VALUES[key]?.includes(candidate) ?? false);
  }
  if (fallback === null) return candidate === null || isFiniteNumber(candidate);
  return isFiniteNumber(candidate);
}

function mergeOver<T extends object>(template: T, raw: unknown): T {
  if (!isRecord(raw)) return template;
  const merged: Record<string, unknown> = {};
  for (const [key, fallback] of Object.entries(template)) {
    const candidate = raw[key];
    if (isRecord(fallback)) merged[key] = mergeOver(fallback, candidate);
    else merged[key] = isValidLeaf(key, fallback, candidate) ? candidate : fallback;
  }
  // Every leaf was checked against the template's runtime type above.
  return merged as T;
}

/**
 * Turns untrusted data (e.g. from localStorage) into valid inputs. Each field
 * that is missing or has the wrong type falls back to its default.
 */
export function parseInputs(raw: unknown): CalculatorInputs {
  return mergeOver(DEFAULT_INPUTS, raw);
}
