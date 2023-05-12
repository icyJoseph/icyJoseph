import { fromByteArray } from "base64-js";

import { GET_USER, GET_YEAR_CONTRIBUTIONS } from "github/queries";
import { yearRange } from "helpers";

const redactedGitHubRepositoryData = (
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

type GitHubProfile = Omit<
  IcyJoseph.GitHub,
  "repositoryDiscussionComments" | "repositories"
> & {
  repositoryDiscussionComments: {
    totalCount: number;
    repositories: string[];
  };
};

type GitHubLanguages = Array<IcyJoseph.LanguageEdge>;

const btoa = (str: string) => {
  const bytes = new TextEncoder().encode(str);

  return fromByteArray(bytes);
};

const githubAuth = {
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Basic ${btoa(
      `icyJoseph:${process.env.GITHUB_TOKEN || ""}`
    )}`,
    "Content-Type": "application/json",
  },
};

export const queryGitHub = <Response>(
  query: string,
  variables: Record<string, string>
): Promise<{ data: Response }> =>
  fetch(`${githubAuth.baseURL}/graphql`, {
    method: "POST",
    headers: githubAuth.headers,
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());

export const gitHubProfile = async (): Promise<{
  profile: GitHubProfile;
  languages: GitHubLanguages;
}> => {
  const githubData = await queryGitHub<{ user: IcyJoseph.GitHub }>(GET_USER, {
    login: "icyJoseph",
    ...yearRange(),
  }).then(({ data }) => data.user);

  const { repositories, ...otherData } = githubData;

  const profile: GitHubProfile = {
    ...otherData,
    contributionsCollection: {
      ...githubData.contributionsCollection,
      commitContributionsByRepository: redactedGitHubRepositoryData(
        githubData.contributionsCollection.commitContributionsByRepository
      ),
    },
    repositoryDiscussionComments: {
      totalCount: githubData.repositoryDiscussionComments.totalCount,
      repositories: [
        ...new Set(
          githubData.repositoryDiscussionComments.nodes.map(
            ({ discussion }) => discussion.repository.name
          )
        ),
      ],
    },
  };

  const languagesAggregate: Record<string, IcyJoseph.LanguageEdge> = {};

  repositories.nodes.forEach((curr) => {
    if (curr.isArchived) return;

    curr.languages.edges.forEach((lang) => {
      if (!lang) return;

      languagesAggregate[lang.node.name] = languagesAggregate[
        lang.node.name
      ] || { ...lang };
      languagesAggregate[lang.node.name].size += lang.size;
    });
  });

  const topLanguages = Object.entries(languagesAggregate)
    .sort((lhs, rhs) => rhs[1].size - lhs[1].size)
    .map(([_, value]) => value)
    .slice(0, 4);

  const languages = topLanguages;

  return {
    profile,
    languages,
  };
};

type ContributionData = IcyJoseph.GitHub["contributionsCollection"];

export const gitHubContributions = async (
  year: number
): Promise<ContributionData> => {
  const variables = { ...yearRange(year), login: "icyJoseph" };

  const { data } = await queryGitHub<{
    user: Pick<IcyJoseph.GitHub, "contributionsCollection">;
  }>(GET_YEAR_CONTRIBUTIONS, variables);

  const githubData = {
    ...data.user.contributionsCollection,
    commitContributionsByRepository: redactedGitHubRepositoryData(
      data.user.contributionsCollection.commitContributionsByRepository
    ),
  };

  return githubData;
};
