import { ICY_JOSEPH } from "./constants";

export type Contribution = {
  repository: Pick<
    IcyJoseph.Repository,
    | "id"
    | "name"
    | "description"
    | "stargazerCount"
    | "languages"
    | "homepageUrl"
    | "url"
    | "owner"
  >;
  contributions: {
    totalCount: number;
  };
};

export type ContributionData = {
  external: Contribution[];
  owned: Contribution[];
};

export type AggregatedContribution = {
  repository: Pick<
    IcyJoseph.Repository,
    | "id"
    | "name"
    | "description"
    | "stargazerCount"
    | "languages"
    | "homepageUrl"
    | "url"
    | "owner"
  >;
  contributionsByYear: Record<number, number>;
  totalContributions: number;
};

export type AggregatedContributionData = {
  external: AggregatedContribution[];
  owned: AggregatedContribution[];
};

export function formatYearBreakdown(
  contributionsByYear: Record<number, number>
): string {
  const years = Object.keys(contributionsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return years
    .map((year) => `${year}: ${contributionsByYear[year]}`)
    .join(", ");
}

export function mostRecentContributionYear(
  contributionsByYear: Record<number, number>
): number {
  let latest = 0;

  for (const year of Object.keys(contributionsByYear)) {
    const value = Number(year);
    if (value > latest) latest = value;
  }

  return latest;
}

/**
 * Landing-page order: stars, then most recent contribution year, then total commits.
 */
export function compareAggregatedContributions(
  a: AggregatedContribution,
  b: AggregatedContribution
): number {
  const stars =
    (b.repository.stargazerCount ?? 0) - (a.repository.stargazerCount ?? 0);
  if (stars !== 0) return stars;

  const year =
    mostRecentContributionYear(b.contributionsByYear) -
    mostRecentContributionYear(a.contributionsByYear);
  if (year !== 0) return year;

  return b.totalContributions - a.totalContributions;
}

export function groupBySource(
  commitContributionsByRepository: Contribution[],
): ContributionData {
  const external: Contribution[] = [];
  const owned: Contribution[] = [];

  commitContributionsByRepository?.forEach((item) => {
    const target =
      item.repository.owner.login === ICY_JOSEPH ? owned : external;

    target.push({
      contributions: item.contributions,
      repository: {
        id: item.repository.id,
        name: item.repository.name,
        description: item.repository.description,
        stargazerCount: item.repository.stargazerCount,
        languages: item.repository.languages,
        homepageUrl: item.repository.homepageUrl,
        url: item.repository.url,
        owner: item.repository.owner,
      },
    });
  });

  return {
    external,
    owned,
  };
}

export function aggregateContributionsByRepo(
  contributionsByYear: Array<{
    year: number;
    data: ContributionData;
  }>
): AggregatedContributionData {
  const repoMap = new Map<
    string,
    {
      repository: AggregatedContribution["repository"];
      contributionsByYear: Record<number, number>;
      isOwned: boolean;
    }
  >();

  contributionsByYear.forEach(({ year, data }) => {
    const allContributions = [...(data.external ?? []), ...data.owned];

    allContributions.forEach((contribution) => {

      const repoId = contribution.repository.id;
      const existing = repoMap.get(repoId);

      if (existing) {
        existing.contributionsByYear[year] = contribution.contributions.totalCount;
      } else {
        const isOwned = contribution.repository.owner.login === ICY_JOSEPH;
        repoMap.set(repoId, {
          repository: contribution.repository,
          contributionsByYear: {
            [year]: contribution.contributions.totalCount,
          },
          isOwned,
        });
      }
    });
  });

  const external: AggregatedContribution[] = [];
  const owned: AggregatedContribution[] = [];

  repoMap.forEach(({ repository, contributionsByYear, isOwned }) => {
    const totalContributions = Object.values(contributionsByYear).reduce(
      (sum, count) => sum + count,
      0
    );

    const aggregated: AggregatedContribution = {
      repository,
      contributionsByYear,
      totalContributions,
    };

    if (isOwned) {
      owned.push(aggregated);
    } else {
      external.push(aggregated);
    }
  });

  // Sort by total contributions (descending)
  external.sort((a, b) => b.totalContributions - a.totalContributions);
  owned.sort((a, b) => b.totalContributions - a.totalContributions);

  return { external, owned };
}
