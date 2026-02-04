"use client";

import { useMemo, useRef, useState } from "react";

import { ContributionEntry } from "components/GitHub/ContributionEntry";
import { ShowMore } from "components/ShowMore";
import { ToggleButton } from "components/ToggleButton";
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

// Tailwind md breakpoint (matches md: prefix)
const DESKTOP_BREAKPOINT = 768;

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
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const desktopContentRef = useRef<HTMLDivElement>(null);
  const mobileTabsSentinelRef = useRef<HTMLDivElement>(null);
  const desktopSentinelRef = useRef<HTMLDivElement>(null);

  const selectedLanguageData = useMemo(
    () => groups.find(([lang]) => lang === selectedLanguage),
    [groups, selectedLanguage]
  );
  const selectedRepos = useMemo(
    () => selectedLanguageData?.[1] ?? [],
    [selectedLanguageData]
  );
  const selectedColor = selectedLanguageData?.[2] ?? null;

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);

    // Only scroll if the sentinel is above the viewport (user has scrolled past the list start)
    const scrollIfSentinelAboveViewport = (sentinel: HTMLElement | null) => {
      if (!sentinel) return;

      const rect = sentinel.getBoundingClientRect();
      // Threshold: only scroll if sentinel is above viewport (with some margin for sticky header)
      const threshold = 100; // px above viewport top

      if (rect.top < -threshold) {
        sentinel.scrollIntoView({ behavior: "auto", block: "start" });
      }
    };

    // Scroll to sentinel based on viewport size
    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
      scrollIfSentinelAboveViewport(desktopSentinelRef.current);
    } else {
      scrollIfSentinelAboveViewport(mobileTabsSentinelRef.current);
    }
  };


  if (groups.length === 0) {
    return (
      <p className="text-center text-lg text-pale-orange mt-8">
        No public GitHub contributions found yet.
      </p>
    );
  }


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

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div ref={mobileTabsSentinelRef} className="h-0" aria-hidden="true" />
        <MobileTabs
          groups={groups}
          selectedLanguage={selectedLanguage}
          selectedRepos={selectedRepos}
          onLanguageChange={handleLanguageChange}
          contentRef={mobileContentRef}
          sentinelRef={mobileTabsSentinelRef}
        />
        <DesktopSidebar
          groups={groups}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
        <div ref={desktopSentinelRef} className="hidden md:block h-0" aria-hidden="true" />
        <ContentPanel
          contentRef={contentRef}
          mobileContentRef={mobileContentRef}
          desktopContentRef={desktopContentRef}
          selectedLanguage={selectedLanguage}
          selectedRepos={selectedRepos}
          selectedColor={selectedColor}
          headerRef={headerRef}
        />
      </div>
    </>
  );
}

type MobileTabsProps = {
  groups: LanguageGroup[];
  selectedLanguage: string;
  selectedRepos: EnrichedContribution[];
  onLanguageChange: (language: string) => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
};

function MobileTabs({
  groups,
  selectedLanguage,
  selectedRepos,
  onLanguageChange,
  contentRef,
  sentinelRef,
}: MobileTabsProps) {
  const handleToggle = () => {
    if (!contentRef.current) return;
    // Remove CSS data attribute on first interaction
    if (contentRef.current.hasAttribute("data-show-more-initial")) {
      contentRef.current.removeAttribute("data-show-more-initial");
      const listElement = contentRef.current.querySelector("ul");
      if (listElement) {
        const elements = Array.from(listElement.children) as HTMLElement[];
        const elementsToHide = elements.slice(5);
        elementsToHide.forEach((element) => {
          element.classList.add("hidden");
        });
      }
    }
    const listElement = contentRef.current.querySelector("ul");
    if (!listElement) return;
    const elements = Array.from(listElement.children) as HTMLElement[];
    const elementsToToggle = elements.slice(5);
    const isExpanded = elementsToToggle[0] && !elementsToToggle[0].classList.contains("hidden");
    elementsToToggle.forEach((element) => {
      if (isExpanded) {
        element.classList.add("hidden");
      } else {
        element.classList.remove("hidden");
      }
    });

    // Scroll to sentinel when collapsing
    if (isExpanded && sentinelRef.current) {
      sentinelRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  return (
    <div className="md:hidden sticky top-0 z-10 bg-soft-black border-b border-zinc-700 -mx-4 px-4 py-2">
      <div className="flex flex-wrap gap-2 items-center">
        {groups.map(([language, repos, color]) => {
          const isActive = language === selectedLanguage;
          return (
            <button
              key={language}
              onClick={() => onLanguageChange(language)}
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
        {selectedRepos.length > 5 && (
          <ToggleButton
            key={selectedLanguage}
            onToggle={handleToggle}
            activeLabel="Show less"
            inactiveLabel="Show more"
            className="text-pale-blue hover:text-pale-yellow text-sm font-sans ml-auto"
          />
        )}
      </div>
    </div>
  );
}

type DesktopSidebarProps = {
  groups: LanguageGroup[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
};

function DesktopSidebar({
  groups,
  selectedLanguage,
  onLanguageChange,
}: DesktopSidebarProps) {
  return (
    <aside className="hidden md:block w-64 flex-shrink-0 sticky top-0 h-full overflow-y-auto pr-4">
      <nav className="space-y-2 py-2">
        {groups.map(([language, repos, color]) => {
          const isActive = language === selectedLanguage;
          return (
            <button
              key={language}
              onClick={() => onLanguageChange(language)}
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
  );
}

type ContentPanelProps = {
  contentRef: React.RefObject<HTMLElement | null>;
  mobileContentRef: React.RefObject<HTMLDivElement | null>;
  desktopContentRef: React.RefObject<HTMLDivElement | null>;
  selectedLanguage: string | null;
  selectedRepos: EnrichedContribution[];
  selectedColor: string | null;
  headerRef: React.RefObject<HTMLDivElement | null>;
};

function ContentPanel({
  contentRef,
  mobileContentRef,
  desktopContentRef,
  selectedLanguage,
  selectedRepos,
  selectedColor,
  headerRef,
}: ContentPanelProps) {
  const hasContent = selectedLanguage && selectedRepos.length > 0;

  const reposList = (
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
  );

  return (
    <>
      {/* Mobile Content */}
      <section className="md:hidden flex-1 min-w-0">
        {hasContent && (
          <ShowMore
            key={selectedLanguage}
            initial={5}
            total={selectedRepos.length}
            containerRef={mobileContentRef}
          >
            {reposList}
          </ShowMore>
        )}
      </section>

      {/* Desktop Content */}
      <section ref={contentRef} className="hidden md:block flex-1 min-w-0">
        {hasContent && (
          <ShowMore
            key={selectedLanguage}
            initial={5}
            total={selectedRepos.length}
            header={
              <h3 className="flex items-center gap-2 text-xl text-pale-yellow font-sans">
                {selectedColor && (
                  <IndicatorBar
                    color={selectedColor}
                    aria-hidden="true"
                    className="w-4 h-4"
                  />
                )}
                {selectedLanguage}
              </h3>
            }
            headerRef={headerRef}
            containerRef={desktopContentRef}
            stickyHeader
          >
            {reposList}
          </ShowMore>
        )}
      </section>
    </>
  );
}
