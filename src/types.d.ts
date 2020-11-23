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
  };

  export type Swim = {
    pace: number;
    poolLength: number;
    poolLengthUnit: string;
    speed: number;
    swimLenghts: number;
  };

  export type LandActivity = {
    steps: number;
    averageHeartRate: number;
    heartRateZones: HeartRateZones;
  };

  export type Activity<A extends "Swim" | "Land" = "Land"> = {
    activeDuration: number;
    activityLevel: ActivityLevel[];
    activityName: string;
    activityTypeId: number;
    calories: number;
    duration: number;
    startTime: string;
  } & A extends "Swim"
    ? Swim
    : LandActivity;

  export type ActivityLog = {
    activities: (Activity<"Land"> | Activity<"Swim">)[];
  };

  export type HeartRate = any;
}
