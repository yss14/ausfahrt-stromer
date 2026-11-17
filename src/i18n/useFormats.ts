import { useFormatter } from 'next-intl';

/** Number formats used across the calculator, bound to the active locale. */
export function useFormats() {
  const format = useFormatter();
  const eur = (value: number) =>
    format.number(value, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  return {
    eur,
    eurCents: (value: number) =>
      format.number(value, {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    /** Explicit sign with a typographic minus, e.g. "+1.200 €" or "−80 €". */
    signedEur: (value: number) => `${value >= 0 ? '+' : '−'}${eur(Math.abs(value))}`,
    number: (value: number) => format.number(value),
    integer: (value: number) => format.number(value, { maximumFractionDigits: 0 }),
    oneDecimal: (value: number) => format.number(value, { maximumFractionDigits: 1 }),
  };
}

export type Formats = ReturnType<typeof useFormats>;
