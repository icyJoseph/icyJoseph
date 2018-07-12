export const FETCH_TOKEN = "fetch_token";
export const FAILED_TOKEN = "failed_token";
export const SUCCESS_TOKEN = "success_token";
export const UPDATE_TOKEN = "update_token";

export const fetchToken = () => {
  return {
    type: FETCH_TOKEN
  };
};

export const selectState = state => state.auth;
export const selectToken = state => selectState(state).token;
export const selectFailed = state => selectState(state).failed;

export default function reducer(
  auth = { token: "", failed: false },
  { type, payload }
) {
  switch (type) {
    case UPDATE_TOKEN:
      return { ...auth, token: payload, failed: false };
    case FAILED_TOKEN:
      return { ...auth, failed: true };
    default:
      return auth;
  }
}
