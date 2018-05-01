import React, { Component } from "react";
import PropTypes from "prop-types";

export class App extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to {match.path}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

App.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
};
