import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Link } from "react-router";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-2xl py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Something went wrong
          </h1>
          <p className="mt-4 text-gray-700">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
            onClick={() => this.setState({ hasError: false })}
          >
            Go to Home Page
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
