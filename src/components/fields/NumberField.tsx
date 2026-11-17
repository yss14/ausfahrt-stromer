'use client';

import { useId, useState, type ReactNode } from 'react';
import styles from './Field.module.css';

type ValueProps =
  | { optional?: false; value: number; onChange: (value: number) => void }
  | { optional: true; value: number | null; onChange: (value: number | null) => void };

type NumberFieldProps = ValueProps & {
  label: ReactNode;
  unit?: string;
  hint?: ReactNode;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  wide?: boolean;
};

const toText = (value: number | null) => (value === null ? '' : String(value));

export function NumberField({
  label,
  unit,
  hint,
  min,
  max,
  step,
  placeholder,
  wide,
  ...props
}: NumberFieldProps) {
  const id = useId();
  // The draft keeps what the user typed ("", "1.", "-") while the parent holds a clean number.
  const [draft, setDraft] = useState(() => toText(props.value));
  const [lastValue, setLastValue] = useState(props.value);
  if (props.value !== lastValue) {
    setLastValue(props.value);
    setDraft(toText(props.value));
  }

  const handleChange = (text: string) => {
    setDraft(text);
    const parsed = text.trim() === '' ? null : Number(text);
    const valid = parsed !== null && Number.isFinite(parsed) ? parsed : null;
    if (props.optional) {
      setLastValue(valid);
      props.onChange(valid);
    } else {
      setLastValue(valid ?? 0);
      props.onChange(valid ?? 0);
    }
  };

  return (
    <div className={`${styles.field} ${wide ? styles.wide : ''}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.control}>
        <input
          className={styles.input}
          id={id}
          type="number"
          inputMode="decimal"
          value={draft}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(event) => handleChange(event.target.value)}
        />
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      {hint && (
        <span className={styles.hint} id={`${id}-hint`}>
          {hint}
        </span>
      )}
    </div>
  );
}
