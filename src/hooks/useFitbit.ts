import { useEffect, useRef } from "react";
import axios from "axios";
import useSWR from "swr";

type Period = "1d" | "7d" | "30d" | "1w" | "1m";

const profileFetcher = () =>
  axios
    .get<IcyJoseph.FitbitUser>("/api/fitbit/profile")
    .then(({ data }) => data.user);

export const useFitbitProfile = (initialData = null) => {
  return useSWR("fitbit/profile", profileFetcher, {
    shouldRetryOnError: false,
    initialData
  });
};

const heartRateFetcher = (date: string, period: Period) => {
  return axios
    .get(`/api/fitbit/activities/heart/date/${date}/${period}`)
    .then(({ data }) => data);
};

// type could be date/YYYY-MM-DD
// or frequent, recent
const activityFetcher = (type: string) => {
  if (type === "lifeTime")
    return axios.get(`/api/fitbit/activities`).then(({ data }) => data);
  return axios.get(`/api/fitbit/activities/${type}`).then(({ data }) => data);
};

const activityLogFetcher = async (beforeDate: string) => {
  await new Promise((resolve) => setTimeout(resolve, 750));

  return await axios
    .get<IcyJoseph.ActivityLog>(`/api/fitbit/activities/list`, {
      params: { beforeDate },
      paramsSerializer: (params = {}) => {
        return encodeURI(
          Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join("&")
        );
      }
    })
    .then(({ data }) => data);
};

// GET https://api.fitbit.com/1/user/[user-id]/activities/heart/date/[date]/[period].json
// GET https://api.fitbit.com/1/user/[user-id]/activities/heart/date/[base-date]/[end-date].json
// base-date	The range start date, in the format yyyy-MM-dd or today.
// end-date	The end date of the range.
// date	The end date of the period specified in the format yyyy-MM-dd or today.
// period	The range for which data will be returned. Options are 1d, 7d, 30d, 1w, 1m.

type UseFitbitHRProps = {
  date: string;
  period: Period;
  revalidateOnMount: boolean;
};

export const useFitbitHR = (
  { date, period, revalidateOnMount = false }: UseFitbitHRProps,
  initialData: IcyJoseph.HeartRateActivity
) => {
  return useSWR<IcyJoseph.HeartRateActivity>(
    [date, period],
    (...args: [date: string, period: Period]) => heartRateFetcher(...args),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnMount,
      initialData
    }
  );
};

export const useFitbitActivity = (type = "lifeTime") => {
  return useSWR(["activity", type], (_, type) => activityFetcher(type), {
    shouldRetryOnError: false,
    revalidateOnFocus: false
  });
};

export const useFitbitActivityLog = (
  beforeDate: string,
  initial: IcyJoseph.ActivityLog | null
) => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  return useSWR<IcyJoseph.ActivityLog | null>(beforeDate, activityLogFetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    initialData: mounted.current ? null : initial
  });
};
