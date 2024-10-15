import { z } from "zod";

import { isoString } from "helpers";

const fitbitAuth = {
  baseURL: "https://api.fitbit.com/1/user/-",
  headers: {
    Authorization: `Bearer ${process.env.FITBIT_TOKEN}`,
  },
};

export const getActivityLog = async (
  beforeDate = new Date()
): Promise<Array<ReducedActivityLog>> => {
  const search = new URLSearchParams({
    sort: "desc",
    offset: "0",
    limit: "7",
    beforeDate: isoString(beforeDate),
  });

  const response = await fetch(
    `${fitbitAuth.baseURL}/activities/list.json?${search}`,
    {
      headers: fitbitAuth.headers,
    }
  );

  if (!response.ok) throw new Error("Failed to get activity log");

  const data = await response.json();

  const activities = data?.activities ?? [];

  if (!Array.isArray(activities)) {
    // invalid shape
    return [];
  }

  const activityLog = activities
    .map((entry) => {
      const base = parseBaseData(entry);

      if (!base) return null;

      if (isSwimming(entry)) {
        return { ...base, distance: entry.distance, pace: entry.pace };
      }

      if (isBaseActivity(entry)) {
        return { ...base, steps: entry.steps };
      }

      return base;
    })
    .filter(<T>(v: T | null): v is T => !!v);

  return activityLog;
};

type SharedActivityKeys = Extract<
  keyof IcyJoseph.Activities,
  | "logId"
  | "activityName"
  | "startTime"
  | "activeDuration"
  | "calories"
  | "averageHeartRate"
>;

type ReducedActivityLog = Pick<IcyJoseph.Activities, SharedActivityKeys> &
  (
    | Pick<IcyJoseph.BaseActivity, "steps" | "averageHeartRate">
    | Pick<IcyJoseph.SwimActivity, "distance" | "pace">
    | Pick<IcyJoseph.ActivityWithoutSteps, "averageHeartRate">
  );

const baseDataObject = z.object({
  logId: z.number(),
  activityName: z.string(),
  startTime: z.string(),
  activeDuration: z.number(),
  calories: z.number(),
  averageHeartRate: z.number(),
});

const parseBaseData = (
  entry: unknown
): Pick<IcyJoseph.Activities, SharedActivityKeys> | null => {
  const result = baseDataObject.safeParse(entry);

  if (result.success) return result.data;

  return null;
};

const isBaseActivity = (
  activity: ReducedActivityLog
): activity is IcyJoseph.BaseActivity => {
  switch (activity.activityName) {
    case "Walk":
    case "Sport":
    case "Run":
    case "Aerobic Workout":
      return true;

    default:
      return false;
  }
};

const isSwimming = (act: ReducedActivityLog): act is IcyJoseph.SwimActivity =>
  act.activityName === "Swim";

export const fitBitProfile = async () => {
  const fitbitData: Promise<IcyJoseph.Fitbit["user"]> = fetch(
    `${fitbitAuth.baseURL}/profile.json`,
    { headers: fitbitAuth.headers }
  )
    .then((res) => res.json())
    .then((data) => data.user);

  const heartRateData: Promise<
    IcyJoseph.HeartRateActivity["activities-heart"]
  > = fetch(`${fitbitAuth.baseURL}/activities/heart/date/today/7d.json`, {
    headers: fitbitAuth.headers,
  })
    .then((res) => res.json())
    .then((data) => data["activities-heart"]);

  await Promise.allSettled([fitbitData, heartRateData]);

  const profile: Pick<
    IcyJoseph.FitbitProfile,
    "topBadges" | "averageDailySteps"
  > = {
    averageDailySteps: (await fitbitData).averageDailySteps,
    topBadges: (await fitbitData).topBadges,
  };

  const restingHeartRate = (await heartRateData)
    .slice(0)
    .reverse()
    .find((entry) => Boolean(entry?.value?.restingHeartRate))?.value
    .restingHeartRate;

  return { profile, restingHeartRate };
};
