import { Fragment, useMemo } from "react";

import { ContributionEntry } from "components/GitHub/ContributionEntry";
import { ContributionsSummary } from "components/GitHub/ContributionsSummary";
import { Showcase } from "components/Showcase";
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

  if (!prev) return null;

  const {
    joinedGitHubContribution,
    totalRepositoryContributions,
    totalCommitContributions,
    restrictedContributionsCount,
  } = data || prev;

  return (
    <Fragment>
      <Flex flexDirection="column" alignItems="center" my={4} px={4}>
        <Text as="h3" $fontSize="2.5rem">
          In {year}
        </Text>

        <Stale $stale={stale}>
          {joinedGitHubContribution ? (
            <Flex mt={3}>
              <Text $fontSize="2rem" $fontWeight={300}>
                Joined GitHub
                <Emoji
                  symbol="🎉"
                  title="Joined Github"
                  ariaLabel="Celebration"
                  mx={2}
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
      </Flex>

      {(commitContributionsByRepository ?? []).length > 0 && (
        <>
          <Stale my={5} $stale={stale}>
            <Text as="h3" $fontSize="2.5rem">
              Repositories in {year}
            </Text>

            <Showcase
              Component={ContributionEntry}
              items={commitContributionsByRepositoryWithId}
              backIcon={<span>back</span>}
              forwardIcon={<span>fwd</span>}
              ariaLabel="Navigate through repositories"
            />
          </Stale>
        </>
      )}
    </Fragment>
  );
};

export default YearlyContribution;
