import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";

import { BlogWrap } from "./styled";
import { Title } from "../../components/Title";
import { mediumProfile } from "../../constants";

export function Blog() {
  return (
    <BlogWrap>
      <Title>
        <h1>Blog</h1>
      </Title>
      <BlogWrap.Content className="notice">
        <BlogWrap.Info>
          The Medium feed page now requires Captcha. Be back soon!
        </BlogWrap.Info>
        <BlogWrap.Icon>
          <FontAwesomeIcon icon={faTools} />
        </BlogWrap.Icon>
        <BlogWrap.Link
          href={mediumProfile}
          target="_blank"
          rel="noopener noreferrer"
        >
          To Profile
        </BlogWrap.Link>
      </BlogWrap.Content>
    </BlogWrap>
  );
}

export default Blog;
