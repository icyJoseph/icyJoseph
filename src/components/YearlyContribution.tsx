import { useEffect, useLayoutEffect, useRef, useState, memo } from "react";
import styled, { css } from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

import { DevIcon } from "components/DevIcon";
import { Box } from "design-system/Box";
import { Button } from "design-system/Button";
import { Card, InfoCard } from "design-system/Card";
import { Emoji } from "design-system/Emoji";
import { Flex } from "design-system/Flex";
import { Text } from "design-system/Text";

import { useGitHub } from "hooks/useGitHub";
import { useLastNonNullableValue } from "hooks/useLastNonNullableValue";

import { GET_YEAR_CONTRIBUTIONS } from "queries";
import { clamp } from "helpers";

const cardWidth = 328;

export const staleMixin = css<{ stale?: boolean }>`
  opacity: ${({ stale = false }) => (stale ? 0.5 : 1)};
  transition: opacity 1s ease-in-out;
`;

const ContributionsSummary = styled(Flex)`
  grid-column: span 2;
  ${staleMixin};
`;

const RepositoriesWithOptions = styled(Box)`
  grid-column: span 2;
  scroll-behavior: smooth;
  ${staleMixin};
`;

const RepositoriesGrid = styled.div`
  display: flex;
  justify-content: center;
`;

const LanguageName = styled(Text)`
  display: block;
  color: inherit;
`;

const Indicator = styled.div<{ percentage: number }>`
  height: 8px;
  width: ${({ percentage }) => `${percentage}%`};
  background: ${({ color }) => color};
  border-radius: 6px;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const Options = styled.div<SpaceProps>`
  ${space};
  display: flex;
  grid-column: span 3;
`;

const OptionButton = styled(Button)`
  &[disabled] {
    visibility: hidden;
  }
`;

const StyledCard = styled(InfoCard)`
  width: 80%;
  max-width: unset;
  min-height: 375px;

  @media (min-width: ${cardWidth + 10}px) {
    max-width: ${cardWidth}px;
  }

  > section {
    flex-direction: column;
  }
`;

type BaseContributionsSummaryCardProps = {
  year: number;
  stale: boolean;
  totalRepositoryContributions: number;
  totalCommitContributions: number;
  restrictedContributionsCount: number;
  totalRepositoriesContributedTo: number;
};

const BaseContributionsSummaryCard = ({
  year,
  stale,
  totalRepositoryContributions,
  totalCommitContributions,
  restrictedContributionsCount,
  totalRepositoriesContributedTo
}: BaseContributionsSummaryCardProps) => (
  <ContributionsSummary
    flexDirection="column"
    stale={stale}
    alignItems="center"
  >
    <InfoCard>
      <Card.Header>
        <h4>In {year}</h4>
      </Card.Header>
      <Card.Section>
        <Flex flexDirection="column" alignItems="center" m="0 auto">
          <Text $textColor="--smokeyWhite" mb={2}>
            <Text as="span" $textColor="--yellow">
              {totalRepositoryContributions}
            </Text>{" "}
            newly created repositories
          </Text>
          <Text $textColor="--smokeyWhite" mb={2}>
            <Text as="span" $textColor="--yellow">
              {totalCommitContributions}
            </Text>{" "}
            commit contributions
          </Text>
          <Text $textColor="--smokeyWhite" mb={2}>
            <Text as="span" $textColor="--yellow">
              {restrictedContributionsCount}
            </Text>{" "}
            super secret contributions
          </Text>
          <Text $textColor="--smokeyWhite" mb={2}>
            <Text as="span" $textColor="--yellow">
              {totalRepositoriesContributedTo}
            </Text>{" "}
            repos received commits from me
          </Text>
        </Flex>
      </Card.Section>
    </InfoCard>
  </ContributionsSummary>
);

const ContributionsSummaryCard = memo(BaseContributionsSummaryCard);

type ContributionCardProps = {
  repository: IcyJoseph.Repository;
  pointer: number;
  index: number;
  contributions: { totalCount: number };
};

const ContributionCard = ({
  repository,
  pointer,
  index,
  contributions
}: ContributionCardProps) => (
  <StyledCard p={2} m={2}>
    <Card.Header>
      <Text as="p" $textColor="--yellow" $textAlign="end">
        #{pointer + index + 1}
      </Text>
      <Text
        as="h4"
        $textColor="--smokeyWhite"
        $fontSize="2rem"
        $fontWeight={600}
        mb={2}
      >
        {repository.name}
      </Text>
      <Text $textColor="--smokeyWhite">Owner:</Text>
      <Text $textColor="--smokeyWhite">{repository.owner.login}</Text>
    </Card.Header>
    <Card.Section>
      <Text $textColor="--smokeyWhite">
        Contributions: {contributions.totalCount}
      </Text>
      <Text $textColor="--smokeyWhite">
        Size: {repository.languages.totalSize} bytes
      </Text>
    </Card.Section>
    <Card.Section>
      {!repository.isArchived &&
        repository.languages?.edges.map(({ node: { color, name }, size }) => (
          <Box key={name} mt={2}>
            <LanguageName mb={1}>
              {name}: {size} bytes
            </LanguageName>

            <DevIcon color={color} language={name} mb={2} $fontSize="1.75rem" />

            <Indicator
              color={color}
              percentage={(100 * size) / repository.languages.totalSize}
            />
          </Box>
        ))}
    </Card.Section>
  </StyledCard>
);

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
  const { data, error } = useGitHub<
    {
      login: "icyJoseph";
      from: string;
      to?: string;
    },
    IcyJoseph.ContributionCollection,
    { user: { contributionsCollection: IcyJoseph.ContributionCollection } }
  >({
    query: GET_YEAR_CONTRIBUTIONS,
    variables: {
      login: "icyJoseph",
      from,
      to
    },
    initialData: initial,
    selector: ({
      user: { contributionsCollection }
    }: {
      user: { contributionsCollection: IcyJoseph.ContributionCollection };
    }) => contributionsCollection
  });

  const [windowSize, setWindowSize] = useState(1);

  const [pointer, setPointer] = useState(0);

  const prev = useLastNonNullableValue(initial || data);

  const stale = !error && !data;

  useEffect(() => {
    if (!stale) {
      setPointer(0);
    }
  }, [year, stale]);

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handler = () => {
      const element = ref.current;
      if (!element) return;

      const nextWindowSize = clamp(
        Math.floor(element.offsetWidth / cardWidth),
        1,
        20
      );
      setWindowSize(nextWindowSize);
    };

    window.addEventListener("resize", handler);

    handler();

    return () => window.removeEventListener("resize", handler);
  }, []);

  if (!prev) return null;

  const {
    joinedGitHubContribution,
    totalRepositoryContributions,
    totalCommitContributions,
    restrictedContributionsCount,
    commitContributionsByRepository
  } = data ?? prev;

  return (
    <>
      <ContributionsSummaryCard
        year={year}
        stale={stale}
        totalRepositoryContributions={totalRepositoryContributions}
        totalCommitContributions={totalCommitContributions}
        restrictedContributionsCount={restrictedContributionsCount}
        totalRepositoriesContributedTo={commitContributionsByRepository.length}
      />

      <RepositoriesWithOptions stale={stale}>
        <Options mt={2}>
          <OptionButton
            type="button"
            onClick={() => {
              setPointer((x) =>
                clamp(x - windowSize, 0, commitContributionsByRepository.length)
              );
            }}
            disabled={pointer === 0}
            my={2}
            mx="auto"
          >
            Prev
          </OptionButton>

          <OptionButton
            type="button"
            onClick={() => {
              setPointer((x) =>
                clamp(x + windowSize, 0, commitContributionsByRepository.length)
              );
            }}
            disabled={
              pointer + windowSize >= commitContributionsByRepository.length
            }
            my={2}
            mx="auto"
          >
            Next
          </OptionButton>
        </Options>

        <RepositoriesGrid ref={ref}>
          {commitContributionsByRepository
            .slice(pointer, pointer + windowSize)
            .map(({ contributions, repository }, index) => (
              <ContributionCard
                key={repository.id}
                index={index}
                repository={repository}
                pointer={pointer}
                contributions={contributions}
              />
            ))}
        </RepositoriesGrid>
      </RepositoriesWithOptions>

      {joinedGitHubContribution && (
        <ContributionsSummary my={2} mx="auto">
          <Text $fontSize="2rem">Joined GitHub</Text>
          <Emoji symbol="🎉" title="Joined Github" ariaLabel="Tada" mx={2} />
        </ContributionsSummary>
      )}
    </>
  );
};
