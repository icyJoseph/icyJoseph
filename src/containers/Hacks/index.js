import React, { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { HacksWrap, RepoWrap } from "./styled";
import withGitHub from "../withGitHub";
import Title from "../../components/Title";
import Search from "../../components/Search";
import Repository from "../../components/Repository";
import { get } from "../../functional";

function useDebounce(query, delay) {
  const [state, setState] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setState(query), delay);
    return () => clearTimeout(timer);
  }, [query, delay]);

  return state;
}

function Repos({ repos, keyword, topics }) {
  const filtered = useMemo(
    () =>
      repos.filter(({ name }) => {
        const repoTopics = get(topics, name, []);
        return (
          !keyword ||
          name.toLowerCase().includes(keyword) ||
          repoTopics.some(topic => topic.toLowerCase().includes(keyword))
        );
      }),
    [keyword, repos, topics]
  );

  return filtered.map(({ id, name, ...repo }) => (
    <Repository key={id} name={name} topics={get(topics, name, [])} {...repo} />
  ));
}

export function Hacks({ github: { topics, repos } }) {
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef("");
  const debounced = useDebounce(keyword, 500);

  useEffect(() => {
    document.title = "Hacks - icyJoseph";
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onChange = () => {
    const { value } = inputRef.current;
    return setKeyword(value.trim().toLowerCase());
  };

  return (
    <HacksWrap>
      <Title>
        <h1>Hacks!</h1>
      </Title>
      <Search onChange={onChange} ref={inputRef} />
      <RepoWrap>
        <Repos repos={repos} keyword={debounced} topics={topics} />
      </RepoWrap>
    </HacksWrap>
  );
}

export default withGitHub(Hacks);

Hacks.propTypes = {
  github: PropTypes.object
};
