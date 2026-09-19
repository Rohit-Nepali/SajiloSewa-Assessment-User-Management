import { forwardRef, type InputHTMLAttributes } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className = '', 'aria-invalid': ariaInvalid, ...props },
  ref,
) {
  const invalid = ariaInvalid === true || ariaInvalid === 'true';
  return (
    <input
      ref={ref}
      aria-invalid={ariaInvalid}
      className={`min-h-11 w-full rounded-[6px] border ${invalid ? 'border-[var(--danger-strong)] focus:border-[var(--danger-strong)] focus:ring-[var(--danger-strong)]/20' : 'border-[var(--line)] focus:border-[var(--accent)] focus:ring-[var(--accent)]/20'} bg-[var(--panel)] px-3 py-2.5 text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:ring-2 disabled:opacity-50 ${className}`}
      {...props}
    />
  );
});