import React from "react";
import { RepoWrap } from "./styled";
import { Tag, TagWrap } from "../Tag";

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
      <div>{name}</div>
      <div>
        <code>{language}</code>
      </div>
      <div>{description}</div>
      <div>{html_url}</div>
      <div>{homepage}</div>
      <div>{login}</div>
      <div>{created_at}</div>
      <div>{pushed_at}</div>
      <div>{size} Kb</div>
      <TagWrap>
        {topics.map(topic => (
          <Tag key={topic}>{topic}</Tag>
        ))}
      </TagWrap>
    </RepoWrap>
  );
}

export default Repository;
