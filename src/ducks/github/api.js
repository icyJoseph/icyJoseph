import axios from "axios";

export const github = `https://api.github.com`;

export const getUserRepos = (user, token) => {
  return axios
    .get(`${github}/users/${user}/repos`, {
      auth: {
        username: "icyJoseph",
        password: `${token}`
      }
    })
    .then(({ data }) => [...data]);
};

export const getUser = (user, token) => {
  return axios
    .get(`${github}/users/${user}`, {
      auth: {
        username: "icyJoseph",
        password: `${token}`
      }
    })
    .then(({ data }) => data);
};

export const getRepoContributors = (user, repo, token) => {
  return axios
    .get(`${github}/repos/${user}/${repo}/contributors`, {
      auth: {
        username: "icyJoseph",
        password: `${token}`
      }
    })
    .then(({ data }) => [...data]);
};

export const getRepoLanguages = (user, repo, token) => {
  return axios
    .get(`${github}/repos/${user}/${repo}/languages`, {
      auth: {
        username: "icyJoseph",
        password: `${token}`
      }
    })
    .then(({ data }) => data);
};

export const getRepoTopics = (user, repo, token) => {
  return axios
    .get(`${github}/repos/${user}/${repo}/topics`, {
      headers: {
        Accept: "application/vnd.github.mercy-preview+json"
      },
      auth: {
        username: "icyJoseph",
        password: `${token}`
      }
    })
    .then(({ data: { names } }) => ({
      [repo]: names
    }));
};
