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
import { Value, Unit } from "design-system/Measurement";

const cardWidth = 328;

export const staleMixin = css<{ stale?: boolean }>`
  opacity: ${({ stale = false }) => (stale ? 0.5 : 1)};
  transition: opacity 1s ease-in-out;
`;

const ContributionsSummary = styled(Flex)`
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

const RepositoriesWithOptions = styled(Box)<{ stale?: boolean }>`
  ${space({ mt: 3 })};
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

type BaseContributionsSummaryProps = {
  year: number;
  stale: boolean;
  totalRepositoryContributions: number;
  totalCommitContributions: number;
  restrictedContributionsCount: number;
  totalRepositoriesContributedTo: number;
};

const BaseContributionsSummary = ({
  year,
  stale,
  totalRepositoryContributions,
  totalCommitContributions,
  restrictedContributionsCount,
  totalRepositoriesContributedTo
}: BaseContributionsSummaryProps) => (
  <ContributionsSummary
    flexDirection="column"
    stale={stale}
    alignItems="center"
    my={4}
    px={4}
  >
    <Text as="h4" $fontSize="2.5rem" $textColor="--blue">
      In {year}
    </Text>

    <Flex flexDirection="column" alignItems="center" mt={2} mx="auto">
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
    </Flex>
  </ContributionsSummary>
);

const MemoContributionsSummary = memo(BaseContributionsSummary);

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

const useContributionCollection = (
  from: string,
  to?: string,
  initial: IcyJoseph.ContributionCollection | null = null
) => {
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

  return { data, error };
};

export const YearlyContribution = ({
  initial,
  year,
  from,
  to
}: YearlyContributionProps) => {
  const { data, error } = useContributionCollection(from, to, initial);

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

  const disabledPrev = pointer === 0;
  const disabledNext =
    pointer + windowSize >= commitContributionsByRepository.length;

  return (
    <>
      <MemoContributionsSummary
        year={year}
        stale={stale}
        totalRepositoryContributions={totalRepositoryContributions}
        totalCommitContributions={totalCommitContributions}
        restrictedContributionsCount={restrictedContributionsCount}
        totalRepositoriesContributedTo={commitContributionsByRepository.length}
      />

      <RepositoriesWithOptions stale={stale}>
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

        <Options mt={2}>
          <Button
            type="button"
            onClick={() => {
              if (disabledPrev) return;

              setPointer((x) =>
                clamp(x - windowSize, 0, commitContributionsByRepository.length)
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

              setPointer((x) =>
                clamp(x + windowSize, 0, commitContributionsByRepository.length)
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

      {joinedGitHubContribution && (
        <ContributionsSummary my={2} mx="auto">
          <Text $fontSize="2rem">Joined GitHub</Text>
          <Emoji symbol="🎉" title="Joined Github" ariaLabel="Tada" mx={2} />
        </ContributionsSummary>
      )}
    </>
  );
};
