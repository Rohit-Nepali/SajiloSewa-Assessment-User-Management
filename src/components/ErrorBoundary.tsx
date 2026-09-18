import { Component, type ErrorInfo, type ReactNode } from 'react';

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
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#92a19a]">
          Unexpected error
        </span>
        <h1 className="mt-3 font-heading text-5xl">Something went wrong.</h1>
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
