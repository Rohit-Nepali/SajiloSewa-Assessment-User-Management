import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'display';
type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TypographyTone = 'default' | 'muted' | 'subtle' | 'inverse' | 'accent' | 'danger';

type TypographyProps<T extends ElementType> = {
  as?: T;
  size?: TypographySize;
  weight?: TypographyWeight;
  tone?: TypographyTone;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

const sizes: Record<TypographySize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  display: 'text-[clamp(34px,5vw,58px)] leading-none',
};

const weights: Record<TypographyWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const tones: Record<TypographyTone, string> = {
  default: 'text-[var(--ink)]',
  muted: 'text-[var(--muted)]',
  subtle: 'text-[var(--subtle)]',
  inverse: 'text-[var(--inverse)]',
  accent: 'text-[var(--accent)]',
  danger: 'text-[var(--danger-ink)]',
};

export function Typography<T extends ElementType = 'p'>({
  as,
  size = 'md',
  weight = 'normal',
  tone = 'default',
  className = '',
  children,
  ...props
}: TypographyProps<T>) {
  const Component = as || 'p';

  return (
    <Component className={`${sizes[size]} ${weights[weight]} ${tones[tone]} ${className}`} {...props}>
      {children}
    </Component>
  );
}