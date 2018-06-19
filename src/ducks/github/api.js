import axios from "axios";

export const github = token =>
  axios.create({
    baseURL: `https://api.github.com`,
    auth: {
      username: "icyJoseph",
      password: `${token}`
    }
  });

export const getUserRepos = (user, token) => {
  return github(token)
    .get(`/users/${user}/repos`)
    .then(({ data }) => [...data]);
};

export const getUser = (user, token) => {
  return github(token)
    .get(`/users/${user}`)
    .then(({ data }) => data);
};

export const getRepoContributors = (user, repo, token) => {
  return github(token)
    .get(`/repos/${user}/${repo}/contributors`)
    .then(({ data }) => [...data]);
};

export const getRepoLanguages = (user, repo, token) => {
  return github(token)
    .get(`/repos/${user}/${repo}/languages`)
    .then(({ data }) => data);
};

export const getRepoTopics = (user, repo, token) => {
  return github(token)
    .get(`/repos/${user}/${repo}/topics`, {
      headers: {
        Accept: "application/vnd.github.mercy-preview+json"
      }
    })
    .then(({ data: { names } }) => ({
      [repo]: names
    }));
};
