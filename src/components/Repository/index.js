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
      <div>Repo url: {html_url}</div>
      <div>Demo: {homepage}</div>
      <div>Owner: {login}</div>
      <div>Last pushed: {pushed_at}</div>
      <div>Created: {created_at}</div>
      <div>Size: {size} Kb</div>
      <TagWrap>
        {topics.map(topic => (
          <Tag key={topic}>{topic}</Tag>
        ))}
      </TagWrap>
    </RepoWrap>
  );
}

export default Repository;
