import { RefreshCw, UserRoundSearch } from 'lucide-react';
import { Button } from '../shared/Button';
import { Typography } from '../shared/Typography';

const state = 'flex min-h-[350px] flex-col items-center justify-center text-center';

export function LoadingState() {
  return (
    <div className={state}>
      <span className="h-[30px] w-[30px] animate-spin rounded-full border-[3px] border-[var(--line)] border-t-[var(--accent)]" />
      <Typography tone="muted" className="mt-4">Loading directory...</Typography>
    </div>
  );
}
export function ErrorState({ message, retry }: { message: string; retry: () => void }) {
  return (
    <div className={state}>
      <Typography as="span" size="xl" tone="danger" className="rounded-full bg-[var(--danger-soft)] px-4 py-2">!</Typography>
      <Typography as="h2" weight="semibold" className="mt-4">Could not load this view</Typography>
      <Typography tone="muted">{message}</Typography>
      <Button onClick={retry}><RefreshCw size={16} aria-hidden="true" /> Try again</Button>
    </div>
  );
}
export function EmptyState({ message = 'No users match these filters.' }: { message?: string }) {
  return (
    <div className={state}>
      <UserRoundSearch size={45} strokeWidth={1.5} className="text-[var(--accent)]" aria-hidden="true" />
      <Typography as="h2" weight="semibold">Nothing here yet</Typography>
      <Typography tone="muted">{message}</Typography>
    </div>
  );
}
