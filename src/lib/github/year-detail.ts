import { cacheLife, cacheTag } from "next/cache";

import { gitHubContributions, gitHubProfile } from "lib/github/fetcher";
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

export type YearContributionDetail = {
  year: number;
  years: number[];
  publicTotal: number;
  privateTotal: number;
  total: number;
  aggregated: AggregatedContributionData;
};

export async function getContributionYears(): Promise<number[]> {
  "use cache";
  cacheTag("github");
  cacheLife("days");

  const [{ profile }, side] = await Promise.all([
    gitHubProfile(),
    getSideChannelCommitData(),
  ]);

  const years = new Set<number>([
    ...(profile.contributionsCollection.contributionYears ?? []),
    ...Object.keys(side.byYear).map(Number),
  ]);

  return Array.from(years).sort((a, b) => b - a);
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
