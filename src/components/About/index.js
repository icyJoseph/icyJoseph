import React from "react";
import { Image, Icon } from "semantic-ui-react";
import {
  GitHubCard,
  GitHubBio,
  GitHubBioText,
  GitHubBioHeader,
  GitHubExtra,
  GitHubLink,
  UnderLined
} from "./styled";

import photo from "./profile.png";
import { extras } from "../../constants";

const Extra = (props = { repos: 0, gists: 0, company: "" }) => (
  <GitHubExtra>
    {extras.map(({ key, link, icon }) => (
      <GitHubLink
        key={key}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name={icon} />
        <UnderLined>
          {props[key]} {key === "company" ? "" : key}
        </UnderLined>
      </GitHubLink>
    ))}
  </GitHubExtra>
);

export const About = ({ github: { user } }) => (
  <GitHubCard>
    <Image circular src={photo} centered size="small" />
    <GitHubBio>
      <GitHubBioHeader>{user.name}</GitHubBioHeader>
      <GitHubBioHeader>Front-End Developer</GitHubBioHeader>
      <GitHubBioText>{user.bio}</GitHubBioText>
      <Extra
        repos={user.public_repos}
        gists={user.public_gists}
        company={user.company}
      />
    </GitHubBio>
  </GitHubCard>
);

export default About;
