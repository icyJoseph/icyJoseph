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

  export type Tokei = any;

  export type Fitbit = any;

  export type ActivityLog = any;

  export type HeartRate = any;
}
