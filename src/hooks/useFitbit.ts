import useSWR from "swr";

import { client } from "utils/client";

type Period = "1d" | "7d" | "30d" | "1w" | "1m";

const profileFetcher = async () => {
  const data = await client().get<{ user: IcyJoseph.GitHub }>(
    "/api/fitbit/profile"
  );

  return data.user;
};

export const useFitbitProfile = (fallbackData = null) => {
  return useSWR("fitbit/profile", profileFetcher, {
    shouldRetryOnError: false,
    fallbackData: fallbackData,
  });
};

async function heartRateFetcher(date: string, period: Period) {
  const data = await client().get<IcyJoseph.HeartRateActivity>(
    `/api/fitbit/activities/heart/date/${date}/${period}`
  );

  return data;
}

async function activityLogFetcher(beforeDate: string) {
  const data = await client().get<IcyJoseph.ActivityLog>(
    `/api/fitbit/activities/list?${encodeURI(`beforeDate=${beforeDate}`)}`
  );

  return data;
}

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
  fallbackData: IcyJoseph.HeartRateActivity
) => {
  return useSWR<IcyJoseph.HeartRateActivity>(
    [date, period],
    (...args: [date: string, period: Period]) => heartRateFetcher(...args),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnMount,
      fallbackData: fallbackData,
    }
  );
};

type FitbitActivityLog = {
  beforeDate: string;
  initial: IcyJoseph.ActivityLog | null;
};

export const useFitbitActivityLog = ({
  beforeDate,
  initial,
}: FitbitActivityLog) => {
  return useSWR<IcyJoseph.ActivityLog | null>(beforeDate, activityLogFetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    fallbackData: initial,
  });
};
