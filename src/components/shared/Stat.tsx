export function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <strong className="block font-heading text-2xl max-sm:text-lg">{value}</strong>
      <span className="mt-[5px] block text-xs text-[var(--muted)]">{label}</span>
    </div>
  );
}