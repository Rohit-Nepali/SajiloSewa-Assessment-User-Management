import { NavLink, Outlet } from 'react-router-dom';
import { Moon, Sun, UserPlus, Users } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { IconButton } from '../shared/IconButton';
import { Typography } from '../shared/Typography';
import logo from '../../assets/logo.sajilo.png';

function Brand() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5">
      <img className="h-10 w-[120px] object-contain object-left" src={logo} alt="Sajilo Life" />
    </NavLink>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `mb-[5px] flex gap-3 rounded-lg px-3.5 py-3 text-[var(--nav-text)] hover:bg-[var(--nav-hover)] hover:text-[var(--inverse)] ${isActive ? 'bg-[var(--nav-hover)] text-[var(--inverse)] shadow-[inset_3px_0_var(--accent)]' : ''}`
      }
    >
      {children}
    </NavLink>
  );
}

export function Shell() {
  
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen max-sm:block">
      <aside className="flex w-[245px] shrink-0 flex-col bg-[var(--sidebar)] px-[22px] pb-6 pt-[30px] text-[var(--inverse)] max-lg:w-[210px] max-sm:hidden">
        <Brand />
        <nav className="mt-[65px]">
          <Typography as="p" size="xs" weight="bold" tone="subtle" className="mb-[15px] ml-3.5 uppercase tracking-[0.12em]">
            Dashboard
          </Typography>
          <NavItem to="/users">
            <Users size={17} aria-hidden="true" /> Users
          </NavItem>
          <NavItem to="/users/new">
            <UserPlus size={17} aria-hidden="true" /> Add User
          </NavItem>
        </nav>
        <div className="mt-auto">
          <button
            className="flex w-full gap-3 border-0 bg-transparent px-1 py-[13px] text-[var(--nav-action)]"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
          >
            {theme === 'light' ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
          <div className="mt-[18px] flex items-center gap-2.5 border-t border-[var(--sidebar-border)] pt-5">
            <Typography as="span" size="xs" tone="default" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--soft)]">
              SL
            </Typography>
            <span>
              <Typography as="b" weight="bold" className="block">Sajilo Life</Typography>
              <Typography as="small" size="xs" tone="subtle" className="mt-[3px] block">Administrator</Typography>
            </span>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-y-auto h-screen">
        <header className="hidden items-center justify-between px-5 pt-5 max-sm:flex">
          <Brand />
          <IconButton onClick={toggleTheme} aria-label="Toggle color theme">
            {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
          </IconButton>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
