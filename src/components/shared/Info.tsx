export function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[var(--line)] py-[11px] last:border-0">
      <span className="mt-[5px] text-xs text-[var(--muted)]">{label}</span>
      <strong className="text-right text-[13px]">{value}</strong>
    </div>
  );
}
