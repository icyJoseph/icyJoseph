import { useEffect, useState, Fragment } from "react";

import { ContributionEntry } from "components/GitHub/ContributionEntry";
import { ContributionsSummary } from "components/GitHub/ContributionsSummary";
import { Box } from "design-system/Box";
import { Button } from "design-system/Button";
import { Divider } from "design-system/Divider";
import { Emoji } from "design-system/Emoji";
import { Flex } from "design-system/Flex";
import { Stale } from "design-system/Stale";
import { Text } from "design-system/Text";
import { circularSlice } from "functional";
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

  const [pointer, setPointer] = useState(0);

  const prev = useLastNonNullableValue(data, fallback);

  const stale = prev !== fallback && !error && !data;

  useEffect(() => {
    if (!stale) {
      setPointer(0);
    }
  }, [year, stale]);

  if (!prev) return null;

  const {
    joinedGitHubContribution,
    totalRepositoryContributions,
    totalCommitContributions,
    restrictedContributionsCount,
    commitContributionsByRepository,
  } = data || prev;

  const contributionCardsLength = commitContributionsByRepository.length;

  const windowSize = Math.min(3, contributionCardsLength);

  const disabledPrev = pointer === 0;
  const disabledNext = pointer + windowSize >= contributionCardsLength;

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
                commitContributionsByRepository.length
              }
            />
          )}
        </Stale>
      </Flex>

      {commitContributionsByRepository.length > 0 && (
        <>
          <Stale my={5} $stale={stale}>
            <Text as="h3" $fontSize="2.5rem">
              Repositories in {year}
            </Text>

            {circularSlice(
              commitContributionsByRepository,
              pointer,
              pointer + windowSize
            ).map(({ contributions, repository }, position) => {
              const index = (pointer + position) % contributionCardsLength;

              const style =
                index < pointer
                  ? ({ visibility: "hidden" } as const)
                  : undefined;

              return (
                <Fragment key={repository.id}>
                  {index !== pointer && <Divider style={style} />}

                  <ContributionEntry
                    index={index}
                    repository={repository}
                    contributions={contributions}
                    style={style}
                  />
                </Fragment>
              );
            })}
          </Stale>

          <Box mt={3} $width="100%" $display="flex">
            <Button
              type="button"
              onClick={() => {
                if (disabledPrev) return;

                setPointer((index) => Math.max(0, index - windowSize));
              }}
              disabled={disabledPrev}
              my={2}
              mx="auto"
            >
              Prev
            </Button>

            <Button
              type="button"
              onClick={() => {
                if (disabledNext) return;

                setPointer((index) => index + windowSize);
              }}
              disabled={disabledNext}
              my={2}
              mx="auto"
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Fragment>
  );
};

export default YearlyContribution;
