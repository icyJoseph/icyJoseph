import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";
import ReactRevealText from "react-reveal-text";
import { TitleContainer } from "./styled";

class MainTitle extends Component {
  state = { reveal: false };

  revealTitle = this.revealTitle.bind(this);

  componentDidMount() {
    const { timeout = 1000 } = this.props;
    this.timer = setTimeout(this.revealTitle, timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  revealTitle() {
    return this.setState({ reveal: true });
  }

  render() {
    const {
      title,
      desktop,
      timeout = 500,
      delayMin = 200,
      delayMax = 1200
    } = this.props;
    return (
      <TitleContainer>
        <Header as="h1" size="huge" textAlign="center">
          <ReactRevealText
            show={this.state.reveal}
            style={{
              ...style,
              letterSpacing: desktop ? "0.7em" : "0.5em",
              color: desktop ? "black" : "FloralWhite"
            }}
            transitionTime={timeout}
            delayMin={delayMin}
            delayMax={delayMax}
          >
            {title}
          </ReactRevealText>
        </Header>
      </TitleContainer>
    );
  }
}

MainTitle.propTypes = {
  title: PropTypes.string.isRequired,
  desktop: PropTypes.bool
};

const style = {
  fontSize: "35px",
  lineHeight: "36px"
};

export default MainTitle;
