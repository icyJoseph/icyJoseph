import { useState, useMemo, memo } from "react";

import { ContributionEntry } from "components/GitHub/ContributionEntry";
import { Showcase } from "components/Showcase";
import { ToggleSwitch } from "components/ToggleSwitch";
import chevron from "design-system/chevron.module.css";
import { useGitHubContributions } from "hooks/useGitHub";
import { ICY_JOSEPH } from "lib/github/constants";

const BackIcon = <i className={chevron.chevronLeft} aria-hidden="true" />;
const FwdIcon = <i className={chevron.chevronRight} aria-hidden="true" />;
const MemoContributionEntry = memo(ContributionEntry);

type ContributionShowcaseProps = {
  initial: IcyJoseph.GitHub["contributionsCollection"];
  currentYear: number;
  selectedYear: number;
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

export const ContributionShowcase = ({
  selectedYear,
  currentYear,
  initial,
}: ContributionShowcaseProps) => {
  const fallback = useMemo(
    () => ({
      [`contributions/${currentYear}`]: initial,
    }),
    [currentYear, initial]
  );

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
        <ToggleSwitch
          label="Sort external first"
          checked={hasExternalContributions && externalFirst}
          disabled={!hasExternalContributions}
          onChange={(event) => setExternalFirst(event.target.checked)}
        />
      </div>

      <Showcase
        key={
          externalFirst
            ? `${selectedYear}-external-first`
            : `${selectedYear}-normal`
        } // reset carousel when year changes or sorting
        ariaLabel={`Repository contributions in ${selectedYear}`}
        Component={MemoContributionEntry}
        items={commitContributionsByRepositoryWithId}
        backIcon={BackIcon}
        forwardIcon={FwdIcon}
      />
    </>
  );
};
