import React, { useState, useEffect } from "react";
import { StyledRepositoryList, RepoContainer } from "./styled";
import RepositoryItem from "../RepositoryItem";
import RepositoryCard from "../RepositoryCard";

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
      <RepositoryCard {...repo} />
    </RepoContainer>
  );
}

export default React.memo(RepositoryList);
