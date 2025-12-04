import { Suspense, ViewTransition } from "react";

import classNames from "classnames";
import { cacheLife } from "next/cache";

import { ContributionShowcase } from "components/GitHub/ContributionShowcase";
import { YearSelect, YearSelectLabel } from "components/GitHub/YearSelect";
import {
  ICY_JOSEPH,
  joinedGitHubContribution,
  zeroContributions,
} from "lib/github/constants";
import { gitHubContributions } from "lib/github/fetcher";

export type Contribution = {
  repository: Pick<
    IcyJoseph.Repository,
    | "id"
    | "name"
    | "description"
    | "languages"
    | "homepageUrl"
    | "url"
    | "owner"
  >;
  contributions: {
    totalCount: number;
  };
};

function groupBySource(
  commitContributionsByRepository: Contribution[],
  joinedGitHub: boolean
) {
  const external: Contribution[] = [];
  if (joinedGitHub) return { external, owned: [joinedGitHubContribution] };

  if (
    !commitContributionsByRepository ||
    commitContributionsByRepository.length === 0
  )
    return { external, owned: [zeroContributions] };

  const owned: Contribution[] = [];

  commitContributionsByRepository.forEach((item) => {
    const target =
      item.repository.owner.login === ICY_JOSEPH ? owned : external;

    target.push({
      contributions: item.contributions,
      repository: {
        id: item.repository.id,
        name: item.repository.name,
        description: item.repository.description,
        languages: item.repository.languages,
        homepageUrl: item.repository.homepageUrl,
        url: item.repository.url,
        owner: item.repository.owner,
      },
    });
  });

  return {
    external,
    owned,
  };
}

const buildCommitContributionsByRepositoryWithId = async (year: number) => {
  "use cache: remote";
  const yearData = await gitHubContributions(year);

  if (yearData.contributionYears[0] === year) {
    cacheLife("days");
  } else {
    cacheLife("max");
  }

  const commitContributionsByRepository =
    yearData?.commitContributionsByRepository ?? [];

  return groupBySource(
    commitContributionsByRepository,
    Boolean(yearData?.joinedGitHubContribution)
  );
};

async function YearlyShowcase({
  currentYear,
  contributionYears,
}: {
  currentYear: Promise<string | string[] | undefined>;
  contributionYears: number[];
}) {
  let yearInput = await currentYear;

  let year = Number(yearInput);

  if (Number.isNaN(year)) {
    year = contributionYears[0];
  }

  let yearData: {
    external: Contribution[];
    owned: Contribution[];
  } = { external: [], owned: [zeroContributions] };

  if (contributionYears.indexOf(year) !== -1) {
    yearData = await buildCommitContributionsByRepositoryWithId(year);
  }

  return (
    <ContributionShowcase
      external={yearData.external}
      owned={yearData.owned}
      year={year}
    />
  );
}

export async function YearlyContribution({
  currentYear,
  contributionYears,
}: {
  contributionYears: number[];
  fallbackData: Contribution[];
  currentYear: Promise<string | string[] | undefined>;
}) {
  return (
    <div className={classNames("mt-8", "text-2xl")}>
      <Suspense
        fallback={
          <>
            {YearSelectLabel}

            <YearlyShowcase
              currentYear={Promise.resolve(`${contributionYears[0]}`)}
              contributionYears={contributionYears}
            />
          </>
        }
      >
        <YearSelect contributionYears={contributionYears} />

        <ViewTransition>
          <YearlyShowcase
            currentYear={currentYear}
            contributionYears={contributionYears}
          />
        </ViewTransition>
      </Suspense>
    </div>
  );
}
