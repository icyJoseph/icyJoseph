import React, { Component } from "react";
import { Loader } from "semantic-ui-react";

class Redirect extends Component {
  componentDidMount() {
    window.location = this.props.homepage;
  }
  render() {
    return <div>Redirecting!</div>;
  }
}

export const Searching = ({ url }) => {
  return url ? (
    <Redirect homepage={url} />
  ) : (
    <Loader active inline="centered" />
  );
};

export default Searching;
