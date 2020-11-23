declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GA_TRACKING_ID: string;
  }
}

declare namespace IcyJoseph {
  export type Rank = {
    rank: number;
    name: string;
    color: string;
    score: number;
  };

  type Ranks = {
    overall: Rank;
    languages: Record<string, Rank>;
  };

  type CodeWars = {
    name: string;
    username: string;
    honor: number;
    clan: string;
    leaderboardPosition: number;
    ranks: Ranks;
    codeChallenges: { totalCompleted: number };
  };

  export type GitHub = any;

  export type Tokei = {
    language: string;
    blanks: number;
    code: number;
    comments: number;
    inaccurate: boolean;
  };

  export type Fitbit = any;

  export type FitbitUser = any;

  type ActivityLevel = {
    minutes: number;
    name: "very" | "fairly" | "lightly" | "sedentary";
  };

  export type HeartRateZones = {
    max: number;
    min: number;
    minutes: number;
    name: "Peak" | "Cardio" | "Fat Burn" | "Out of Range";
    caloriesOut: number;
  };

  type BaseActivity = {
    activeDuration: number;
    activityLevel: ActivityLevel[];
    activityName: string;
    activityTypeId: number;
    logId: number;
    calories: number;
    duration: number;
    startTime: string;
    steps: number;
    heartRateZones: HeartRateZones;
    averageHeartRate: number;
  };

  export interface SwimActivity
    extends Omit<BaseActivity, "steps" | "heartRateZones"> {
    pace: number;
    poolLength: number;
    poolLengthUnit: string;
    speed: number;
    swimLenghts: number;
    distance: number;
  }

  export interface ActivityWithoutSteps extends Omit<BaseActivity, "steps"> {}

  export type Activities = BaseActivity | ActivityWithoutSteps | SwimActivity;

  export type ActivityLog = Activities[];

  export type HeartRatePoint = {
    dateTime: string;
    value: {
      heartRateZones: HeartRateZones[];
      restingHeartRate: number;
    };
  };

  export type HeartRateActivity = {
    "activities-heart": Array<HeartRatePoint>;
  };
}
