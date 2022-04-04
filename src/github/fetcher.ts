import axios from "axios";

const githubAuth = axios.create({
  baseURL: "https://api.github.com/",
  auth: { username: "icyJoseph", password: process.env.GITHUB_TOKEN || "" },
});

export const queryGitHub = <Response>(
  query: string,
  variables: Record<string, string>
) =>
  githubAuth
    .post<Response>("graphql", {
      query,
      variables,
    })
    .then(({ data }) => data);
