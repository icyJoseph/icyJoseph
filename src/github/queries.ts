import { print } from "graphql";
import gql from "graphql-tag";

const ItemShowcaseFragment = gql`
  fragment showcaseItem on Repository {
    name
    nameWithOwner
    description
    isMirror
    stargazerCount
    primaryLanguage {
      name
      color
    }
    repositoryTopics(first: 10) {
      nodes {
        topic {
          name
        }
      }
    }
  }
`;

const ContributionsFragment = gql`
  fragment contributions on ContributionsCollection {
    startedAt
    endedAt
    joinedGitHubContribution {
      occurredAt
    }
    totalCommitContributions
    restrictedContributionsCount
    totalRepositoryContributions
    contributionYears
    commitContributionsByRepository(maxRepositories: 100) {
      contributions {
        totalCount
      }
      repository {
        id
        name
        description
        owner {
          login
        }
        isArchived
        isDisabled
        isFork
        isPrivate
        diskUsage
        homepageUrl
        url
        languages(first: 3, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            node {
              id
              name
              color
            }
            size
          }
          totalSize
          totalCount
        }
      }
    }
  }
`;

const GET_USER_DOC = gql`
  query getUser($login: String!, $from: DateTime, $to: DateTime) {
    user(login: $login) {
      bio
      company
      location
      login
      name
      avatarUrl
      itemShowcase {
        items(first: 10) {
          edges {
            node {
              ...showcaseItem
            }
          }
        }
      }
      status {
        emoji
        message
      }
      isHireable
      followers {
        totalCount
      }
      organization(login: "EvolveTechnology") {
        id
        name
        avatarUrl
        websiteUrl
      }
      contributionsCollection(from: $from, to: $to) {
        ...contributions
      }
    }
  }
  ${ItemShowcaseFragment}
  ${ContributionsFragment}
`;

const GET_YEAR_CONTRIBUTIONS_DOC = gql`
  query getYearContributions($login: String!, $from: DateTime, $to: DateTime) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        ...contributions
      }
    }
  }
  ${ContributionsFragment}
`;

export const GET_USER = print(GET_USER_DOC);
export const GET_YEAR_CONTRIBUTIONS = print(GET_YEAR_CONTRIBUTIONS_DOC);
