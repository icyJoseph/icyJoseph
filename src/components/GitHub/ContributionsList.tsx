"use client";

import { useEffect, useRef, useState } from "react";

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
  privateContributions: number;
};

type ShowMoreListProps = {
  visibleCount: number;
  children: React.ReactNode;
};

function ShowMoreList({ visibleCount, children }: ShowMoreListProps) {
  const containerRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const childrenArray = Array.from(el.children) as HTMLElement[];
    childrenArray.forEach((child, index) => {
      if (visibleCount === Infinity || index < visibleCount) {
        child.style.display = "";
      } else {
        child.style.display = "none";
      }
    });
  }, [visibleCount, children]);

  return (
    <ul ref={containerRef} className="space-y-6">
      {children}
    </ul>
  );
}

export function ContributionsList({
  groups,
  privateContributions,
}: ContributionsListProps) {
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
      <h3 className="font-sans text-2xl mt-12 mb-1">
        Public GitHub contributions
      </h3>
      <p className="text-sm text-pale-orange">
        {ICY_JOSEPH} has also made{" "}
        <span className="text-pale-yellow">
          {privateContributions.toLocaleString()}
        </span>{" "}
        private contributions that are not shown here.
      </p>

      <div className="mt-8 space-y-12">
        {groups.map(([language, repos, color]) => {
          const isExpanded = expandedLanguages.has(language);
          const shouldShowMore = repos.length > INITIAL_SHOW_COUNT;
          const visibleCount = isExpanded ? Infinity : INITIAL_SHOW_COUNT;

          return (
            <section key={language} className="space-y-4">
              <div className="sticky top-0 z-10 bg-soft-black border-b border-zinc-700">
                <h3 className="flex items-center justify-between gap-4 text-xl text-pale-yellow font-sans py-3">
                  <span className="flex items-center gap-2">
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
                  </span>
                  {shouldShowMore && (
                    <button
                      onClick={() => toggleLanguage(language)}
                      className="text-xs text-pale-blue hover:text-pale-yellow underline font-light"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </h3>
              </div>

              <ShowMoreList visibleCount={visibleCount}>
                {repos.map((item, index) => (
                  <li
                    key={item.repository.id}
                    className="border-b border-zinc-700 pb-3 last:border-0"
                  >
                    <ContributionEntry
                      item={item}
                      index={index}
                      total={repos.length}
                    />
                  </li>
                ))}
              </ShowMoreList>
            </section>
          );
        })}
      </div>
    </>
  );
}
