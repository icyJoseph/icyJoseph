import axios from "axios";

const feedEndPoint = process.env.REACT_APP_MEDIUM_FEED;
const postEndPoint = process.env.REACT_APP_MEDIUM_ARTICLE;

export const fetchFeed = () => {
  return axios
    .get(feedEndPoint)
    .then(({ data: { payload: { user, references: { Post } } } }) => ({
      user,
      articles: Post
    }));
};

export const fetchPost = uniqueSlug => {
  return axios
    .get(`${postEndPoint}?page=${uniqueSlug}`)
    .then(({ data }) => data);
};
