import { Button } from '../shared/Button';

const state = 'flex min-h-[350px] flex-col items-center justify-center text-center';
export function LoadingState() {
  return (
    <div className={state}>
      <span className="h-[30px] w-[30px] animate-spin rounded-full border-[3px] border-[var(--line)] border-t-[var(--accent)]" />
      <p className="mt-4 text-[var(--muted)]">Loading directory...</p>
    </div>
  );
}
export function ErrorState({ message, retry }: { message: string; retry: () => void }) {
  return (
    <div className={state}>
      <span className="rounded-full bg-[#ffe3df] px-4 py-2 text-[22px] text-[#a93c2f]">!</span>
      <h2 className="mt-4">Could not load this view</h2>
      <p className="text-[var(--muted)]">{message}</p>
      <Button onClick={retry}>Try again</Button>
    </div>
  );
}
export function EmptyState({ message = 'No users match these filters.' }: { message?: string }) {
  return (
    <div className={state}>
      <span className="text-[45px] text-[var(--accent)]">○</span>
      <h2>Nothing here yet</h2>
      <p className="text-[var(--muted)]">{message}</p>
    </div>
  );
}
