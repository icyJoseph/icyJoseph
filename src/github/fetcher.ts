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

export const redactedGitHubRepositoryData = (
  data: IcyJoseph.GitHub["contributionsCollection"]["commitContributionsByRepository"]
) => {
  return data
    .filter(({ repository }) => {
      return repository.owner.login === "icyJoseph";
    })
    .map((entry) => {
      const hideUrl =
        entry.repository.isPrivate ||
        entry.repository.isArchived ||
        entry.repository.isDisabled;

      return {
        ...entry,
        repository: {
          ...entry.repository,
          url: hideUrl ? "" : entry.repository.url,
        },
      };
    });
};
