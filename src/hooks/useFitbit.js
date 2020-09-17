import axios from "axios";
import useSWR from "swr";

const profileFetcher = () =>
  axios.get("/api/fitbit/profile").then(({ data }) => data.user);

export const useFitbitProfile = (initialData = null) => {
  return useSWR("fitbit/profile", profileFetcher, {
    shouldRetryOnError: false,
    initialData
  });
};

const heartRateFetcher = (date, period) => {
  return axios
    .get(`/api/fitbit/activities/heart/date/${date}/${period}`)
    .then(({ data }) => data);
};

// GET https://api.fitbit.com/1/user/[user-id]/activities/heart/date/[date]/[period].json
// GET https://api.fitbit.com/1/user/[user-id]/activities/heart/date/[base-date]/[end-date].json
// base-date	The range start date, in the format yyyy-MM-dd or today.
// end-date	The end date of the range.
// date	The end date of the period specified in the format yyyy-MM-dd or today.
// period	The range for which data will be returned. Options are 1d, 7d, 30d, 1w, 1m.
export const useFitbitHR = ({ date, period }) => {
  return useSWR([date, period], (...args) => heartRateFetcher(...args), {
    shouldRetryOnError: false,
    revalidateOnFocus: false
  });
};
