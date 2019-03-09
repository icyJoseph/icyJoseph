import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { HackWrap, FilterWrap } from "./styled";
import withGitHub from "../withGitHub";
import Title from "../../components/Title";
import Filter from "../../components/Filter";
import Search from "../../components/Search";
import Repository from "../../components/Repository";
import { get } from "../../functional";

const filterRepos = (repos, topics) => (filterTopic, filterLang, keyword) =>
  repos
    .filter(
      ({ name }) =>
        !filterTopic || get(topics, name, [filterTopic]).includes(filterTopic)
    )
    .filter(({ language }) => !filterLang || language === filterLang)
    .filter(
      ({ name, description }) =>
        !keyword ||
        name.toLowerCase().includes(keyword) ||
        description.toLowerCase().includes(keyword)
    )
    .map(({ id, name, ...repo }) => (
      <Repository key={id} name={name} {...repo} topics={get(topics, name)} />
    ));

export function Hacks({ github: { allTopics, topics, repos, languages } }) {
  const [topicFilter, setTopicFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");

  const [keyword, setKeyword] = useState("");
  const inputRef = useRef("");

  const langOptions = languages.map(({ lang }) => lang);

  const updateTopicFilter = e => setTopicFilter(e.target.value);
  const updateLangFilter = e => setLangFilter(e.target.value);

  const onChange = () => {
    const { value } = inputRef.current;
    const sanitized = value.trim().toLowerCase();
    return setKeyword(sanitized);
  };

  const filters = [
    {
      title: "topic",
      options: allTopics,
      value: topicFilter,
      onChange: updateTopicFilter
    },
    {
      title: "language",
      options: langOptions,
      value: langFilter,
      onChange: updateLangFilter
    }
  ];

  const repoWithTopics = filterRepos(repos, topics);

  return (
    <div>
      <Title>
        <h1>Hacks!</h1>
      </Title>
      <Search onChange={onChange} ref={inputRef} />
      <FilterWrap>
        {filters.map(({ title, ...props }) => (
          <Filter key={title} title={title} {...props} />
        ))}
      </FilterWrap>
      <HackWrap>{repoWithTopics(topicFilter, langFilter, keyword)}</HackWrap>
    </div>
  );
}

export default withGitHub(Hacks);

Hacks.propTypes = {
  github: PropTypes.object
};
