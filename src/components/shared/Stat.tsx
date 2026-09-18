import { Typography } from './Typography';

export function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <Typography as="strong" size="2xl" weight="bold" className="block font-heading max-sm:text-lg">{value}</Typography>
      <Typography as="span" size="xs" tone="muted" className="mt-[5px] block">{label}</Typography>
    </div>
  );
}