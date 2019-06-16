import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { BlogWrap } from "./styled";
import Author from "../../components/Author";
import Articles from "../../components/Articles";
import { Title } from "../../components/Title";
import { fetchFeed } from "../../ducks/medium";
import { shouldFetch } from "../../helpers";

export function Blog({ medium, fetchFeed }) {
  const [loadedImages, setLoadedImages] = useState([]);
  const [errorImages, setErrorImages] = useState([]);

  const {
    feed: { articles, user },
    expiry
  } = medium;

  useEffect(() => {
    document.title = "Blog - icyJoseph";
  }, []);

  useEffect(() => {
    shouldFetch(expiry) && fetchFeed();
  }, [fetchFeed, expiry]);

  const show =
    articles.length > 0 &&
    loadedImages.length + errorImages.length !== articles.length;

  return (
    <BlogWrap>
      <Title>
        <h1>Blog</h1>
      </Title>
      {!!user.username && (
        <div>
          <Author {...user} />
          <Articles
            show={show}
            articles={articles}
            handleImageLoaded={setLoadedImages}
            handleImageError={setErrorImages}
            loadedImages={loadedImages}
          />
        </div>
      )}
    </BlogWrap>
  );
}

const mapStateToProps = ({ medium }) => ({ medium });
const mapDispatchToProps = {
  fetchFeed
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Blog);
