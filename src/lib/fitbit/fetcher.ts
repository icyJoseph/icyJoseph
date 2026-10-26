import { cacheLife } from "next/cache";
import { z } from "zod";

import { isoString } from "helpers";
import { trendFromSeries, type VitalTrend } from "lib/fitbit/trend";

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

type StepsPoint = { dateTime: string; value: string };

export const fitBitProfile = async (): Promise<{
  profile: Pick<IcyJoseph.FitbitProfile, "topBadges" | "averageDailySteps">;
  restingHeartRate: number | undefined;
  /** 7-day mean from the steps time series (HUD); not the lifetime profile avg. */
  stepsAverage: number;
  heartTrend: VitalTrend | undefined;
  stepsTrend: VitalTrend | undefined;
}> => {
  "use cache";
  cacheLife("days");

  const fitbitData: Promise<IcyJoseph.Fitbit["user"]> = fetch(
    `${fitbitAuth.baseURL}/profile.json`,
    { headers: fitbitAuth.headers },
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

  const stepsData: Promise<StepsPoint[]> = fetch(
    `${fitbitAuth.baseURL}/activities/steps/date/today/7d.json`,
    { headers: fitbitAuth.headers },
  )
    .then((res) => res.json())
    .then((data) => data["activities-steps"] ?? []);

  const [fitbitResult, heartResult, stepsResult] = await Promise.allSettled([
    fitbitData,
    heartRateData,
    stepsData,
  ]);

  const fitbitUser =
    fitbitResult.status === "fulfilled" ? fitbitResult.value : null;

  const profile: Pick<
    IcyJoseph.FitbitProfile,
    "topBadges" | "averageDailySteps"
  > = {
    averageDailySteps: fitbitUser?.averageDailySteps ?? 0,
    topBadges: fitbitUser?.topBadges ?? [],
  };

  const heartSeries =
    heartResult.status === "fulfilled" ? (heartResult.value ?? []) : [];

  const restingRates = heartSeries
    .map((entry) => entry?.value?.restingHeartRate)
    .filter((n): n is number => typeof n === "number" && n > 0);

  const restingHeartRate =
    restingRates.length > 0 ? restingRates[restingRates.length - 1] : undefined;

  // 1 bpm — ignore tiny RHR noise across the week halves.
  const heartTrend = trendFromSeries(restingRates, 1);

  const stepsSeries =
    stepsResult.status === "fulfilled" ? (stepsResult.value ?? []) : [];
  // Fitbit’s last point is usually today (partial) — drop it without Date()
  // so this stays safe under `"use cache"`.
  const completedSeries =
    stepsSeries.length > 0 ? stepsSeries.slice(0, -1) : stepsSeries;
  const dailySteps = completedSeries
    .map((entry) => Number(entry.value))
    .filter((n) => Number.isFinite(n) && n > 0);

  const stepsAverage =
    dailySteps.length > 0
      ? Math.round(dailySteps.reduce((a, b) => a + b, 0) / dailySteps.length)
      : (profile.averageDailySteps ?? 0);

  // Later half of the week vs earlier. ~300 steps = flat noise.
  const stepsTrend = trendFromSeries(dailySteps, 300);

  return {
    profile,
    restingHeartRate,
    stepsAverage,
    heartTrend,
    stepsTrend,
  };
};
