import { print } from "graphql";
import gql from "graphql-tag";

const GET_USER_DOC = gql`
  query getUser($login: String!) {
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
      contributionsCollection(
        from: "2019-08-26T17:01:49.963Z"
        to: "2020-08-26T17:01:49.963Z"
      ) {
        totalCommitContributions
        restrictedContributionsCount
        contributionYears
        commitContributionsByRepository(maxRepositories: 10) {
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
            languages(first: 10) {
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
    }
  }
`;

export const GET_USER = print(GET_USER_DOC);
