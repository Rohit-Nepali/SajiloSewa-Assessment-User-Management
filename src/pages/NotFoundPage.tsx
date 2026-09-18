import { Button } from '../components/shared/Button';
import { AppLink } from '../components/shared/Link';

const page = 'mx-auto w-full max-w-[1180px] px-[6%] py-[62px] max-sm:px-5 max-sm:py-[35px]';
const eyebrow = 'text-[11px] font-bold uppercase tracking-[0.12em] text-[#92a19a]';

export function NotFoundPage() {
  return (
    <main className={`${page} flex min-h-[350px] flex-col items-center justify-center text-center`}>
      <span className={eyebrow}>404 / Page not found</span>
      <h1 className="mt-3 font-heading text-[clamp(34px,5vw,58px)] leading-none">
        This page wandered off.
      </h1>
      <p className="text-[var(--muted)]">That route does not exist in Orbit.</p>
      <AppLink to="/users">
        <Button>Back to directory</Button>
      </AppLink>
    </main>
  );
}
