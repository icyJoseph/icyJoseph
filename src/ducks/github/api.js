import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_GITHUB_ENDPOINT
    : "http://localhost:1337";

export const github = () =>
  axios.create({
    baseURL
  });

export const getUser = () => {
  return github()
    .get(`/user`)
    .then(({ data }) => data);
};

export const getUserRepos = () => {
  return github()
    .get(`/repos`)
    .then(({ data }) => [...data]);
};

export const getRepoContributors = () => {
  return github()
    .post(`/contributions`)
    .then(({ data }) => data);
};

export const getRepoLanguages = repos => {
  return github()
    .post(`/languages`, { repos })
    .then(({ data }) => data);
};

export const getRepoTopics = repos => {
  return github()
    .post(`/topics`, { repos })
    .then(({ data }) => data);
};
