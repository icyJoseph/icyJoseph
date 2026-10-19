/**
 * @jest-environment node
 */

import {
  compareAggregatedContributions,
  type AggregatedContribution,
} from "./utils";

function contribution(
  overrides: Partial<AggregatedContribution> & {
    stars?: number;
    years?: Record<number, number>;
    commits?: number;
  }
): AggregatedContribution {
  const years = overrides.years ?? { 2024: overrides.commits ?? 1 };
  const total =
    overrides.commits ??
    Object.values(years).reduce((sum, count) => sum + count, 0);

  return {
    repository: {
      id: overrides.repository?.id ?? "id",
      name: overrides.repository?.name ?? "repo",
      description: null,
      stargazerCount: overrides.stars ?? 0,
      languages: { edges: [], totalSize: 0, totalCount: 0 },
      homepageUrl: "",
      url: "",
      owner: { login: "icyJoseph" },
    },
    contributionsByYear: years,
    totalContributions: total,
  };
}

describe("compareAggregatedContributions", () => {
  it("ranks higher star counts first", () => {
    const popular = contribution({ stars: 100, years: { 2020: 1 } });
    const recent = contribution({ stars: 2, years: { 2026: 40 } });

    expect(
      [recent, popular].sort(compareAggregatedContributions).map((item) => item.repository.stargazerCount)
    ).toEqual([100, 2]);
  });

  it("breaks star ties with the most recent contribution year", () => {
    const older = contribution({ stars: 10, years: { 2022: 30 }, commits: 30 });
    const newer = contribution({ stars: 10, years: { 2025: 2 }, commits: 2 });

    expect(
      [older, newer].sort(compareAggregatedContributions).map((item) => item.contributionsByYear)
    ).toEqual([{ 2025: 2 }, { 2022: 30 }]);
  });

  it("breaks year ties with total commits", () => {
    const fewer = contribution({
      stars: 10,
      years: { 2024: 2, 2021: 1 },
      commits: 3,
    });
    const more = contribution({
      stars: 10,
      years: { 2024: 8 },
      commits: 8,
    });

    expect(
      [fewer, more].sort(compareAggregatedContributions).map((item) => item.totalContributions)
    ).toEqual([8, 3]);
  });
});
