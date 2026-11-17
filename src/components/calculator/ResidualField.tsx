'use client';

import { useTranslations } from 'next-intl';
import { NumberField } from '@/components/fields/NumberField';
import { effectiveDepreciationPct, REFERENCE_KM_PER_YEAR } from '@/domain/tco';
import { useFormats } from '@/i18n/useFormats';

type ResidualFieldProps = {
  endYear: number;
  depreciationPct: number;
  kmPerYear: number;
  autoResidualEur: number;
  value: number | null;
  onChange: (value: number | null) => void;
  wide?: boolean;
};

/** Residual value at the end of the period; empty means "estimate from depreciation". */
export function ResidualField({
  endYear,
  depreciationPct,
  kmPerYear,
  autoResidualEur,
  value,
  onChange,
  wide,
}: ResidualFieldProps) {
  const t = useTranslations('residual');
  const tUnits = useTranslations('units');
  const f = useFormats();
  const effectivePct = effectiveDepreciationPct(depreciationPct, kmPerYear);
  const hint =
    value === null
      ? t.rich(kmPerYear === REFERENCE_KM_PER_YEAR ? 'estimated' : 'estimatedForMileage', {
          value: f.eur(autoResidualEur),
          pct: f.oneDecimal(effectivePct),
          km: f.integer(kmPerYear),
          b: (chunks) => <b>{chunks}</b>,
        })
      : t('overridden', { value: f.eur(autoResidualEur) });

  return (
    <NumberField
      optional
      label={t('label', { year: endYear })}
      hint={hint}
      unit={tUnits('eur')}
      placeholder={f.integer(Math.round(autoResidualEur))}
      value={value}
      onChange={onChange}
      min={0}
      step={250}
      wide={wide}
    />
  );
}
