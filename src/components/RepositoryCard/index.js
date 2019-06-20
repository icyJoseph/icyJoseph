import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faJs,
  faPython,
  faNodeJs,
  faReact,
  faVuejs,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
import {
  faLaptopCode,
  faCodeBranch,
  faDesktop,
  faClock,
  faHdd
} from "@fortawesome/free-solid-svg-icons";
import { Repo, Tags } from "./styled";

function languageIcon(lang = "") {
  const language = lang.toLowerCase();
  switch (language) {
    case "javascript":
      return faJs;
    case "python":
      return faPython;
    case "nodejs":
      return faNodeJs;
    case "react":
      return faReact;
    case "vuejs":
      return faVuejs;
    default:
      return faLaptopCode;
  }
}

function Size({ size = 0 }) {
  return (
    <div className="centered">
      <FontAwesomeIcon icon={faHdd} />
      <Repo.DataField>
        <code>{size}kb</code>
      </Repo.DataField>
    </div>
  );
}

function Language({ language = "Language" }) {
  return (
    <div className="centered">
      <FontAwesomeIcon icon={languageIcon(language)} />
      <Repo.DataField>
        <code>{language}</code>
      </Repo.DataField>
    </div>
  );
}

function RefLinks({
  html_url = "https://github.com/icyJoseph",
  homepage = "https://icyjoseph.github.io"
}) {
  return (
    <Repo.RefsField>
      <a href={html_url} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      {homepage && (
        <a href={homepage} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faDesktop} />
        </a>
      )}
    </Repo.RefsField>
  );
}

function daysSince(created_at) {
  if (!created_at) return "??";
  const today = new Date().getTime();
  const asMs = (today - new Date(created_at).getTime()) / (24 * 60 * 60 * 1000);
  return Math.floor(asMs);
}

function Dates({ created_at, pushed_at }) {
  return (
    <Repo.DatesField>
      <div>
        <FontAwesomeIcon icon={faCodeBranch} />
        <div>Created {daysSince(created_at)} days ago</div>
      </div>
      <div>
        <FontAwesomeIcon icon={faClock} />
        <div>Last push {daysSince(pushed_at)} days ago</div>
      </div>
    </Repo.DatesField>
  );
}

export function RepositoryCard({
  id,
  name,
  description = "",
  language,
  topics = [],
  homepage,
  html_url,
  created_at,
  pushed_at,
  size
}) {
  return (
    <Repo>
      <Repo.Title>{!!name ? name : "Choose a repository"}</Repo.Title>
      <Repo.Subtitle>
        <Language language={language} />
        <Size size={size} />
      </Repo.Subtitle>
      <Repo.Description>
        {!!description ? description : "Repository description"}
      </Repo.Description>
      <RefLinks html_url={html_url} homepage={homepage} />
      <Dates created_at={created_at} pushed_at={pushed_at} />
      <Tags>
        {topics.map(topic => (
          <Tags.Entry key={`${name}-${topic}`}>{topic}</Tags.Entry>
        ))}
      </Tags>
    </Repo>
  );
}

export default React.memo(RepositoryCard);
