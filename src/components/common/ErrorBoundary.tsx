import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Application Crash Caught by ErrorBoundary]:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 text-white text-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl max-w-md w-full shadow-2xl">
            <div className="w-14 h-14 bg-rose-500/20 text-rose-300 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-rose-400/30">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-sm text-indigo-100 mb-6">
              An unexpected interface error occurred. Your conversations and safety logs remain safe.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Platform</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
