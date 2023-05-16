import { print } from "graphql";
import gql from "graphql-tag";

const ItemShowcaseFragment = gql`
  fragment showcaseItem on Repository {
    id
    name
    nameWithOwner
    description
    url
    primaryLanguage {
      name
      color
    }
    owner {
      login
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
          nodes {
            ...showcaseItem
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
      repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
        nodes {
          name
          isArchived
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                color
                name
              }
            }
          }
        }
      }
      repositoryDiscussionComments(onlyAnswers: true, last: 50) {
        totalCount
        nodes {
          id
          discussion {
            id
            title
            repository {
              id
              name
            }
          }
          author {
            login
          }
          isAnswer
          authorAssociation
          url
        }
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
