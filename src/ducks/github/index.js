// Action types
export const FETCH_USER_DATA = "fetch_user";
export const SUCCESS_USER_DATA = "success_user_data";
export const FETCH_USER_REPOS = "fetch_user_repos";
export const SUCCESS_USER_REPOS = "success_user_repos";
export const FAILED_REPOS = "failed_repos";
export const FAILED_USER_DATA = "failed_repos";
export const LOAD_TOTAL_CONTRIBUTIONS = "load_total_contributions";
export const LOAD_LANGUAGES = "load_languages";
export const FETCH_REPOS_TOPICS = "fetch_repos_topics";
export const SUCCESS_REPOS_TOPICS = "success_repos_topics";

// Actions
export const fetchUserData = user => {
  return {
    type: FETCH_USER_DATA,
    payload: user
  };
};

export const fetchUserRepos = user => {
  return {
    type: FETCH_USER_REPOS,
    payload: user
  };
};

// Selectors
export const selectState = state => state.github;
export const selectRepos = state => selectState(state).repos;
export const selectUser = state => selectState(state).user;

// Reducer
export default function reducer(
  github = {
    repos: [],
    user: {},
    commits: 0,
    languages: [],
    loadingRepos: false,
    loadingUser: false,
    expiry: "",
    topics: {}
  },
  { type, payload, ...rest }
) {
  switch (type) {
    case FETCH_USER_DATA:
      return { ...github, loadingUser: true };
    case FETCH_USER_REPOS:
      return { ...github, loadingRepos: true };
    case SUCCESS_USER_DATA:
      return { ...github, user: payload, loadingUser: false };
    case SUCCESS_USER_REPOS:
      return {
        ...github,
        repos: payload,
        loadingRepos: false,
        expiry: rest.expiry
      };
    case LOAD_TOTAL_CONTRIBUTIONS:
      return { ...github, commits: payload };
    case LOAD_LANGUAGES:
      return { ...github, languages: payload };
    case SUCCESS_REPOS_TOPICS:
      const { topics } = payload;
      return { ...github, topics };
    default:
      return { ...github };
  }
}
