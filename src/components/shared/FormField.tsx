import type { ReactNode } from 'react';
import { Typography } from './Typography';

type FormFieldProps = {
  label: string;
  id?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

export function FormField({ label, id, error, className = '', children }: FormFieldProps) {
  return (
    <label htmlFor={id} className={`flex flex-col gap-[7px] text-xs font-bold text-[var(--muted)] ${className}`}>
      {label}
      {children}
      {error && (
        <Typography id={id ? `${id}-error` : undefined} size="xs" tone="danger" role="alert">
          {error}
        </Typography>
      )}
    </label>
  );
}