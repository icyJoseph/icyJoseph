//action types
export const FETCH_FEED = "fetch_feed";
export const FETCH_POST = "fetch_post";
export const SUCCESS_FEED = "success_feed";
export const SUCCESS_POST = "success_post";
export const FAIL_FEED = "fail_feed";
export const FAIL_POST = "fail_post";

// actions
export const fetchFeed = () => {
  return {
    type: FETCH_FEED
  };
};

export const fetchPost = id => {
  return {
    type: FETCH_POST,
    payload: id
  };
};

export default function reducer(
  medium = {
    feed: { user: {}, articles: {} },
    post: [],
    loadingFeed: false,
    loadingPost: false
  },
  { type, payload, ...rest }
) {
  switch (type) {
    case FETCH_FEED:
      return { ...medium, loadingFeed: true };
    case FETCH_POST:
      return { ...medium, loadingPost: true };
    case SUCCESS_FEED:
      return {
        ...medium,
        loadingFeed: false,
        feed: payload,
        expiry: rest.expiry
      };
    case SUCCESS_POST:
      return { ...medium, loadingPost: false, post: payload };
    default:
      return medium;
  }
}
