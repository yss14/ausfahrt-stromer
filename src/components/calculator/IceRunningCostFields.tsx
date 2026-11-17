'use client';

import { useTranslations } from 'next-intl';
import { NumberField } from '@/components/fields/NumberField';
import { FieldGroup } from '@/components/ui/FieldGroup';
import type { IceInputs, Mode } from '@/domain/inputs';
import { IceTaxHelper } from './IceTaxHelper';
import type { GroupSetter, NumericKey } from './inputsReducer';

type IceRunningCostFieldsProps = {
  ice: IceInputs;
  mode: Mode;
  set: GroupSetter<'ice'>;
  onApplyTaxHelper: () => void;
};

export function IceRunningCostFields({ ice, mode, set, onApplyTaxHelper }: IceRunningCostFieldsProps) {
  const t = useTranslations('ice');
  const tUnits = useTranslations('units');
  const bind = (key: NumericKey<IceInputs>) => ({
    value: ice[key],
    onChange: (value: number) => set(key, value),
  });
  const perYear = tUnits('eurPerYear');
  const once = tUnits('eurOnce');

  return (
    <FieldGroup title={t('runningGroup')}>
      <NumberField label={t('tax')} unit={perYear} {...bind('annualTaxEur')} min={0} step={1} />
      <NumberField label={t('insurance')} unit={perYear} {...bind('insuranceEur')} min={0} step={10} />
      <IceTaxHelper
        helper={ice.taxHelper}
        fuel={ice.fuel}
        onChange={(helper) => set('taxHelper', helper)}
        onApply={onApplyTaxHelper}
      />
      <NumberField
        label={t('maintenance')}
        hint={t('maintenanceHint')}
        unit={perYear}
        {...bind('maintenanceEur')}
        min={0}
        step={10}
      />
      <NumberField label={t('tires')} unit={perYear} {...bind('tiresEur')} min={0} step={10} />
      <NumberField
        label={t('inspection')}
        hint={t('inspectionHint')}
        unit={perYear}
        {...bind('inspectionEur')}
        min={0}
        step={5}
      />
      <NumberField
        label={t('oneOffRepair')}
        hint={t('oneOffRepairHint')}
        unit={once}
        {...bind('oneOffRepairEur')}
        min={0}
        step={50}
      />
      {mode === 'buy' && (
        <NumberField
          label={t('purchaseFees')}
          hint={t('purchaseFeesHint')}
          unit={once}
          {...bind('purchaseFeesEur')}
          min={0}
          step={10}
        />
      )}
    </FieldGroup>
  );
}
