import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, Icon } from "semantic-ui-react";
import photo from "./profile.png";
import { fetchUserData } from "../../ducks/github";
import { shouldFetch } from "../../helpers";

const Extra = ({ repos, gists, company }) => (
  <div
    style={{
      display: "flex",
      marginTop: "10px",
      flexWrap: "wrap",
      width: "100%",
      justifyContent: "center"
    }}
  >
    <a
      style={{
        display: "flex",
        justifyContent: "center",
        color: "#4AF626",
        margin: "0 10px"
      }}
      href="https://github.com/icyJoseph"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="github" />
      <span
        style={{
          textDecoration: "underline"
        }}
      >
        {repos} repos
      </span>
    </a>
    <a
      style={{
        display: "flex",
        justifyContent: "center",
        color: "#4AF626",
        margin: "0 10px"
      }}
      href="https://gist.github.com/icyJoseph"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="code" />
      <span
        style={{
          textDecoration: "underline"
        }}
      >
        {gists} gists
      </span>
    </a>
    <a
      style={{
        display: "flex",
        justifyContent: "center",
        color: "#4AF626",
        margin: "0 10px"
      }}
      href="http://skill-it.se/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="briefcase" />
      <span
        style={{
          textDecoration: "underline"
        }}
      >
        {company}
      </span>
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
      <div
        style={{
          margin: "0 auto",
          width: "80%"
        }}
      >
        <Image circular src={photo} centered size="small" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            padding: "10px",
            justifyContent: "center",
            alignItems: "center",
            width: "80%"
          }}
        >
          <div style={{ color: "white" }}>{user.name}</div>
          <div style={{ color: "white" }}>
            <span className="cinema">Front-End Developer</span>
          </div>
          <div style={{ color: "white", textAlign: "center", width: "80%" }}>
            {user.bio}
          </div>
          <Extra
            repos={user.public_repos}
            gists={user.public_gists}
            company={user.company}
          />
        </div>
      </div>
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
