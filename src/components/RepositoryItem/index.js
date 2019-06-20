import React from "react";
import { RepoItem } from "./styled";

export function Repository({ id, name, selected, handler }) {
  const onClickHandler = () => handler(prev => (prev === id ? null : id));
  return (
    <>
      <RepoItem selected={selected} onClick={onClickHandler}>
        <span>{name}</span>
      </RepoItem>
    </>
  );
}
export default React.memo(Repository);
