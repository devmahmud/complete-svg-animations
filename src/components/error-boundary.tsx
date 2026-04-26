import React from 'react';

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: (error: Error) => React.ReactNode },
  State
> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('App error:', error, info);
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback(this.state.error);
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-8">
          <div className="plate p-8 max-w-md text-center">
            <div className="text-display text-2xl text-ink-50 mb-2">Something broke.</div>
            <p className="text-ink-300 text-sm mb-4">
              {this.state.error.message || 'An unexpected error occurred while rendering.'}
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.setState({ error: null })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
