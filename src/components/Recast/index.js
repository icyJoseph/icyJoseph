import React, { Component } from "react";
import { connect } from "react-redux";
import { Divider } from "semantic-ui-react";
import { fetchGist } from "../../ducks/gist";
import { shouldFetch } from "../../helpers";
import { curryRight, split, pipe, purify } from "../../functional";
import FunctionDoc from "./FunctionDoc";
import {
  LibraryWrapper,
  TitleWrapper,
  SubTitleWrapper,
  Description
} from "./styled";
import { Title, description } from "./helpers";

const splitOnLineBreak = curryRight(split)("\n");

const SubTitle = () => {
  const Link = (
    <a
      href="https://gist.github.com/icyJoseph/729f18a57c8e6b498f40690c12b14574"
      target="_blank"
      rel="noopener noreferrer"
    >
      Gist
    </a>
  );

  return (
    <SubTitleWrapper>
      These functions are loaded from this <a href={Link}>Gist</a>.
    </SubTitleWrapper>
  );
};

export class Recasted extends Component {
  componentDidMount() {
    const { expiry } = this.props;
    return (
      shouldFetch(expiry) &&
      this.props.fetchGist("729f18a57c8e6b498f40690c12b14574")
    );
  }

  renderGists() {
    const { gist } = this.props;

    const body = pipe(
      splitOnLineBreak,
      purify
    )(gist);

    return body.map((func, index) => <FunctionDoc key={index} func={func} />);
  }

  render() {
    return (
      <LibraryWrapper>
        <TitleWrapper>{Title}</TitleWrapper>
        <SubTitle />
        <Description>{description}</Description>
        <Divider />
        {this.renderGists()}
      </LibraryWrapper>
    );
  }
}

export const mapStateToProps = ({ gist }) => {
  return {
    ...gist
  };
};

export const mapDispatchToProps = {
  fetchGist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recasted);
