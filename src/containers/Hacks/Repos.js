import React, { useState, useEffect, useMemo } from "react";
import { ReposWrap, PageSelectors, RepoContainer } from "./styled";
import { get } from "../../functional";
import Repository, { ReposCard } from "../../components/Repository";

const MAX_PER_PAGE = 6;

function useDebounce(query, delay) {
  const [state, setState] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      return setState(query);
    }, 250);
    return () => clearTimeout(timer);
  }, [query, delay]);

  return state;
}

function RepositoryList({ list }) {
  const [showing, setShowing] = useState(null);

  useEffect(() => {
    // if the list changes, show nothing
    setShowing(null);
  }, [list]);

  const [repo] = list.filter(({ id }) => id === showing);
  // return a list of repositories
  return (
    <RepoContainer>
      <ReposWrap>
        {list.map(({ id, position, ...repo }) => (
          <Repository
            id={id}
            selected={id === showing}
            key={`repository-${position}`}
            {...repo}
            handler={setShowing}
          />
        ))}
      </ReposWrap>
      <ReposCard {...repo} />
    </RepoContainer>
  );
}

function Controls({ length, handler, page, currentTotal }) {
  return Array.from({ length }, (_, i) => {
    const handleClick = () => handler(i);
    return (
      <PageSelectors.Button
        key={`${i}-button`}
        selected={i === page}
        disabled={i >= currentTotal}
        onClick={handleClick}
      >
        {i}
      </PageSelectors.Button>
    );
  });
}

const MemoControls = React.memo(Controls);

function Matches({ count }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let timer;
    if (value !== count) {
      timer = setTimeout(
        () => setValue(prev => prev + (count - prev) / Math.abs(prev - count)),
        7
      );
    }
    return () => clearTimeout(timer);
  }, [count, value]);

  return <PageSelectors.Message>{value} matches</PageSelectors.Message>;
}

function RepoPages({ repos, keyword, topics }) {
  const [page, setPage] = useState(0);
  const debounced = useDebounce(keyword, 300);

  const filtered = useMemo(
    () =>
      repos.filter(({ name }) => {
        const repoTopics = get(topics, name, []);
        return (
          !debounced ||
          name.toLowerCase().includes(debounced) ||
          repoTopics.some(topic => topic.toLowerCase().includes(debounced))
        );
      }),
    [debounced, repos, topics]
  );

  // the page slice
  const pageSlice = useMemo(
    () =>
      Array.from({ length: MAX_PER_PAGE }, (_, position) => {
        const repo = filtered[page * MAX_PER_PAGE + position] || {};
        const { id, name } = repo;

        return {
          ...repo,
          id,
          position,
          name,
          topics: id ? topics[name] : []
        };
      }),
    [page, filtered, topics]
  );

  const currentTotalPages = useMemo(
    () => Math.ceil(filtered.length / MAX_PER_PAGE),
    [filtered.length]
  );

  const maxTotalPages = useMemo(() => Math.ceil(repos.length / MAX_PER_PAGE), [
    repos.length
  ]);

  return (
    <>
      <PageSelectors>
        <Matches count={filtered.length} />
        <MemoControls
          handler={setPage}
          length={maxTotalPages}
          currentTotal={currentTotalPages}
          page={page}
        />
      </PageSelectors>
      <RepositoryList list={pageSlice} />
    </>
  );
}

export default React.memo(RepoPages);
