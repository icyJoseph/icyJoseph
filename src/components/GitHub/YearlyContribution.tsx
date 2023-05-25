"use client";

import {
  useState,
  useMemo,
  useDeferredValue,
  type ChangeEventHandler,
  useId,
} from "react";

import classNames from "classnames";

import { ContributionShowcase } from "components/GitHub/ContributionShowcase";
import { Select } from "components/Select";
import { ICY_JOSEPH } from "github/constants";
import { useGitHubContributions } from "hooks/useGitHub";

type YearlyContributionProps = {
  initial: IcyJoseph.GitHub["contributionsCollection"];
  currentYear: number;
};

type Contribution = {
  repository: IcyJoseph.Repository;
  contributions: {
    totalCount: number;
  };
}[];

const contributionWithId = (contributions: Contribution | undefined) => {
  if (!contributions) return [];

  return contributions.map(({ repository, contributions }, index) => ({
    id: repository.id,
    index,
    repository,
    contributions,
  }));
};

const joinedGitHubContribution = {
  id: "github-contribution",
  index: -1,
  repository: {
    id: "github-contribution",
    name: "Joined GitHub",
    url: "https://github.com/icyJoseph",
    homepageUrl: "https://icyjoseph.dev/",
    languages: {
      edges: [],
      totalCount: 0,
      totalSize: 0,
    },
    description: `
    @icyJoseph joins GitHub 🎉
    `,
    owner: {
      login: "icyJoseph",
    },
    isArchived: false,
    isDisabled: false,
    isFork: false,
    isPrivate: false,
    diskUsage: 0,
  },
  contributions: {
    totalCount: 0,
  },
};

const ContributionShowcaseByYear = ({
  selectedYear,
  currentYear,
  initial,
}: YearlyContributionProps & { selectedYear: number }) => {
  const fallback = useMemo(
    () => ({
      [`contributions/${currentYear}`]: initial,
    }),
    [currentYear, initial]
  );

  const externalSwitch = useId();
  const [onlyExternal, setOnlyExternal] = useState(false);

  const { data } = useGitHubContributions(selectedYear, fallback);

  const commitContributionsByRepository = data?.commitContributionsByRepository;

  const joinedGitHub = Boolean(data?.joinedGitHubContribution);

  const hasExternalContributions = Boolean(
    commitContributionsByRepository?.some((contrib) => {
      return contrib.repository.owner.login !== ICY_JOSEPH;
    })
  );

  const commitContributionsByRepositoryWithId = useMemo(() => {
    if (joinedGitHub) return [joinedGitHubContribution];

    const repositoryContributionsWithId = contributionWithId(
      commitContributionsByRepository
    );

    if (onlyExternal) {
      return repositoryContributionsWithId.filter((contrib) => {
        return contrib.repository.owner.login !== ICY_JOSEPH;
      });
    }

    return repositoryContributionsWithId;
  }, [joinedGitHub, commitContributionsByRepository, onlyExternal]);

  return (
    <>
      <div className="my-4">
        <label
          htmlFor={externalSwitch}
          className={classNames(
            "hidden",
            "transition-opacity",
            hasExternalContributions ? "opacity-100" : "opacity-50"
          )}
        >
          Only external
        </label>

        <input
          id={externalSwitch}
          type="checkbox"
          className="mx-2 hidden"
          disabled={!hasExternalContributions}
          checked={onlyExternal}
          onChange={(event) => setOnlyExternal(event.target.checked)}
        />
      </div>

      <ContributionShowcase
        year={selectedYear}
        commitContributionsByRepository={commitContributionsByRepositoryWithId}
      />
    </>
  );
};

export const YearlyContribution = ({
  currentYear,
  initial,
}: YearlyContributionProps) => {
  const [selectedYear, setSelectedYear] = useState(
    initial.contributionYears[0]
  );

  const handleSelectYear: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const deferredYear = useDeferredValue(selectedYear);

  const isPending = selectedYear !== deferredYear;

  return (
    <div
      className={classNames(
        "w-full transition-opacity",
        isPending ? "opacity-50" : "opacity-100"
      )}
    >
      <div className={classNames("mt-8", "text-2xl")}>
        <Select
          label={
            <span className="text-2xl" aria-hidden="true">
              Repositories in
            </span>
          }
          className="bg-soft-black underline font-[monospace]"
          value={selectedYear}
          onChange={handleSelectYear}
          aria-label={`Navigate through repository contributions by year. Showing ${selectedYear}`}
        >
          {initial.contributionYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </div>

      <ContributionShowcaseByYear
        currentYear={currentYear}
        selectedYear={deferredYear}
        initial={initial}
      />
    </div>
  );
};

export default YearlyContribution;
