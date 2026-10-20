import { cacheLife, cacheTag } from "next/cache";

import { gitHubContributions } from "lib/github/fetcher";
import {
  getSideChannelCommitData,
  mergeSideChannelIntoYear,
} from "lib/github/side-channel-commits";
import {
  aggregateContributionsByRepo,
  groupBySource,
  type AggregatedContributionData,
  type Contribution,
} from "lib/github/utils";
import { getContributionYearTotals } from "lib/github/year-totals";

export type YearContributionDetail = {
  year: number;
  years: number[];
  publicTotal: number;
  privateTotal: number;
  total: number;
  aggregated: AggregatedContributionData;
};

/** Years with at least one contribution (public or private), newest first. */
export async function getContributionYears(): Promise<number[]> {
  const { years } = await getContributionYearTotals();
  return years.map((entry) => entry.year);
}

export async function getContributionsForYear(
  year: number,
): Promise<YearContributionDetail | null> {
  "use cache";
  cacheTag("github");

  const years = await getContributionYears();
  if (!years.includes(year)) return null;

  const currentYear = years[0];
  if (year === currentYear) cacheLife("days");
  else cacheLife("max");

  const [yearData, side] = await Promise.all([
    gitHubContributions(year),
    getSideChannelCommitData(),
  ]);

  const commitContributionsByRepository = (yearData.commitContributionsByRepository ??
    []) as Contribution[];

  const grouped = groupBySource(commitContributionsByRepository);
  const aggregated = aggregateContributionsByRepo([
    { year, data: grouped },
  ]);

  const privateTotal = yearData.restrictedContributionsCount ?? 0;
  const merged = mergeSideChannelIntoYear(
    year,
    yearData.totalCommitContributions ?? 0,
    aggregated,
    side,
  );

  return {
    year,
    years,
    publicTotal: merged.publicTotal,
    privateTotal,
    total: merged.publicTotal + privateTotal,
    aggregated: merged.aggregated,
  };
}
