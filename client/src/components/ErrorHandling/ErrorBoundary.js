import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: null,
      errorInfo: null,
     }
  }

  componentDidCatch(error, errorInfo) {
    console.log('so we never in here huh')
    this.setState({ error, errorInfo });
  }

  // Add a svg or some picture depiciting an error 
  render() {
    console.log('are we ever in here??')
    if (this.state.error) {
      return (
        <div>
          <h2>Something went wrong!</h2>
          <details>
            {this.state.error}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children
  }
}

export default ErrorBoundary;
