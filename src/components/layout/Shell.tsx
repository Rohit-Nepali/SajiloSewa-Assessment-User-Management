import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { IconButton } from '../shared/IconButton';

const brand = 'flex items-center gap-2.5 font-heading text-[21px] font-bold';
function Brand() {
  return (
    <NavLink to="/users" className={brand}>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-ink)] text-base">
        U
      </span>
      <span>
        Orbit<span className="text-[var(--accent)]">.dir</span>
      </span>
    </NavLink>
  );
}
function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `mb-[5px] flex gap-3 rounded-lg px-3.5 py-3 text-[#aebbb3] hover:bg-[#2d3b35] hover:text-white ${isActive ? 'bg-[#2d3b35] text-white shadow-[inset_3px_0_var(--accent)]' : ''}`
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
      <aside className="flex w-[245px] shrink-0 flex-col bg-[#1b2522] px-[22px] pb-6 pt-[30px] text-[#e9f0e8] max-lg:w-[210px] max-sm:hidden">
        <Brand />
        <nav className="mt-[65px]">
          <p className="mb-[15px] ml-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#92a19a]">
            Workspace
          </p>
          <NavItem to="/users">
            <span>◈</span> Directory
          </NavItem>
          <NavItem to="/users/new">
            <span>＋</span> Add user
          </NavItem>
        </nav>
        <div className="mt-auto">
          <button
            className="flex w-full gap-3 border-0 bg-transparent px-1 py-[13px] text-[#b7c2bb]"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
          >
            <span>{theme === 'light' ? '☾' : '☀'}</span>
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
          <div className="mt-[18px] flex items-center gap-2.5 border-t border-[#35433d] pt-5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--soft)] text-xs text-[var(--ink)]">
              SL
            </span>
            <span>
              <b className="block">Sajilo Life</b>
              <small className="mt-[3px] block text-xs text-[#92a19a]">Administrator</small>
            </span>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        <header className="hidden items-center justify-between px-5 pt-5 max-sm:flex">
          <Brand />
          <IconButton onClick={toggleTheme} aria-label="Toggle color theme">
            {theme === 'light' ? '☾' : '☀'}
          </IconButton>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
