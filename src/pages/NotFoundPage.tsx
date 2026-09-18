import { Button } from '../components/shared/Button';
import { AppLink } from '../components/shared/Link';
import { Typography } from '../components/shared/Typography';

const page = 'mx-auto w-full max-w-[1180px] px-[6%] py-[62px] max-sm:px-5 max-sm:py-[35px]';

export function NotFoundPage() {
  return (
    <main className={`${page} flex min-h-[350px] flex-col items-center justify-center text-center`}>
      <Typography as="span" size="xs" weight="bold" tone="subtle" className="uppercase tracking-[0.12em]">404 / Page not found</Typography>
      <Typography as="h1" size="display" weight="bold" className="mt-3 font-heading">
        This page wandered off.
      </Typography>
      <Typography tone="muted">That route does not exist in Orbit.</Typography>
      <AppLink to="/users">
        <Button>Back to directory</Button>
      </AppLink>
    </main>
  );
}
