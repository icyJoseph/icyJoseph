import { isoString } from "helpers";

const fitbitAuth = {
  baseURL: "https://api.fitbit.com/1/user/-",
  headers: {
    Authorization: `Bearer ${process.env.FITBIT_TOKEN}`,
  },
};

export const getActivityLog = async (params: Record<string, string>) => {
  const query = encodeURI(
    Object.entries({ ...params, sort: "desc", offset: 0, limit: 7 })
      .map(([key, value]) => `${key}=${value}`)
      .join("&")
  );

  const response = await fetch(
    `${fitbitAuth.baseURL}/activities/list.json?${query}`,
    {
      headers: fitbitAuth.headers,
    }
  );

  if (!response.ok) throw new Error("Failed to get activity log");

  const data = await response.json();

  return data.activities;
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
  const fitbitData: IcyJoseph.Fitbit["user"] = await fetch(
    `${fitbitAuth.baseURL}/profile.json`,
    { headers: fitbitAuth.headers }
  )
    .then((res) => res.json())
    .then((data) => data.user);

  const profile: Pick<
    IcyJoseph.FitbitProfile,
    "topBadges" | "averageDailySteps"
  > = {
    averageDailySteps: fitbitData.averageDailySteps,
    topBadges: fitbitData.topBadges,
  };

  const heartRateData: IcyJoseph.HeartRateActivity["activities-heart"] =
    await fetch(`${fitbitAuth.baseURL}/activities/heart/date/today/7d.json`, {
      headers: fitbitAuth.headers,
    })
      .then((res) => res.json())
      .then((data) => data["activities-heart"]);

  const restingHeartRate = heartRateData
    .slice(0)
    .reverse()
    .find((entry) => Boolean(entry?.value?.restingHeartRate))?.value
    .restingHeartRate;

  const fullActivityLog: IcyJoseph.ActivityLog = await getActivityLog({
    beforeDate: isoString(new Date()),
  });

  const activityLog = fullActivityLog.map((entry) => {
    const base = {
      logId: entry.logId,
      activityName: entry.activityName,
      startTime: entry.startTime,
      activeDuration: entry.activeDuration,
      calories: entry.calories,
      averageHeartRate: entry.averageHeartRate,
    };

    if (isSwimming(entry)) {
      return { ...base, distance: entry.distance, pace: entry.pace };
    }

    if (isBaseActivity(entry)) {
      return { ...base, steps: entry.steps };
    }

    return base;
  });

  return { profile, restingHeartRate, activityLog };
};
