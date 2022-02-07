import { useEffect, useState, Fragment } from "react";

import { ContributionEntry } from "components/GitHub/ContributionEntry";
import { ContributionsSummary } from "components/GitHub/ContributionsSummary";

import { Box } from "design-system/Box";
import { Button } from "design-system/Button";
import { Divider } from "design-system/Divider";
import { Emoji } from "design-system/Emoji";
import { Flex } from "design-system/Flex";
import { Text } from "design-system/Text";

import { circular, circularSlice } from "functional";

import { useGitHubContributions } from "hooks/useGitHub";
import { useLastNonNullableValue } from "hooks/useLastNonNullableValue";

type YearlyContributionProps = {
  initial: IcyJoseph.ContributionCollection | null;
  year: number;
  from: string;
  to?: string;
};

export const YearlyContribution = ({
  initial,
  year,
  from,
  to
}: YearlyContributionProps) => {
  const { data, error } = useGitHubContributions(from, to, initial);

  const [pointer, setPointer] = useState(0);

  const prev = useLastNonNullableValue(initial || data);

  const stale = !error && !data;

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
    commitContributionsByRepository
  } = data ?? prev;

  const contributionCardsLength = commitContributionsByRepository.length;

  const windowSize = Math.min(3, contributionCardsLength);

  const disabledPrev = windowSize === contributionCardsLength;
  const disabledNext = windowSize === contributionCardsLength;

  return (
    <>
      <Flex flexDirection="column" alignItems="center" my={4} px={4}>
        <Text as="h4" $fontSize="2.5rem">
          In {year}
        </Text>

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
      </Flex>

      <Box mt={3} $width="100%">
        {circularSlice(
          commitContributionsByRepository,
          pointer,
          pointer + windowSize
        ).map(({ contributions, repository }, index) => (
          <Fragment key={repository.id}>
            <ContributionEntry
              index={(pointer + index) % contributionCardsLength}
              repository={repository}
              contributions={contributions}
            />

            <Divider />
          </Fragment>
        ))}
      </Box>

      <Box mt={3} $width="100%" $display="flex">
        <Button
          type="button"
          onClick={() => {
            if (disabledPrev) return;

            setPointer((index) =>
              circular(
                index,
                -windowSize,
                commitContributionsByRepository.length
              )
            );
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

            setPointer((index) =>
              circular(
                index,
                windowSize,
                commitContributionsByRepository.length
              )
            );
          }}
          disabled={disabledNext}
          my={2}
          mx="auto"
        >
          Next
        </Button>
      </Box>
    </>
  );
};
