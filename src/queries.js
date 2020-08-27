import gql from "graphql-tag";

export const GET_USER = gql`
  query getUser($login: String!) {
    user(login: $login) {
      bio
      company
      location
      name
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
