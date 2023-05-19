"use client";

import {
  useState,
  useMemo,
  useTransition,
  type ChangeEventHandler,
  Suspense,
} from "react";

import classNames from "classnames";

import { ContributionShowcase } from "components/GitHub/ContributionShowcase";
import { Select } from "components/Select";
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
  const { data } = useGitHubContributions(selectedYear, fallback);

  const commitContributionsByRepository = data?.commitContributionsByRepository;

  const joinedGitHub = Boolean(data?.joinedGitHubContribution);

  const commitContributionsByRepositoryWithId = useMemo(
    () =>
      joinedGitHub
        ? [joinedGitHubContribution]
        : contributionWithId(commitContributionsByRepository),
    [joinedGitHub, commitContributionsByRepository]
  );

  return (
    <ContributionShowcase
      year={selectedYear}
      commitContributionsByRepository={commitContributionsByRepositoryWithId}
    />
  );
};

export const YearlyContribution = ({
  currentYear,
  initial,
}: YearlyContributionProps) => {
  const [selectedYear, setSelectedYear] = useState(
    initial.contributionYears[0]
  );

  const [isPending, startTransition] = useTransition();

  const handleSelectYear: ChangeEventHandler<HTMLSelectElement> = (event) => {
    startTransition(() => {
      setSelectedYear(Number(event.target.value));
    });
  };

  return (
    <div
      className={classNames(
        "w-full transition-opacity",
        isPending ? "opacity-50" : "opacity-100"
      )}
    >
      <div className={classNames("my-8", "text-2xl")}>
        <Select
          label={
            <span className="text-2xl" aria-hidden="true">
              Repositories in
            </span>
          }
          className="bg-transparent underline font-[monospace]"
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

      <Suspense fallback={<span>Loading...</span>}>
        <ContributionShowcaseByYear
          currentYear={currentYear}
          selectedYear={selectedYear}
          initial={initial}
        />
      </Suspense>
    </div>
  );
};

export default YearlyContribution;
