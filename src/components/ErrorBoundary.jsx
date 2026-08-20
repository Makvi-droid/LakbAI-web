import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled error in app tree:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#FAF3E8] px-6">
          <div className="max-w-md text-center">
            <h1 className="font-display text-2xl text-[#12202B]">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-[#7C93A3]">
              {this.state.error.message || "The app hit an unexpected error."}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
