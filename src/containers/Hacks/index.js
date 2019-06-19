import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { HacksWrap } from "./styled";
import withGitHub from "../withGitHub";
import Title from "../../components/Title";
import Search from "../../components/Search";

import Repos from "./Repos";

export function Hacks({ github: { topics, repos } }) {
  const [keyword, setKeyword] = useState("");

  const inputRef = useRef("");

  useEffect(() => {
    document.title = "Code - icyJoseph";
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <HacksWrap>
      <Title>
        <h1>Code!</h1>
      </Title>
      <Search value={keyword} onChange={setKeyword} ref={inputRef} />
      <Repos repos={repos} keyword={keyword} topics={topics} />
    </HacksWrap>
  );
}

export default withGitHub(Hacks);

Hacks.propTypes = {
  github: PropTypes.object
};
