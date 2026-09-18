import type { ReactNode } from 'react';

export function FormField({ label, children }: { label: string; children: ReactNode }) {
  return <label className="flex flex-col gap-[7px] text-xs font-bold text-[var(--muted)]">{label}{children}</label>;
}