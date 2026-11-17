'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { NumberField } from '@/components/fields/NumberField';
import { RangeField } from '@/components/fields/RangeField';
import block from '@/components/ui/Block.module.css';
import button from '@/components/ui/Button.module.css';
import { FieldGroup } from '@/components/ui/FieldGroup';
import { MODES, type ScenarioInputs } from '@/domain/inputs';
import { useFormats } from '@/i18n/useFormats';
import type { GroupSetter } from './inputsReducer';
import styles from './ScenarioSection.module.css';

type ScenarioSectionProps = {
  scenario: ScenarioInputs;
  set: GroupSetter<'scenario'>;
  onReset: () => void;
};

export function ScenarioSection({ scenario, set, onReset }: ScenarioSectionProps) {
  const t = useTranslations('scenario');
  const tFormat = useTranslations('format');
  const tUnits = useTranslations('units');
  const f = useFormats();
  const headingId = useId();
  const modeName = useId();

  return (
    <section className={block.block} aria-labelledby={headingId}>
      <div className={block.head}>
        <h2 id={headingId}>{t('heading')}</h2>
        <button type="button" className={`${button.button} ${styles.reset}`} onClick={onReset}>
          {t('reset')}
        </button>
      </div>

      <div className={styles.modes} role="radiogroup" aria-label={t('modeLabel')}>
        {MODES.map((mode) => (
          <label key={mode} className={styles.mode}>
            <input
              type="radio"
              name={modeName}
              value={mode}
              checked={scenario.mode === mode}
              onChange={() => set('mode', mode)}
            />
            <span className={styles.modeText}>
              <b>{t(`modes.${mode}.title`)}</b>
              {t(`modes.${mode}.description`)}
            </span>
          </label>
        ))}
      </div>

      <RangeField
        label={t('years')}
        hint={t('yearsHint')}
        output={tFormat('years', { years: scenario.years })}
        value={scenario.years}
        min={1}
        max={12}
        step={1}
        onChange={(years) => set('years', years)}
      />
      <RangeField
        label={t('kmPerYear')}
        hint={t('kmPerYearHint')}
        output={tFormat('km', { km: f.integer(scenario.kmPerYear) })}
        outputStyle="kmStone"
        value={scenario.kmPerYear}
        min={3000}
        max={50000}
        step={500}
        onChange={(km) => set('kmPerYear', km)}
      />

      <FieldGroup>
        <NumberField
          label={t('startYear')}
          hint={t('startYearHint')}
          value={scenario.startYear}
          onChange={(year) => set('startYear', year)}
          min={2024}
          max={2040}
          step={1}
        />
        <NumberField
          label={t('interestRate')}
          hint={t('interestRateHint')}
          unit={tUnits('pctPerYear')}
          value={scenario.interestRatePct}
          onChange={(pct) => set('interestRatePct', pct)}
          min={0}
          max={15}
          step={0.1}
        />
      </FieldGroup>
    </section>
  );
}
