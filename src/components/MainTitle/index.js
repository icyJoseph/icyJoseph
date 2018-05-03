import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Header } from "semantic-ui-react";
import ReactRevealText from "react-reveal-text";

class MainTitle extends Component {
  state = { reveal: false };

  componentDidMount() {
    setTimeout(this.revealTitle, 1000);
  }

  revealTitle = this.revealTitle.bind(this);
  revealTitle() {
    return this.setState({ reveal: true });
  }

  render() {
    const { title } = this.props;
    return (
      <Container style={style.container}>
        <Header as="h1" size="huge" textAlign="center">
          <ReactRevealText show={this.state.reveal} style={style.title}>
            {title}
          </ReactRevealText>
        </Header>
      </Container>
    );
  }
}

MainTitle.propTypes = {
  title: PropTypes.string.isRequired
};

const style = {
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "150px"
  },
  title: {
    fontSize: "35px",
    letterSpacing: "1em",
    lineHeight: "36px"
  }
};

export default MainTitle;
