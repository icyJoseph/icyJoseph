import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withGitHub } from "../GitHubHoC";
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
  }, []);

  const handleImageLoaded = id => () => setLoadedImages([...loadedImages, id]);

  const handleImageError = id => () => setErrorImages([...errorImages, id]);

  return (
    <div>
      <Title>
        <h1>Blog</h1>
      </Title>
      {!!user.username && (
        <div>
          <Author {...user} />
          <Articles
            articles={articles}
            handleImageLoaded={handleImageLoaded}
            handleImageError={handleImageError}
            loadedImages={loadedImages}
          />
        </div>
      )}
    </div>
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

export default compose(
  withConnect,
  withGitHub
)(Blog);
