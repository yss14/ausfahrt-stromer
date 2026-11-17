import { DEFAULT_INPUTS } from './defaults';
import type { CalculatorInputs } from './inputs';
import { isRecord, parseInputs } from './parse';

/** Bump when old links can no longer be read as the current input shape. */
const VERSION_PREFIX = 'v1.';

/** Keeps only the leaves that differ from `base`, so typical links stay short. */
function changedFields(value: unknown, base: unknown): unknown {
  if (!isRecord(value) || !isRecord(base)) return value === base ? undefined : value;
  const changed = Object.entries(value).flatMap(([key, child]) => {
    const diff = changedFields(child, base[key]);
    return diff === undefined ? [] : [[key, diff] as const];
  });
  return changed.length > 0 ? Object.fromEntries(changed) : undefined;
}

const toBase64Url = (text: string) => btoa(text).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromBase64Url = (encoded: string) => atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));

/** URL fragment (without `#`) that carries the inputs that differ from the defaults. */
export function encodeShareFragment(inputs: CalculatorInputs): string {
  const changed = changedFields(inputs, DEFAULT_INPUTS) ?? {};
  // Inputs hold only numbers, null and ASCII enum values, so btoa accepts the JSON.
  return VERSION_PREFIX + toBase64Url(JSON.stringify(changed));
}

/** Inputs from a share fragment, or null when the fragment is not a share link. */
export function decodeShareFragment(fragment: string): CalculatorInputs | null {
  const payload = fragment.replace(/^#/, '');
  if (!payload.startsWith(VERSION_PREFIX)) return null;
  try {
    return parseInputs(JSON.parse(fromBase64Url(payload.slice(VERSION_PREFIX.length))));
  } catch {
    return null;
  }
}
