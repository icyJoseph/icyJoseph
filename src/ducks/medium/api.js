import axios from "axios";

const feedEndPoint = `https://wt-eb857ce9bac13bdd2efcf8e93fb9fdcc-0.sandbox.auth0-extend.com/Medium-Call`;
const postEndPoint = `https://wt-eb857ce9bac13bdd2efcf8e93fb9fdcc-0.sandbox.auth0-extend.com/Medium-Article`;

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
