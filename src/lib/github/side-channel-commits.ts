import { cacheLife, cacheTag } from "next/cache";

import { ICY_JOSEPH } from "lib/github/constants";
import {
  SIDE_CHANNEL_REPOS,
  type SideChannelRepo,
} from "lib/github/side-channel-repos";
import type { AggregatedContributionData } from "lib/github/utils";

const SINCE = "2018-01-01T00:00:00Z";

type CommitListItem = {
  commit: { author: { date: string } | null };
};

type RepoMeta = {
  stargazerCount: number;
  description: string | null;
  homepageUrl: string | null;
};

export type SideChannelRepoCounts = {
  owner: string;
  name: string;
  nameWithOwner: string;
  byYear: Record<number, number>;
  career: number;
  meta: RepoMeta;
  config: SideChannelRepo;
};

export type SideChannelData = {
  repos: SideChannelRepoCounts[];
  /** Total author commits across all side-channel repos, by year. */
  byYear: Record<number, number>;
  career: number;
};

async function githubRest<T>(path: string): Promise<T | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "icyJoseph-site",
    },
  });

  if (!res.ok) return null;
  return res.json() as Promise<T>;
}

async function fetchAuthorCommitsByYear(
  owner: string,
  name: string,
): Promise<Record<number, number>> {
  const byYear: Record<number, number> = {};

  for (let page = 1; page <= 50; page += 1) {
    const batch = await githubRest<CommitListItem[]>(
      `/repos/${owner}/${name}/commits?author=${ICY_JOSEPH}&since=${SINCE}&per_page=100&page=${page}`,
    );

    if (!batch || batch.length === 0) break;

    for (const item of batch) {
      const date = item.commit.author?.date;
      if (!date) continue;
      const year = Number(date.slice(0, 4));
      if (!Number.isFinite(year)) continue;
      byYear[year] = (byYear[year] ?? 0) + 1;
    }

    if (batch.length < 100) break;
  }

  return byYear;
}

/** Author commits on configured public repos, bucketed by year. */
export async function getSideChannelCommitData(): Promise<SideChannelData> {
  "use cache";
  cacheTag("github");
  cacheLife("days");

  const repos = await Promise.all(
    SIDE_CHANNEL_REPOS.map(async (config) => {
      const [byYear, meta] = await Promise.all([
        fetchAuthorCommitsByYear(config.owner, config.name),
        githubRest<{
          stargazerCount: number;
          description: string | null;
          homepageUrl: string | null;
        }>(`/repos/${config.owner}/${config.name}`),
      ]);

      const career = Object.values(byYear).reduce((sum, n) => sum + n, 0);

      return {
        owner: config.owner,
        name: config.name,
        nameWithOwner: `${config.owner}/${config.name}`,
        byYear,
        career,
        meta: {
          stargazerCount: meta?.stargazerCount ?? 0,
          description: meta?.description ?? config.description ?? null,
          homepageUrl: meta?.homepageUrl ?? config.homepageUrl ?? null,
        },
        config,
      } satisfies SideChannelRepoCounts;
    }),
  );

  const byYear: Record<number, number> = {};
  for (const repo of repos) {
    for (const [year, count] of Object.entries(repo.byYear)) {
      const y = Number(year);
      byYear[y] = (byYear[y] ?? 0) + count;
    }
  }

  const career = Object.values(byYear).reduce((sum, n) => sum + n, 0);

  return { repos, byYear, career };
}

/**
 * Fold side-channel commit counts into graph public totals + repo list.
 * Uses max(graph, rest) per repo so we never double-count if the graph
 * starts including a repo later.
 */
export function mergeSideChannelIntoYear(
  year: number,
  publicTotal: number,
  aggregated: AggregatedContributionData,
  side: SideChannelData,
): { publicTotal: number; aggregated: AggregatedContributionData } {
  let publicMerged = publicTotal;
  const external = [...aggregated.external];
  const owned = aggregated.owned;

  for (const repo of side.repos) {
    const rest = repo.byYear[year] ?? 0;
    if (rest <= 0) continue;

    const nameWithOwner = repo.nameWithOwner;
    const existingIndex = external.findIndex(
      (entry) =>
        `${entry.repository.owner.login}/${entry.repository.name}` ===
        nameWithOwner,
    );

    if (existingIndex >= 0) {
      const existing = external[existingIndex];
      const graphCount = existing.totalContributions;
      const merged = Math.max(graphCount, rest);
      const delta = merged - graphCount;
      publicMerged += delta;

      external[existingIndex] = {
        ...existing,
        totalContributions: merged,
        contributionsByYear: {
          ...existing.contributionsByYear,
          [year]: Math.max(existing.contributionsByYear[year] ?? 0, rest),
        },
      };
      continue;
    }

    publicMerged += rest;

    const lang = repo.config.language;
    external.unshift({
      totalContributions: rest,
      contributionsByYear: { [year]: rest },
      repository: {
        id: `side-channel:${nameWithOwner}`,
        name: repo.name,
        description: repo.meta.description,
        stargazerCount: repo.meta.stargazerCount,
        homepageUrl: repo.meta.homepageUrl ?? "",
        url: `https://github.com/${nameWithOwner}`,
        owner: { login: repo.owner },
        languages: {
          edges: lang
            ? [
                {
                  size: 1,
                  node: {
                    id: `lang:${lang.name}`,
                    name: lang.name,
                    color: lang.color,
                  },
                },
              ]
            : [],
          totalSize: lang ? 1 : 0,
          totalCount: lang ? 1 : 0,
        },
      },
    });
  }

  return {
    publicTotal: publicMerged,
    aggregated: { external, owned },
  };
}

/** Extra public commits for a year after deduping against graph repo counts. */
export function sideChannelPublicDelta(
  year: number,
  graphRepoCounts: Map<string, number>,
  side: SideChannelData,
): number {
  let delta = 0;

  for (const repo of side.repos) {
    const rest = repo.byYear[year] ?? 0;
    if (rest <= 0) continue;
    const graph = graphRepoCounts.get(repo.nameWithOwner) ?? 0;
    delta += Math.max(0, rest - graph);
  }

  return delta;
}
