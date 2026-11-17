'use client';

import { useId, type ReactNode } from 'react';
import styles from './Field.module.css';

type SelectFieldProps<V extends string> = {
  label: ReactNode;
  value: V;
  options: readonly { value: V; label: string }[];
  onChange: (value: V) => void;
};

export function SelectField<V extends string>({ label, value, options, onChange }: SelectFieldProps<V>) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.control}>
        <select
          className={styles.select}
          id={id}
          value={value}
          onChange={(event) => {
            const next = options.find((option) => option.value === event.target.value);
            if (next) onChange(next.value);
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
