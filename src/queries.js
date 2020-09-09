import { print } from "graphql";
import gql from "graphql-tag";

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
        isArchived
        isDisabled
        isFork
        isPrivate
        diskUsage
        languages(first: 3) {
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
    rateLimit {
      cost
      limit
      remaining
    }
    user(login: $login) {
      bio
      company
      location
      login
      name
      avatarUrl
      organization(login: "EvolveTechnology") {
        id
        name
      }
      contributionsCollection(from: $from, to: $to) {
        ...contributions
      }
    }
  }
  ${ContributionsFragment}
`;

const GET_YEAR_CONTRIBUTIONS_DOC = gql`
  query getYearContributions($login: String!, $from: DateTime, $to: DateTime) {
    rateLimit {
      cost
      limit
      remaining
    }
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
