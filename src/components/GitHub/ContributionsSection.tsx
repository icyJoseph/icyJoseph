import { ContributionsList } from "components/GitHub/ContributionsList";
import { MAIN_LANGUAGES } from "lib/github/constants";
import type {
  AggregatedContribution,
  AggregatedContributionData,
} from "lib/github/utils";
import { formatYearBreakdown } from "lib/github/utils";

type ContributionsSectionProps = {
  data: AggregatedContributionData;
  privateContributions: number;
};

type EnrichedContribution = AggregatedContribution & {
  formattedYearBreakdown: string;
};

type LanguageGroup = [string, EnrichedContribution[], string | null];

const MAIN_LANGUAGES_SET = new Set<string>(MAIN_LANGUAGES);

const isLanguageEdge = (
  edge: IcyJoseph.LanguageEdge | null
): edge is IcyJoseph.LanguageEdge => Boolean(edge);

function getPrimaryLanguage(repo: AggregatedContribution["repository"]): string {
  const languages = repo.languages.edges.filter(isLanguageEdge);
  const primaryLang = languages[0]?.node.name;

  if (!primaryLang) return "Others";

  return MAIN_LANGUAGES_SET.has(primaryLang) ? primaryLang : "Others";
}

function groupByLanguage(
  contributions: EnrichedContribution[]
): LanguageGroup[] {
  const grouped = new Map<string, EnrichedContribution[]>();

  contributions.forEach((contribution) => {
    const lang = getPrimaryLanguage(contribution.repository);
    const existing = grouped.get(lang) || [];
    grouped.set(lang, [...existing, contribution]);
  });

  const mainLanguages = Array.from(grouped.entries())
    .filter(([lang]) => MAIN_LANGUAGES_SET.has(lang as string))
    .sort((a, b) => b[1].length - a[1].length);

  const others = grouped.get("Others");
  const othersEntry = others ? [["Others", others] as const] : [];

  const orderedMain = [
    mainLanguages.find(([lang]) => lang === "TypeScript"),
    mainLanguages.find(([lang]) => lang === "JavaScript"),
    mainLanguages.find(([lang]) => lang === "Rust"),
    mainLanguages.find(([lang]) => lang === "Swift"),
  ].filter(Boolean) as Array<[string, EnrichedContribution[]]>;

  const ordered = [...orderedMain, ...othersEntry];

  return ordered.map(([language, repos]) => {
    if (language === "Others") {
      const filteredRepos = repos.filter((repo) =>
        Boolean(repo.repository.description)
      );
      return [language, filteredRepos, null];
    }

    const primaryLangEdge = repos[0].repository.languages.edges.find(isLanguageEdge);
    const color = primaryLangEdge?.node.color ?? null;

    return [language, repos, color];
  });
}

/**
 * Get the most recent year with contributions for a repository
 * Returns the year and the contribution count for that year
 */
function getMostRecentYear(
  contributionsByYear: Record<number, number>
): { year: number; count: number } | null {
  const years = Object.keys(contributionsByYear)
    .map(Number)
    .sort((a, b) => b - a); // Sort descending (most recent first)

  if (years.length === 0) return null;

  const mostRecentYear = years[0];
  return {
    year: mostRecentYear,
    count: contributionsByYear[mostRecentYear],
  };
}

/**
 * Sort contributions by recency - repos with contributions in more recent years
 * float to the top, then by contribution count in that year
 */
function sortByRecency(
  a: AggregatedContribution,
  b: AggregatedContribution
): number {
  const aRecent = getMostRecentYear(a.contributionsByYear);
  const bRecent = getMostRecentYear(b.contributionsByYear);

  // If one has no contributions, put it at the bottom
  if (!aRecent && !bRecent) return 0;
  if (!aRecent) return 1;
  if (!bRecent) return -1;

  // Sort by most recent year first (descending)
  if (aRecent.year !== bRecent.year) {
    return bRecent.year - aRecent.year;
  }

  // If same year, sort by contribution count in that year (descending)
  if (aRecent.count !== bRecent.count) {
    return bRecent.count - aRecent.count;
  }

  // Fallback to total contributions
  return b.totalContributions - a.totalContributions;
}

export function ContributionsSection({
  data,
  privateContributions,
}: ContributionsSectionProps) {
  const external = data.external ?? [];
  const owned = data.owned ?? [];

  // Sort by recency - repos with recent contributions float to the top
  const sortedExternal = [...external].sort((a, b) => {
    // First try recency-based sorting
    const recencyDiff = sortByRecency(a, b);
    if (recencyDiff !== 0) return recencyDiff;
    
    // If recency is the same, fallback to stargazer count for external repos
    return (b.repository.stargazerCount ?? 0) - (a.repository.stargazerCount ?? 0);
  });

  const sortedOwned = [...owned].sort(sortByRecency);

  const contributions: AggregatedContribution[] = [
    ...sortedExternal,
    ...sortedOwned,
  ]

  const enriched: EnrichedContribution[] = contributions.map((contribution) => ({
    ...contribution,
    formattedYearBreakdown: formatYearBreakdown(contribution.contributionsByYear),
  }));

  const groups = groupByLanguage(enriched);

  return (
    <ContributionsList
      groups={groups}
      privateContributions={privateContributions}
    />
  );
}
