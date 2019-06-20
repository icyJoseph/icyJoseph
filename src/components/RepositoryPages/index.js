import React, { useState, useMemo } from "react";
import { PageSelectors } from "./styled";
import { get } from "../../functional";
import RepositoryList from "../RepositoryList";
import Matches from "../Matches";
import Controls from "../Controls";
import useDebounce from "../../utils/useDebounce";

const MAX_PER_PAGE = 6;

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
        <Controls
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
