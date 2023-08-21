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
import { useGitHubContributions } from "hooks/useGitHub";
import { ICY_JOSEPH } from "lib/github/constants";

type YearlyContributionProps = {
  initial: IcyJoseph.GitHub["contributionsCollection"];
  currentYear: number;
};

type Contribution = {
  repository: IcyJoseph.Repository;
  contributions: {
    totalCount: number;
  };
};

const mapContributionsToShowcase = (contributions: Contribution[]) => {
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
  const [externalFirst, setExternalFirst] = useState(true);

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

    if (!commitContributionsByRepository) return [];

    if (externalFirst) {
      const external: Contribution[] = [];
      const owned: Contribution[] = [];

      commitContributionsByRepository.forEach((contrib) => {
        const target =
          contrib.repository.owner.login === ICY_JOSEPH ? owned : external;

        target.push(contrib);
      });

      return mapContributionsToShowcase([...external, ...owned]);
    }

    return mapContributionsToShowcase(commitContributionsByRepository);
  }, [joinedGitHub, commitContributionsByRepository, externalFirst]);

  return (
    <>
      <div className="my-4">
        <label
          htmlFor={externalSwitch}
          className={classNames(
            "transition-opacity",
            hasExternalContributions ? "opacity-100" : "opacity-50"
          )}
        >
          Sort external first
        </label>

        <input
          id={externalSwitch}
          type="checkbox"
          className="mx-2"
          disabled={!hasExternalContributions}
          checked={externalFirst}
          onChange={(event) => setExternalFirst(event.target.checked)}
        />
      </div>

      <ContributionShowcase
        key={externalFirst ? "external-first" : "normal"}
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
