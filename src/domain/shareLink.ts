import { DEFAULT_INPUTS } from './defaults';
import type { CalculatorInputs } from './inputs';
import { isRecord, parseInputs } from './parse';
import { V1_LINK_BASE, V2_LINK_BASE } from './shareLinkBases';

/**
 * New links store their changes relative to DEFAULT_INPUTS. Before the defaults
 * change, freeze them in shareLinkBases.ts under this version and bump it, so old
 * links still open with the values their sender saw.
 */
const CURRENT_VERSION = 'v3';
const FROZEN_BASES: Partial<Record<string, CalculatorInputs>> = { v1: V1_LINK_BASE, v2: V2_LINK_BASE };
const baseFor = (version: string) => (version === CURRENT_VERSION ? DEFAULT_INPUTS : FROZEN_BASES[version]);

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
  return `${CURRENT_VERSION}.${toBase64Url(JSON.stringify(changed))}`;
}

/** Inputs from a share fragment, or null when the fragment is not a share link. */
export function decodeShareFragment(fragment: string): CalculatorInputs | null {
  const match = /^#?(v\d+)\.(.*)$/.exec(fragment);
  const base = match && baseFor(match[1]);
  if (!match || !base) return null;
  try {
    return parseInputs(JSON.parse(fromBase64Url(match[2])), base);
  } catch {
    return null;
  }
}
