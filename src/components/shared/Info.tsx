import { Typography } from './Typography';

export function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[var(--line)] py-[11px] last:border-0">
      <Typography as="span" size="xs" tone="muted" className="mt-[5px]">{label}</Typography>
      <Typography as="strong" size="sm" weight="semibold" className="text-right">{value}</Typography>
    </div>
  );
}
