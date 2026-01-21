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

function getLanguageDisplayName(language: string, isMobile: boolean): string {
  if (!isMobile) return language;

  if (language === "TypeScript") return "TS";
  if (language === "JavaScript") return "JS";
  return language;
}

export function ContributionsList({
  groups,
  privateContributions,
}: ContributionsListProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    groups[0]?.[0] ?? ""
  );
  const contentRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip scroll on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only scroll on language changes (clicks)
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const topThreshold = viewportHeight * 0.1;
      const bottomThreshold = viewportHeight * 0.9;

      // Check if header is NOT within 10-90% of viewport height
      const isOutsideRange = rect.top < topThreshold || rect.top > bottomThreshold;

      if (isOutsideRange) {
        headerRef.current.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }
  }, [selectedLanguage]);

  if (groups.length === 0) {
    return (
      <p className="text-center text-lg text-pale-orange mt-8">
        No public GitHub contributions found yet.
      </p>
    );
  }

  const selectedLanguageData = groups.find(
    ([lang]) => lang === selectedLanguage
  );
  const selectedRepos = selectedLanguageData?.[1] ?? [];
  const selectedColor = selectedLanguageData?.[2] ?? null;

  return (
    <>
      <h3 className="font-sans text-2xl mt-12 mb-4">
        Contributions
      </h3>

      <p className="font-sans text-lg font-light">
        {ICY_JOSEPH} has also made{" "}
        <span className="text-pale-yellow">
          {privateContributions.toLocaleString()}
        </span>{" "}
        private contributions that are not shown here. These are only public contributions.
      </p>

      <div className="mt-8 flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Mobile: Wrapping Tabs */}
        <div className="md:hidden sticky top-0 z-10 bg-soft-black border-b border-zinc-700 -mx-4 px-4 py-2">
          <div className="flex flex-wrap gap-2">
            {groups.map(([language, repos, color]) => {
              const isActive = language === selectedLanguage;
              return (
                <button
                  key={language}
                  onClick={() => setSelectedLanguage(language)}
                  className={`
                    group flex items-center gap-1.5 px-3 py-2 text-xs font-sans
                    transition-colors rounded focus:outline-none focus-visible:outline-none
                    ${isActive
                      ? "bg-pale-blue/20 text-pale-yellow border border-pale-blue"
                      : "text-pale-orange hover:bg-zinc-800 hover:text-pale-yellow border border-transparent"
                    }
                  `}
                >
                  {color && (
                    <IndicatorBar
                      color={color}
                      aria-hidden="true"
                      className="w-3 h-3 flex-shrink-0"
                    />
                  )}
                  <span className={`group-focus-visible:underline ${isActive ? "font-bold" : ""}`}>
                    {getLanguageDisplayName(language, true)}
                  </span>
                  <span className="text-[0.65rem] font-light opacity-70">
                    ({repos.length})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop: Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0 sticky top-0 h-screen overflow-y-auto pr-4">
          <nav className="space-y-2 py-2">
            {groups.map(([language, repos, color]) => {
              const isActive = language === selectedLanguage;
              return (
                <button
                  key={language}
                  onClick={() => setSelectedLanguage(language)}
                  className={`
                    group w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left font-sans
                    transition-colors rounded focus:outline-none focus-visible:outline-none
                    ${isActive
                      ? "bg-pale-blue/20 text-pale-yellow border-l-2 border-pale-blue"
                      : "text-pale-orange hover:bg-zinc-800 hover:text-pale-yellow"
                    }
                  `}
                >
                  {color && (
                    <IndicatorBar
                      color={color}
                      aria-hidden="true"
                      className="w-3 h-3 flex-shrink-0"
                    />
                  )}
                  <span className={`flex-1 text-sm group-focus-visible:underline ${isActive ? "font-bold" : ""}`}>
                    {language}
                  </span>
                  <span className="text-xs font-light opacity-70">
                    {repos.length}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Panel */}
        <main ref={contentRef} className="flex-1 min-w-0">
          {selectedLanguage && selectedRepos.length > 0 && (
            <div>
              <div ref={headerRef} className="mb-8 pb-4 border-b border-zinc-700">
                <h3 className="flex items-center gap-2 text-xl text-pale-yellow font-sans">
                  {selectedColor && (
                    <IndicatorBar
                      color={selectedColor}
                      aria-hidden="true"
                      className="w-4 h-4"
                    />
                  )}
                  {selectedLanguage}
                  <span className="text-sm font-light text-pale-orange">
                    ({selectedRepos.length})
                  </span>
                </h3>
              </div>

              <ul className="space-y-6">
                {selectedRepos.map((item, index) => (
                  <li
                    key={item.repository.id}
                    className="border-b border-zinc-700 pb-3 last:border-0"
                  >
                    <ContributionEntry
                      item={item}
                      index={index}
                      total={selectedRepos.length}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
