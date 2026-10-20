"use client";

import { useMemo, useState } from "react";

import { ContributionEntry } from "components/GitHub/ContributionEntry";
import { IndicatorBar } from "design-system/IndicatorBar";
import { ICY_JOSEPH } from "lib/github/constants";
import type { AggregatedContribution } from "lib/github/utils";

type EnrichedContribution = AggregatedContribution & {
  formattedYearBreakdown: string;
};

type LanguageGroup = [string, EnrichedContribution[], string | null];

type ContributionsListProps = {
  groups: LanguageGroup[];
  year?: number;
};

const ALL = "All";
const HIGHLIGHT_LIMIT = 4;

function yearScore(item: EnrichedContribution, year?: number): number {
  if (year != null && item.contributionsByYear[year] != null) {
    return item.contributionsByYear[year];
  }
  return item.totalContributions;
}

/** Mix of notable external + high-weight owned — big and small signal. */
function pickHighlights(
  repos: EnrichedContribution[],
  year?: number,
): EnrichedContribution[] {
  const external = repos
    .filter((r) => r.repository.owner.login !== ICY_JOSEPH)
    .sort((a, b) => {
      const stars =
        (b.repository.stargazerCount ?? 0) - (a.repository.stargazerCount ?? 0);
      if (stars !== 0) return stars;
      return yearScore(b, year) - yearScore(a, year);
    });

  const owned = repos
    .filter((r) => r.repository.owner.login === ICY_JOSEPH)
    .sort((a, b) => yearScore(b, year) - yearScore(a, year));

  const picks: EnrichedContribution[] = [];
  const seen = new Set<string>();

  const take = (list: EnrichedContribution[], maxFromList: number) => {
    let taken = 0;
    for (const item of list) {
      if (picks.length >= HIGHLIGHT_LIMIT) break;
      if (taken >= maxFromList) break;
      if (seen.has(item.repository.id)) continue;
      seen.add(item.repository.id);
      picks.push(item);
      taken += 1;
    }
  };

  take(external, 2);
  take(owned, 2);
  take([...external, ...owned], HIGHLIGHT_LIMIT);

  return picks;
}

export function ContributionsList({
  groups,
  year,
}: ContributionsListProps) {
  const [filter, setFilter] = useState(ALL);

  const allRepos = useMemo(
    () => groups.flatMap(([, repos]) => repos),
    [groups],
  );

  const highlights = useMemo(
    () => pickHighlights(allRepos, year),
    [allRepos, year],
  );

  const highlightIds = useMemo(
    () => new Set(highlights.map((h) => h.repository.id)),
    [highlights],
  );

  const showHighlights = filter === ALL && highlights.length > 0;

  const restRepos = useMemo(() => {
    if (filter === ALL) {
      return allRepos.filter((r) => !highlightIds.has(r.repository.id));
    }
    // Language filter: full list for that language (highlights included once).
    return groups.find(([lang]) => lang === filter)?.[1] ?? [];
  }, [allRepos, filter, groups, highlightIds]);

  if (groups.length === 0) {
    return (
      <p className="text-center text-lg text-flare mt-8">
        No public GitHub contributions found
        {year ? ` for ${year}` : " yet"}.
      </p>
    );
  }

  return (
    <div className="contrib-explore">
      <h3 className="contrib-explore__title">
        {year ? `Work in ${year}` : "Contributions"}
      </h3>

      {showHighlights ? (
        <section className="contrib-explore__highlights" aria-label="Highlights">
          <h4 className="contrib-explore__section-label">Highlights</h4>
          <ul className="contrib-explore__grid contrib-explore__grid--highlights">
            {highlights.map((item) => (
              <li key={item.repository.id}>
                <ContributionEntry item={item} variant="highlight" year={year} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <h4 className="contrib-explore__section-label">
        {showHighlights ? "More from this year" : "Repos"}
      </h4>

      <nav className="contrib-explore__filters" aria-label="Filter by language">
        <FilterChip
          label={ALL}
          count={allRepos.length}
          active={filter === ALL}
          onSelect={() => setFilter(ALL)}
        />
        {groups.map(([language, repos, color]) => (
          <FilterChip
            key={language}
            label={language}
            count={repos.length}
            color={color}
            active={filter === language}
            onSelect={() => setFilter(language)}
          />
        ))}
      </nav>

      <div className="contrib-explore__panel">
        {restRepos.length === 0 ? (
          <p className="contrib-explore__empty">
            {filter === ALL
              ? "Everything notable is in highlights."
              : `No other ${filter} repos this year.`}
          </p>
        ) : (
          <ul className="contrib-explore__grid contrib-explore__grid--tiles">
            {restRepos.map((item) => (
              <li key={item.repository.id}>
                <ContributionEntry item={item} variant="tile" year={year} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  count,
  color,
  active,
  onSelect,
}: {
  label: string;
  count: number;
  color?: string | null;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={
        active
          ? "contrib-explore__chip contrib-explore__chip--active"
          : "contrib-explore__chip"
      }
    >
      {color ? (
        <IndicatorBar color={color} aria-hidden className="w-2.5 h-2.5" />
      ) : null}
      <span>{label}</span>
      <span className="contrib-explore__chip-count">{count}</span>
    </button>
  );
}
