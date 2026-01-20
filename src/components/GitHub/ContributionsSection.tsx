import { ContributionsList } from "components/GitHub/ContributionsList";
import { MAIN_LANGUAGES } from "lib/github/constants";
import type {
  AggregatedContribution,
  AggregatedContributionData,
} from "lib/github/utils";
import { formatYearBreakdown } from "lib/github/utils";

type ContributionsSectionProps = {
  data: AggregatedContributionData;
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
    if (language === "Others") return [language, repos, null];

    const primaryLangEdge = repos[0].repository.languages.edges.find(isLanguageEdge);
    const color = primaryLangEdge?.node.color ?? null;

    return [language, repos, color];
  });
}

export function ContributionsSection({ data }: ContributionsSectionProps) {
  const external = data.external ?? [];
  const owned = data.owned ?? [];

  const sortedExternal = [...external].sort(
    (a, b) => (b.repository.stargazerCount ?? 0) - (a.repository.stargazerCount ?? 0)
  );

  const sortedOwned = [...owned].sort(
    (a, b) => b.totalContributions - a.totalContributions
  );

  const contributions: AggregatedContribution[] = [...sortedExternal, ...sortedOwned];

  const enriched: EnrichedContribution[] = contributions.map((contribution) => ({
    ...contribution,
    formattedYearBreakdown: formatYearBreakdown(contribution.contributionsByYear),
  }));

  const groups = groupByLanguage(enriched);

  return <ContributionsList groups={groups} />;
}
