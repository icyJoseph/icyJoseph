import axios from "axios";

export const github = `https://api.github.com`;

export const getUserRepos = user => {
  return axios
    .get(`${github}/users/${user}/repos`)
    .then(({ data }) => [...data]);
};

export const getUser = user => {
  return axios.get(`${github}/users/${user}`).then(({ data }) => data);
};

export const getRepoContributors = (user, repo) => {
  return axios
    .get(`${github}/repos/${user}/${repo}/contributors`)
    .then(({ data }) => [...data]);
};

export const getRepoLanguages = (user, repo) => {
  return axios
    .get(`${github}/repos/${user}/${repo}/languages`)
    .then(({ data }) => data);
};

export const getRepoTopics = (user, repo) => {
  return axios
    .get(`${github}/repos/${user}/${repo}/topics`, {
      headers: {
        Accept: "application/vnd.github.mercy-preview+json"
      }
    })
    .then(({ data: { names } }) => ({
      [repo]: names
    }));
};
