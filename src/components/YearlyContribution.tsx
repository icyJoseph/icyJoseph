import { useEffect, useState, memo } from "react";
import styled, { css } from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

import { DevIcon } from "components/DevIcon";
import { Box } from "design-system/Box";
import { Button } from "design-system/Button";
import { Emoji } from "design-system/Emoji";
import { Flex } from "design-system/Flex";
import { Text } from "design-system/Text";

import { useGitHubContributions } from "hooks/useGitHub";
import { useLastNonNullableValue } from "hooks/useLastNonNullableValue";

import { Value, Unit } from "design-system/Measurement";

export const staleMixin = css<{ stale?: boolean }>`
  opacity: ${({ stale = false }) => (stale ? 0.5 : 1)};
  transition: opacity 1s ease-in-out;
`;

const Contributions = styled(Flex)`
  ${staleMixin};
`;

const StatLabel = styled(Unit)<SpaceProps>``;

const StatValue = styled(Value)`
  display: block;
  line-height: 1;

  && {
    font-size: 3rem;
  }
`;

const StatUnit = styled(Unit)`
  && {
    text-align: end;
  }
`;

const StatText = styled(Text)``;

const Stat = styled(Flex)`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    flex: 1;
  }

  & ${StatLabel}, & ${StatText}, & ${StatValue}, & ${StatUnit} {
    text-align: center;
  }

  @media (min-width: 514px) {
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;

    & ${StatLabel} {
      text-align: start;
    }

    & ${StatText}, & ${StatValue}, & ${StatUnit} {
      text-align: end;
    }
  }
`;

type BaseContributionsSummaryProps = {
  stale: boolean;
  totalRepositoryContributions: number;
  totalCommitContributions: number;
  restrictedContributionsCount: number;
  totalRepositoriesContributedTo: number;
};

const GitHubContributionsSummary = memo(function ContributionsSummary({
  stale,
  totalRepositoryContributions,
  totalCommitContributions,
  restrictedContributionsCount,
  totalRepositoriesContributedTo
}: BaseContributionsSummaryProps) {
  return (
    <Contributions
      stale={stale}
      flexDirection="column"
      alignItems="center"
      mt={3}
      mx="auto"
    >
      {[
        {
          value: totalRepositoryContributions,
          label: "Newly created repositories",
          unit: "repos"
        },
        {
          value: totalRepositoriesContributedTo,
          label: "Repositories contributed to",
          unit: "repos"
        },
        {
          value: restrictedContributionsCount,
          label: "Private contributions",
          unit: "commits"
        },
        {
          value: totalCommitContributions,
          label: "Total contributions",
          unit: "commits"
        }
      ].map(({ value, label, unit }) => (
        <Stat key={label} mb={3}>
          <StatLabel unit={label} />

          <StatText as="span">
            <StatValue value={value} /> <StatUnit unit={unit} />
          </StatText>
        </Stat>
      ))}
    </Contributions>
  );
});

const RepositoriesWithOptions = styled(Box)<{ stale?: boolean }>`
  ${space({ mt: 3 })};
  grid-column: span 2;
  scroll-behavior: smooth;
  ${staleMixin};
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const Indicator = styled.div<{ percentage: number }>`
  height: 8px;
  width: ${({ percentage }) => `${percentage}%`};
  background: ${({ color }) => color};
  border-radius: 6px;
`;

const Options = styled.div<SpaceProps>`
  ${space};
  display: flex;
  grid-column: span 3;
`;

const RepoEntry = styled(Flex)`
  max-width: 80%;
  min-height: 220px;

  > * {
    flex: 1;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const RepoFooter = styled(Flex)`
  & ${Box} {
    ${space({ pb: 3 })}
    width: 100%;
  }

  @media (min-width: 768px) {
    & ${Box} {
      ${space({ pb: 0, pr: 3 })};
      width: 33.33%;
    }
  }

  & ${Box}:last-child {
    ${space({ pr: 0 })};
  }
`;

const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;

type ContributionCardProps = {
  repository: IcyJoseph.Repository;
  index: number;
  contributions: { totalCount: number };
};

const ContributionCard = ({
  repository,

  index,
  contributions
}: ContributionCardProps) => (
  <RepoEntry py={2} mx="auto" as="article" flexDirection="column" gap="1.5rem">
    <Flex as="header" alignItems="center" justifyContent="space-between">
      <Box mr={3}>
        <Text as="span" $textColor="--yellow">
          #{index + 1}
        </Text>{" "}
        <Text as="span">{repository.owner.login}</Text>
        <Text as="h4" $fontWeight={300} $fontSize="2rem" $display="inline">
          /{repository.name}
        </Text>
      </Box>

      <Text as="span" $fontWeight={300} $fontSize="2rem">
        +{contributions.totalCount}{" "}
        <Text as="span" $fontWeight={300}>
          commits
        </Text>
      </Text>
    </Flex>

    <Box>
      <Text $fontWeight={300} $fontSize="2rem">
        {repository.description
          ? repository.description.replace(RE_EMOJI, "")
          : `${repository.name} has no description.`}
      </Text>
    </Box>

    <RepoFooter as="footer" mt={3}>
      {repository.languages.edges
        .filter((edge): edge is IcyJoseph.LanguageEdge => Boolean(edge))
        .map(({ node: { color, name }, size }) => (
          <Box key={name}>
            <Text $fontWeight={300} mb={1}>
              <DevIcon color={color} language={name} mr={1} $fontSize="2rem" />

              <span>{name}</span>
            </Text>

            <Indicator
              color={color}
              percentage={(100 * size) / repository.languages.totalSize}
            />
          </Box>
        ))}
    </RepoFooter>
  </RepoEntry>
);

type YearlyContributionProps = {
  initial: IcyJoseph.ContributionCollection | null;
  year: number;
  from: string;
  to?: string;
};

function circular(index: number, step: number, limit: number) {
  return (limit + ((index + step) % limit)) % limit;
}

function circularSlice<T>(arr: T[], from: number, to: number) {
  const limit = arr.length;
  return Array.from(
    { length: to - from },
    (_, index) => arr[(from + index) % limit]
  );
}

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
          <GitHubContributionsSummary
            stale={stale}
            totalRepositoryContributions={totalRepositoryContributions}
            totalCommitContributions={totalCommitContributions}
            restrictedContributionsCount={restrictedContributionsCount}
            totalRepositoriesContributedTo={
              commitContributionsByRepository.length
            }
          />
        )}
      </Flex>

      <RepositoriesWithOptions stale={stale}>
        <div>
          {circularSlice(
            commitContributionsByRepository,
            pointer,
            pointer + windowSize
          ).map(({ contributions, repository }, index) => (
            <ContributionCard
              key={repository.id}
              index={(pointer + index) % contributionCardsLength}
              repository={repository}
              contributions={contributions}
            />
          ))}
        </div>

        <Options mt={2}>
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
        </Options>
      </RepositoriesWithOptions>
    </>
  );
};
