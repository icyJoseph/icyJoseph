import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.github.com"
    : "http://localhost:1337";

export const github = token =>
  axios.create({
    baseURL,
    auth: {
      username: "icyJoseph",
      password: `${token}`
    }
  });

export const getUserRepos = (user, token) => {
  return github(token)
    .get(`/users/${user}/repos?per_page=100`)
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
