'use client';

import { useTranslations } from 'next-intl';
import { NumberField } from '@/components/fields/NumberField';
import { FieldGroup } from '@/components/ui/FieldGroup';
import type { EvInputs } from '@/domain/inputs';
import { useFormats } from '@/i18n/useFormats';
import type { GroupSetter, NumericKey } from './inputsReducer';

type EvRunningCostFieldsProps = { ev: EvInputs; taxAfterExemptionEur: number; set: GroupSetter<'ev'> };

export function EvRunningCostFields({ ev, taxAfterExemptionEur, set }: EvRunningCostFieldsProps) {
  const t = useTranslations('ev');
  const tUnits = useTranslations('units');
  const f = useFormats();
  const bind = (key: NumericKey<EvInputs>) => ({
    value: ev[key],
    onChange: (value: number) => set(key, value),
  });
  const perYear = tUnits('eurPerYear');

  return (
    <FieldGroup title={t('costsGroup')}>
      <NumberField
        label={t('grossWeight')}
        hint={t.rich('grossWeightHint', {
          amount: f.eurCents(taxAfterExemptionEur),
          b: (chunks) => <b>{chunks}</b>,
        })}
        unit={tUnits('kg')}
        {...bind('grossWeightKg')}
        min={800}
        max={3500}
        step={10}
      />
      <NumberField
        label={t('thgPremium')}
        hint={t('thgPremiumHint')}
        unit={perYear}
        {...bind('thgPremiumEur')}
        min={0}
        max={1000}
        step={5}
      />
      <NumberField
        label={t('insurance')}
        hint={t('insuranceHint')}
        unit={perYear}
        {...bind('insuranceEur')}
        min={0}
        step={10}
      />
      <NumberField
        label={t('maintenance')}
        hint={t('maintenanceHint')}
        unit={perYear}
        {...bind('maintenanceEur')}
        min={0}
        step={10}
      />
      <NumberField
        label={t('tires')}
        hint={t('tiresHint')}
        unit={perYear}
        {...bind('tiresEur')}
        min={0}
        step={10}
      />
      <NumberField label={t('inspection')} unit={perYear} {...bind('inspectionEur')} min={0} step={5} />
      <NumberField
        label={t('otherBenefits')}
        hint={t('otherBenefitsHint')}
        unit={perYear}
        {...bind('otherBenefitsEur')}
        min={0}
        step={10}
      />
      <NumberField
        label={t('batteryReserve')}
        hint={t('batteryReserveHint')}
        unit={perYear}
        {...bind('batteryReserveEur')}
        min={0}
        step={10}
      />
    </FieldGroup>
  );
}
