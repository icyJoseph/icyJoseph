import { Fragment, memo, useId, useMemo } from "react";

import { ContributionEntry } from "components/GitHub/ContributionEntry";
import { ContributionsSummary } from "components/GitHub/ContributionsSummary";
import { Showcase } from "components/Showcase";
import chevron from "design-system/chevron.module.css";
import { Emoji } from "design-system/Emoji";
import { Flex } from "design-system/Flex";
import { Stale } from "design-system/Stale";
import { Text } from "design-system/Text";
import { useGitHubContributions } from "hooks/useGitHub";
import { useLastNonNullableValue } from "hooks/useLastNonNullableValue";

type YearlyContributionProps = {
  fallback: IcyJoseph.ContributionCollection | null;
  year: number;
  from: string;
  to?: string;
};

const BackIcon = <i className={chevron.chevronLeft} aria-hidden="true" />;
const FwdIcon = <i className={chevron.chevronRight} aria-hidden="true" />;
const MemoContributionEntry = memo(ContributionEntry);

export const YearlyContribution = ({
  fallback,
  year,
  from,
  to,
}: YearlyContributionProps) => {
  const { data, error } = useGitHubContributions({
    from,
    to,
  });

  const prev = useLastNonNullableValue(data, fallback);

  const stale = prev !== fallback && !error && !data;

  const commitContributionsByRepository = (data || prev)
    ?.commitContributionsByRepository;

  const commitContributionsByRepositoryWithId = useMemo(() => {
    if (!commitContributionsByRepository) return [];

    return commitContributionsByRepository.map(
      ({ repository, contributions }, index) => ({
        id: repository.id,
        index,
        repository,
        contributions,
      })
    );
  }, [commitContributionsByRepository]);

  const headingId = useId();

  if (!prev) return null;

  const {
    joinedGitHubContribution,
    totalRepositoryContributions,
    totalCommitContributions,
    restrictedContributionsCount,
  } = data || prev;

  return (
    <Fragment>
      <div className="flex flex-col items-center my-8 px-5">
        <Text as="h3" $fontSize="1.6rem">
          In {year}
        </Text>

        <Stale $stale={stale}>
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
          )}
        </Stale>
      </div>

      {(commitContributionsByRepository ?? []).length > 0 && (
        <Stale my={5} $stale={stale} as="section" aria-labelledby={headingId}>
          <Text
            id={headingId}
            as="h3"
            $fontSize="1.6rem"
            className="mb-10 text-center"
          >
            Repositories in {year}
          </Text>

          <Showcase
            labelledBy={headingId}
            Component={MemoContributionEntry}
            items={commitContributionsByRepositoryWithId}
            backIcon={BackIcon}
            forwardIcon={FwdIcon}
          />
        </Stale>
      )}
    </Fragment>
  );
};

export default YearlyContribution;
