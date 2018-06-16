// action types
export const FETCH_GIST = "fetch_gist";
export const SUCCESS_FETCH_GIST = "success_gist";
export const FAILED_FETCH_GIST = "failed_gist";

// actions
export const fetchGist = gist => {
  return {
    type: FETCH_GIST,
    payload: gist
  };
};

// reducer
export default function reducer(
  gist = { gist: "", expiry: "" },
  { type, payload, ...rest }
) {
  switch (type) {
    case FETCH_GIST:
      return { ...gist, loading: true };
    case SUCCESS_FETCH_GIST:
      return { ...gist, gist: payload, loading: false, expiry: rest.expiry };
    default:
      return gist;
  }
}
