import { useEffect, type Dispatch } from 'react';
import { DEFAULT_INPUTS } from '@/domain/defaults';
import type { CalculatorInputs } from '@/domain/inputs';
import { parseInputs } from '@/domain/parse';
import { decodeShareFragment } from '@/domain/shareLink';
import type { InputsAction } from './inputsReducer';

/** Bump the version when a stored shape can no longer be read as the current one. */
const STORAGE_KEY = 'ausfahrt-stromer:inputs:v1';

/** Storage can be unavailable (private mode, blocked site data) or hold invalid JSON; persisting is optional. */
function withStorage(run: (storage: Storage) => void) {
  try {
    run(window.localStorage);
  } catch {}
}

/**
 * Restores inputs after mount (the server renders the defaults, so reading
 * storage during render would break hydration) and saves every change.
 *
 * A share link in the URL fragment wins over storage. Its inputs are stored
 * and the fragment is removed, so a reload keeps later edits, and a Strict
 * Mode effect replay reads the same inputs back from storage.
 *
 * The pristine `DEFAULT_INPUTS` object is never written: on mount, and on a
 * Strict Mode effect replay, it would overwrite the stored inputs before they
 * are restored. Resetting clears storage instead.
 */
export function usePersistedInputs(inputs: CalculatorInputs, dispatch: Dispatch<InputsAction>) {
  useEffect(() => {
    const applySharedLink = () => {
      const shared = decodeShareFragment(window.location.hash);
      if (!shared) return false;
      withStorage((storage) => storage.setItem(STORAGE_KEY, JSON.stringify(shared)));
      history.replaceState(null, '', window.location.pathname + window.location.search);
      dispatch({ type: 'restore', inputs: shared });
      return true;
    };

    if (!applySharedLink()) {
      withStorage((storage) => {
        const stored = storage.getItem(STORAGE_KEY);
        if (stored) dispatch({ type: 'restore', inputs: parseInputs(JSON.parse(stored)) });
      });
    }
    // A share link pasted into an open tab only changes the fragment.
    window.addEventListener('hashchange', applySharedLink);
    return () => window.removeEventListener('hashchange', applySharedLink);
  }, [dispatch]);

  useEffect(() => {
    if (inputs === DEFAULT_INPUTS) return;
    withStorage((storage) => storage.setItem(STORAGE_KEY, JSON.stringify(inputs)));
  }, [inputs]);

  return {
    clear: () => withStorage((storage) => storage.removeItem(STORAGE_KEY)),
  };
}
