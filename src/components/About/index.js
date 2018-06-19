import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon } from "semantic-ui-react";
import photo from "./profile.png";
import { fetchUserData } from "../../ducks/github";
import { shouldFetch } from "../../helpers";

const Extra = ({ repos, gists, company }) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    <a
      key="repos"
      style={{ display: "flex", flex: 1 }}
      href="https://github.com/icyJoseph"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="github" color="black" />
      {repos} repos
    </a>
    <a
      key="gists"
      style={{ display: "flex", flex: 1 }}
      href="https://gist.github.com/icyJoseph"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="code" color="black" />
      {gists} gists
    </a>
    <a
      key="company"
      style={{ display: "flex", flex: 1 }}
      href="http://skill-it.se/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="briefcase" color="black" />
      {company}
    </a>
  </div>
);

export class About extends Component {
  componentDidMount() {
    const { expiry } = this.props;
    return shouldFetch(expiry) && this.props.fetchUserData("icyJoseph");
  }

  render() {
    const { user } = this.props;
    return (
      <Card
        image={photo}
        header={`${user.name}`}
        meta="Front-end developer"
        description="Peruvian living in Gothenburg, Sweden. React Ninja, JavaScript enthusiast, enjoys football and swimming."
        extra={
          <Extra
            repos={user.public_repos}
            gists={user.public_gists}
            company={user.company}
          />
        }
      />
    );
  }
}

const mapStateToProps = ({ github: { user, expiry } }) => {
  return {
    expiry,
    user
  };
};

const mapDispatchToProps = {
  fetchUserData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
