import React, { Component } from "react";
import "./style.css";

class ErrorBoundary extends Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  state = { hasError: false };

  componentDidCatch(error, errorInfo) {
    console.debug(error, errorInfo);
  }

  handleTryAgain = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload(true);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="centered">
          <span className="error-title">Error!</span>
          <button className="error-button" onClick={this.handleTryAgain}>
            Fix
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
