import axios from "axios";

export const github = `https://api.github.com`;
const auth = {
  auth: {
    username: "icyJoseph",
    password: `${process.env.REACT_APP_GITHUB_TOKEN}`
  }
};

export const getUserRepos = user => {
  return axios
    .get(`${github}/users/${user}/repos`, auth)
    .then(({ data }) => [...data]);
};

export const getUser = user => {
  return axios.get(`${github}/users/${user}`, auth).then(({ data }) => data);
};

export const getRepoContributors = (user, repo) => {
  return axios
    .get(`${github}/repos/${user}/${repo}/contributors`, auth)
    .then(({ data }) => [...data]);
};

export const getRepoLanguages = (user, repo) => {
  return axios
    .get(`${github}/repos/${user}/${repo}/languages`, auth)
    .then(({ data }) => data);
};

export const getRepoTopics = (user, repo) => {
  return axios
    .get(`${github}/repos/${user}/${repo}/topics`, {
      headers: {
        Accept: "application/vnd.github.mercy-preview+json"
      },
      auth: {
        username: "icyJoseph",
        password: `${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    })
    .then(({ data: { names } }) => ({
      [repo]: names
    }));
};
