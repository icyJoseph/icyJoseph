import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHdd } from "@fortawesome/free-solid-svg-icons";
import { faJs } from "@fortawesome/free-brands-svg-icons";
import { faPython } from "@fortawesome/free-brands-svg-icons";
import { faNodeJs } from "@fortawesome/free-brands-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { faVuejs } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { faUserTimes } from "@fortawesome/free-solid-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { RepoWrap } from "./styled";
import { Tag, TagWrap } from "../Tag";

function ownership(login) {
  if (login === "icyJoseph") {
    return faUserCheck;
  }
  return faUserTimes;
}

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

function Size({ size }) {
  return (
    <div>
      <FontAwesomeIcon icon={faHdd} />
      <span className="data-field">
        <code>{size}kb</code>
      </span>
    </div>
  );
}

function Language({ language }) {
  return (
    <div>
      <FontAwesomeIcon icon={languageIcon(language)} />
      <span className="data-field">
        <code>{language}</code>
      </span>
    </div>
  );
}

const truncateTxt = str => (str.length > 100 ? `${str.slice(0, 100)}...` : str);

function Description({ description }) {
  return (
    <div>
      <div className="description-field">{truncateTxt(description)}</div>
    </div>
  );
}

function Ownership({ login }) {
  return (
    <div className="ownership-field">
      <span>Owner</span>
      <FontAwesomeIcon icon={ownership(login)} />
    </div>
  );
}

function RefLinks({ html_url, homepage }) {
  return (
    <div className="refs-field">
      <a href={html_url} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      {homepage && (
        <a href={homepage} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faDesktop} />
        </a>
      )}
    </div>
  );
}

function daysSince(created_at) {
  const today = new Date().getTime();
  const asMs = (today - new Date(created_at).getTime()) / (24 * 60 * 60 * 1000);
  return Math.floor(asMs);
}

function Dates({ created_at, pushed_at }) {
  return (
    <div className="dates-field">
      <div>
        <FontAwesomeIcon icon={faCodeBranch} />
        <div>created {daysSince(created_at)} days ago</div>
      </div>
      <div>
        <FontAwesomeIcon icon={faClock} />
        <div>pushed {daysSince(pushed_at)} days ago</div>
      </div>
    </div>
  );
}

export function Repository({
  name,
  description,
  language,
  topics,
  homepage,
  html_url,
  created_at,
  pushed_at,
  size,
  owner: { login },
  ...repo
}) {
  return (
    <RepoWrap>
      <div>
        <div>{name}</div>
        <Ownership login={login} />
      </div>
      <div>
        <Language language={language} />
        <Size size={size} />
      </div>
      <Description description={description} />
      <RefLinks html_url={html_url} homepage={homepage} />
      <Dates created_at={created_at} pushed_at={pushed_at} />
      <TagWrap>
        {topics.map(topic => (
          <Tag key={topic}>{topic}</Tag>
        ))}
      </TagWrap>
    </RepoWrap>
  );
}

export default Repository;
