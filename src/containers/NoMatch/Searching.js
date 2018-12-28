import React, { Component } from "react";

class Redirect extends Component {
  componentDidMount() {
    window.location.replace(this.props.url);
  }
  render() {
    return <div>Redirecting!</div>;
  }
}

export const Searching = ({ url }) => {
  return url ? <Redirect url={url} /> : <Loader active inline="centered" />;
};

export default Searching;
