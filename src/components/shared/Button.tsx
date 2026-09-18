import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
};

const variants = {
  primary: 'bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-95',
  secondary: 'bg-[var(--soft)] text-[var(--ink)] hover:brightness-95',
  ghost: 'bg-transparent text-[var(--muted)] hover:text-[var(--ink)]',
  destructive: 'bg-[var(--destructive)] text-[var(--destructive-ink)] hover:brightness-95',
};
const sizes = { sm: 'px-3 py-2 text-xs', md: 'px-[18px] py-[13px] text-sm', lg: 'px-5 py-3 text-base' };

export function Button({ className = '', variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-[7px] font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}