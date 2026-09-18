import { Link as RouterLink, type LinkProps } from 'react-router-dom';

type AppLinkProps = LinkProps & { variant?: 'default' | 'muted' | 'back'; className?: string };

export function AppLink({ variant = 'default', className = '', ...props }: AppLinkProps) {
  const styles = {
    default: 'text-[var(--ink)] hover:text-[var(--accent)]',
    muted: 'text-[var(--muted)] hover:text-[var(--ink)]',
    back: 'mb-[42px] inline-block text-[13px] text-[var(--muted)] hover:text-[var(--ink)]',
  };
  return <RouterLink className={`${styles[variant]} ${className}`} {...props} />;
}