import React, { useState, useEffect, lazy, Suspense, memo } from "react";
import { StyledRepositoryList, RepoContainer } from "./styled";
import RepositoryItem from "../RepositoryItem";

const LazyRepositoryCard = lazy(() =>
  import(/*webpackChunkName: "AsyncRepoCard"*/ "../RepositoryCard")
);

function SuspenseRepositoryCard({ ...props }) {
  return (
    <Suspense fallback={null}>
      <LazyRepositoryCard {...props} />
    </Suspense>
  );
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
      <StyledRepositoryList>
        {list.map(({ id, position, ...repo }) => (
          <RepositoryItem
            id={id}
            selected={id === showing}
            key={`repository-${position}`}
            handler={setShowing}
            {...repo}
          />
        ))}
      </StyledRepositoryList>
      <SuspenseRepositoryCard {...repo} />
    </RepoContainer>
  );
}

export default memo(RepositoryList);
