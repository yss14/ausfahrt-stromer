'use client';

import { useTranslations } from 'next-intl';
import { NumberField } from '@/components/fields/NumberField';
import { SelectField } from '@/components/fields/SelectField';
import block from '@/components/ui/Block.module.css';
import button from '@/components/ui/Button.module.css';
import fieldStyles from '@/components/fields/Field.module.css';
import { ICE_TAX_PERIODS, type Fuel, type IceTaxHelperInputs } from '@/domain/inputs';
import { iceAnnualTax } from '@/domain/tax';
import { useFormats } from '@/i18n/useFormats';
import styles from './IceTaxHelper.module.css';

type IceTaxHelperProps = {
  helper: IceTaxHelperInputs;
  fuel: Fuel;
  onChange: (helper: IceTaxHelperInputs) => void;
  onApply: () => void;
};

export function IceTaxHelper({ helper, fuel, onChange, onApply }: IceTaxHelperProps) {
  const t = useTranslations('taxHelper');
  const tUnits = useTranslations('units');
  const f = useFormats();
  const tax = iceAnnualTax(helper.period, helper.displacementCcm, helper.co2GPerKm, fuel);

  return (
    <details className={`${styles.helper} ${block.wide}`}>
      <summary>{t('summary')}</summary>
      <div className={block.grid}>
        <SelectField
          label={t('period')}
          value={helper.period}
          options={ICE_TAX_PERIODS.map((period) => ({ value: period, label: t(`periods.${period}`) }))}
          onChange={(period) => onChange({ ...helper, period })}
        />
        <NumberField
          label={t('displacement')}
          unit={tUnits('ccm')}
          value={helper.displacementCcm}
          onChange={(displacementCcm) => onChange({ ...helper, displacementCcm })}
          min={0}
          step={1}
        />
        <NumberField
          label={t('co2')}
          unit={tUnits('gPerKm')}
          value={helper.co2GPerKm}
          onChange={(co2GPerKm) => onChange({ ...helper, co2GPerKm })}
          min={0}
          step={1}
        />
        <div className={fieldStyles.field}>
          <span className={fieldStyles.label}>{t('result')}</span>
          <div className={styles.result}>
            <output className={styles.amount}>{t('perYear', { amount: f.eurCents(tax) })}</output>
            <button type="button" className={button.button} onClick={onApply}>
              {t('apply')}
            </button>
          </div>
        </div>
      </div>
    </details>
  );
}
