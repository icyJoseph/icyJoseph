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
import { Repo, Tags, RepoItem } from "./styled";

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
      <Repo.DataField>
        <code>{size}kb</code>
      </Repo.DataField>
    </div>
  );
}

function Language({ language }) {
  return (
    <div>
      <FontAwesomeIcon icon={languageIcon(language)} />
      <Repo.DataField>
        <code>{language}</code>
      </Repo.DataField>
    </div>
  );
}

function RefLinks({ html_url, homepage }) {
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

const MemoDates = React.memo(Dates);
const MemoLanguage = React.memo(Language);
const MemoRefLinks = React.memo(RefLinks);

export function Repository({
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
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    setSelected(false);
  }, [name]);
  return (
    <RepoItem selected={selected} onClick={() => setSelected(prev => !prev)}>
      {name}
    </RepoItem>
  );
  // return (
  //   <Repo>
  //     <Repo.Title>{name}</Repo.Title>
  //     <Repo.Subtitle>
  //       <MemoLanguage language={language} />
  //       <Size size={size} />
  //     </Repo.Subtitle>
  //     <Repo.Description>{description}</Repo.Description>
  //     <MemoRefLinks html_url={html_url} homepage={homepage} />
  //     <MemoDates created_at={created_at} pushed_at={pushed_at} />
  //     <Tags>
  //       {topics.map(topic => (
  //         <Tags.Entry key={`${name}-${topic}`}>{topic}</Tags.Entry>
  //       ))}
  //     </Tags>
  //   </Repo>
  // );
}

export default React.memo(Repository);
