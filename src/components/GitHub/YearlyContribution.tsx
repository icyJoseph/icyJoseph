import { ContributionShowcase } from "components/GitHub/ContributionShowcase";
import {
  ICY_JOSEPH,
  joinedGitHubContribution,
  loadingContributions,
  zeroContributions,
} from "lib/github/constants";
import { gitHubContributions } from "lib/github/fetcher";
import { YearSelect, YearSelectLabel } from "components/GitHub/YearSelect";
import classNames from "classnames";
import { Suspense } from "react";
import { OuterSuspense } from "components/GitHub/Suspend";
import { cacheLife } from "next/cache";
import { Fieldset } from "components/Fieldset";

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

  const joinedGitHub = Boolean(yearData?.joinedGitHubContribution);

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
  currentYear: Promise<string | string[] | undefined>;
}) {
  return (
    <div className={classNames("mt-8", "text-2xl")}>
      <Fieldset>
        <Suspense fallback={YearSelectLabel}>
          <YearSelect contributionYears={contributionYears} />
        </Suspense>
      </Fieldset>

      <OuterSuspense
        fallback={
          <ContributionShowcase
            owned={[loadingContributions]}
            year={contributionYears[0]}
          />
        }
      >
        <YearlyShowcase
          currentYear={currentYear}
          contributionYears={contributionYears}
        />
      </OuterSuspense>
    </div>
  );
}
