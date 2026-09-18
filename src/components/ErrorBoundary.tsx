import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Typography } from './shared/Typography';

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application render error', error, info);
  }
  
  render() {
    return this.state.hasError ? (
      <main className="flex min-h-screen flex-col items-center justify-center text-center">
        <Typography as="span" size="xs" weight="bold" tone="subtle" className="uppercase tracking-[0.12em]">
          Unexpected error
        </Typography>
        <Typography as="h1" size="3xl" weight="bold" className="mt-3 font-heading">Something went wrong.</Typography>
        <button
          className="rounded-[7px] bg-[var(--accent)] px-[18px] py-[13px] font-bold text-[var(--accent-ink)]"
          onClick={() => window.location.reload()}
        >
          Reload dashboard
        </button>
      </main>
    ) : (
      this.props.children
    );
  }
}
