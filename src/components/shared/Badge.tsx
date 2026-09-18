import type { HTMLAttributes } from 'react';

export function Badge({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`text-[11px] text-[var(--accent)] ${className}`} {...props} />;
}