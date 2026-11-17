'use client';

import { useReducer, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { DEFAULT_INPUTS } from '@/domain/defaults';
import { verdict } from '@/domain/insights';
import { computeTco } from '@/domain/tco';
import { Breakdown } from './Breakdown';
import styles from './Calculator.module.css';
import { CostChart } from './CostChart';
import { EvSection } from './EvSection';
import { IceSection } from './IceSection';
import { inputsReducer, type GroupSetter } from './inputsReducer';
import { KeyFacts } from './KeyFacts';
import { MobileResultBar } from './MobileResultBar';
import { ResultSign } from './ResultSign';
import { ScenarioSection } from './ScenarioSection';
import { usePersistedInputs } from './usePersistedInputs';
import { VerdictSign } from './VerdictSign';

export function Calculator() {
  const t = useTranslations('result');
  const [inputs, dispatch] = useReducer(inputsReducer, DEFAULT_INPUTS);
  const storage = usePersistedInputs(inputs, dispatch);
  const resultsRef = useRef<HTMLElement>(null);

  const result = computeTco(inputs);
  const outcome = verdict(result);
  const { scenario } = inputs;

  const setScenario: GroupSetter<'scenario'> = (key, value) =>
    dispatch({ type: 'setField', group: 'scenario', key, value });
  const setIce: GroupSetter<'ice'> = (key, value) => dispatch({ type: 'setField', group: 'ice', key, value });
  const setEv: GroupSetter<'ev'> = (key, value) => dispatch({ type: 'setField', group: 'ev', key, value });
  const reset = () => {
    storage.clear();
    dispatch({ type: 'reset' });
  };

  return (
    <>
      <div className={styles.layout}>
        <form className={styles.inputs} autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <ScenarioSection scenario={scenario} set={setScenario} onReset={reset} />
          <IceSection
            ice={inputs.ice}
            scenario={scenario}
            autoResidualEur={result.ice.autoResidualValue}
            set={setIce}
            onFuelChange={(fuel) => dispatch({ type: 'setFuel', fuel })}
            onApplyTaxHelper={() => dispatch({ type: 'applyTaxHelper' })}
          />
          <EvSection ev={inputs.ev} scenario={scenario} result={result} set={setEv} />
        </form>

        <aside className={styles.results} ref={resultsRef} aria-label={t('regionLabel')}>
          <div className={styles.summary} aria-live="polite">
            <ResultSign result={result} scenario={scenario} verdict={outcome} />
            <VerdictSign verdict={outcome} mode={scenario.mode} years={result.years} />
          </div>
          <KeyFacts inputs={inputs} result={result} />
          <CostChart result={result} />
          <Breakdown inputs={inputs} result={result} />
        </aside>
      </div>
      <MobileResultBar result={result} verdict={outcome} resultsRef={resultsRef} />
    </>
  );
}
