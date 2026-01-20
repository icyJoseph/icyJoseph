"use client";

import { useState } from "react";

import { ContributionEntry } from "components/GitHub/ContributionEntry";
import { IndicatorBar } from "design-system/IndicatorBar";
import type { AggregatedContribution } from "lib/github/utils";

type EnrichedContribution = AggregatedContribution & {
  formattedYearBreakdown: string;
};

type LanguageGroup = [string, EnrichedContribution[], string | null];

type ContributionsListProps = {
  groups: LanguageGroup[];
};

export function ContributionsList({ groups }: ContributionsListProps) {
  const [expandedLanguages, setExpandedLanguages] = useState<Set<string>>(
    new Set()
  );

  if (groups.length === 0) {
    return (
      <p className="text-center text-lg text-pale-orange mt-8">
        No public GitHub contributions found yet.
      </p>
    );
  }

  const toggleLanguage = (language: string) => {
    setExpandedLanguages((prev) => {
      const next = new Set(prev);
      if (next.has(language)) {
        next.delete(language);
      } else {
        next.add(language);
      }
      return next;
    });
  };

  const INITIAL_SHOW_COUNT = 5;

  return (
    <>
      <h3 className="font-sans text-2xl mt-6 mb-4">Public GitHub contributions</h3>
      <div className="mt-8 space-y-12">
        {groups.map(([language, repos, color]) => {
          const isExpanded = expandedLanguages.has(language);
          const shouldShowMore = repos.length > INITIAL_SHOW_COUNT;
          const reposToShow = isExpanded
            ? repos
            : repos.slice(0, INITIAL_SHOW_COUNT);

          return (
            <section key={language} className="space-y-4">
              <h3 className="flex items-center gap-2 text-xl text-pale-yellow font-sans">
                {color && (
                  <IndicatorBar
                    color={color}
                    aria-hidden="true"
                    className="w-4 h-4"
                  />
                )}
                {language}
                <span className="text-sm font-light text-pale-orange">
                  ({repos.length})
                </span>
              </h3>

              <ul className="space-y-3">
                {reposToShow.map((item) => {
                  return (
                    <li
                      key={item.repository.id}
                      className="border-b border-zinc-700 pb-3 last:border-0"
                    >
                      <ContributionEntry item={item} />
                    </li>
                  );
                })}
              </ul>

              {shouldShowMore && (
                <button
                  onClick={() => toggleLanguage(language)}
                  className="text-sm text-pale-blue hover:text-pale-yellow underline font-light"
                >
                  {isExpanded
                    ? `Show less (${repos.length - INITIAL_SHOW_COUNT} hidden)`
                    : `Show more (${repos.length - INITIAL_SHOW_COUNT} more)`}
                </button>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
