// src/components/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { err: null }; }
  static getDerivedStateFromError(error) { return { err: error }; }
  componentDidCatch(error, info) { console.error("💥 Caught by ErrorBoundary:", error, info); }

  render() {
    if (this.state.err) {
      return (
        <div style={{padding:16, background:"#330", color:"#fff", fontFamily:"monospace"}}>
          <h3>💥 Runtime Error</h3>
          <pre style={{whiteSpace:"pre-wrap"}}>{String(this.state.err?.stack || this.state.err)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
