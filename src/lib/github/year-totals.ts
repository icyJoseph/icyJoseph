import { cacheLife, cacheTag } from "next/cache";

import { yearRange } from "helpers";
import { ICY_JOSEPH } from "lib/github/constants";
import { gitHubProfile, queryGitHub } from "lib/github/fetcher";
import { GET_YEAR_CONTRIBUTION_TOTALS } from "lib/github/queries";
import {
  getSideChannelCommitData,
  sideChannelPublicDelta,
} from "lib/github/side-channel-commits";

export type YearContributionTotal = {
  year: number;
  /** Public (graph + side-channel) + private. */
  total: number;
  public: number;
  private: number;
};

async function fetchYearTotal(year: number): Promise<{
  year: number;
  public: number;
  private: number;
}> {
  const { data } = await queryGitHub<{
    user: {
      contributionsCollection: {
        totalCommitContributions: number;
        restrictedContributionsCount: number;
      };
    };
  }>(GET_YEAR_CONTRIBUTION_TOTALS, {
    login: ICY_JOSEPH,
    ...yearRange(year),
  });

  return {
    year,
    public: data.user.contributionsCollection.totalCommitContributions ?? 0,
    private:
      data.user.contributionsCollection.restrictedContributionsCount ?? 0,
  };
}

/** All contribution years with public+private totals, newest first. */
export async function getContributionYearTotals(): Promise<{
  years: YearContributionTotal[];
  careerTotal: number;
}> {
  "use cache";
  cacheTag("github");
  cacheLife("days");

  const [{ profile }, side] = await Promise.all([
    gitHubProfile(),
    getSideChannelCommitData(),
  ]);

  const contributionYears =
    profile.contributionsCollection.contributionYears ?? [];

  const yearSet = new Set<number>([
    ...contributionYears,
    ...Object.keys(side.byYear).map(Number),
  ]);
  const allYears = Array.from(yearSet).sort((a, b) => b - a);

  // Totals query has no per-repo breakdown — side-channel repos are absent
  // from the graph today, so delta === full rest count (empty graph map).
  const emptyGraphRepos = new Map<string, number>();

  const withTotals = await Promise.all(
    allYears.map(async (year, index) => {
      if (index === 0) cacheLife("days");
      else cacheLife("max");

      const graph = contributionYears.includes(year)
        ? await fetchYearTotal(year)
        : { year, public: 0, private: 0 };

      const publicCount =
        graph.public +
        sideChannelPublicDelta(year, emptyGraphRepos, side);

      return {
        year,
        public: publicCount,
        private: graph.private,
        total: publicCount + graph.private,
      };
    }),
  );

  // Drop empty calendar years (e.g. account created in 2016 with 0 commits).
  const years = withTotals.filter((entry) => entry.total > 0);
  const careerTotal = years.reduce((sum, entry) => sum + entry.total, 0);

  return { years, careerTotal };
}
