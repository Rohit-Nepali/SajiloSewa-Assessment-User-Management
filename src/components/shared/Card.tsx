import type { HTMLAttributes } from 'react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLElement>) {
  return <article className={`rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5 ${className}`} {...props} />;
}