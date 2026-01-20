import { cacheLife } from "next/cache";

import { gitHubProfile } from "./fetcher";
import { gitHubContributions } from "./fetcher";
import { groupBySource, aggregateContributionsByRepo, type Contribution } from "./utils";

export async function getAllContributions() {
  "use cache: remote";

  // Get all available years
  const github = await gitHubProfile();
  const contributionYears = github.profile.contributionsCollection.contributionYears;

  // Fetch contributions for all years in parallel
  const yearDataPromises = contributionYears.map(async (year) => {
    const yearData = await gitHubContributions(year);

    // Set cache based on year
    if (yearData.contributionYears[0] === year) {
      cacheLife("days");
    } else {
      cacheLife("max");
    }

    const commitContributionsByRepository =
      (yearData?.commitContributionsByRepository ?? []) as Contribution[];

    const grouped = groupBySource(
      commitContributionsByRepository,
    );

    return {
      year,
      data: grouped,
      restrictedContributionsCount: yearData.restrictedContributionsCount ?? 0,
    };
  });

  const contributionsByYear = await Promise.all(yearDataPromises);

  const totalRestrictedContributions = contributionsByYear.reduce(
    (sum, entry) => sum + entry.restrictedContributionsCount,
    0
  );

  // Aggregate all contributions by repository
  const aggregated = aggregateContributionsByRepo(
    contributionsByYear.map(({ year, data }) => ({ year, data }))
  );

  return {
    aggregated,
    contributionYears,
    totalRestrictedContributions,
  };
}
