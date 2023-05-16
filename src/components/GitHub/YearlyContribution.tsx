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

  const commitContributionsByRepositoryWithId = useMemo(
    () => contributionWithId(commitContributionsByRepository),
    [commitContributionsByRepository]
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
        <span className="text-2xl" aria-hidden="true">
          Repositories in
        </span>{" "}
        <select
          className="bg-transparent underline"
          value={selectedYear}
          onChange={handleSelectYear}
          aria-label={`Navigate through repository contributions by year. Showing ${selectedYear}`}
        >
          {initial.contributionYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {/* 
        {joinedGitHubContribution ? (
          <Flex mt={3}>
            <Text $fontSize="1.25rem" $fontWeight={300}>
              Joined GitHub
              <Emoji
                symbol="🎉"
                title="Joined Github"
                ariaLabel="Celebration"
                className="mx-3"
              />
            </Text>
          </Flex>
        ) : (
          <ContributionsSummary
            totalRepositoryContributions={totalRepositoryContributions}
            totalCommitContributions={totalCommitContributions}
            restrictedContributionsCount={restrictedContributionsCount}
            totalRepositoriesContributedTo={
              commitContributionsByRepository?.length ?? 0
            }
          />
        )} */}

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
