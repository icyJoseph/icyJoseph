import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { Box } from "components/Box";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { DevIcon } from "components/DevIcon";
import { Emoji } from "components/Emoji";
import { Flex } from "components/Flex";
import { Text } from "components/Text";

import { useGitHub } from "hooks/useGitHub";
import { useLastNonNullableValue } from "hooks/useLastNonNullableValue";

import { GET_YEAR_CONTRIBUTIONS } from "queries";
import { clamp } from "helpers";

const cardWidth = 250;

const staleMixin = css`
  opacity: ${({ stale = false }) => (stale ? 0.5 : 1)};
  transition: opacity 0.5s ease-in-out;
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

const Indicator = styled.div`
  height: 8px;
  width: ${({ percentage }) => `${percentage}%`};
  background: ${({ color }) => color};
  border-radius: 6px;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const Options = styled.div`
  display: flex;
  grid-column: span 3;
`;

const OptionButton = styled(Button)`
  &[disabled] {
    visibility: hidden;
  }
`;

const StyledCard = styled(Card)`
  width: 200px;

  @media (min-width: 320px) {
    width: ${cardWidth}px;
  }

  > section {
    flex-direction: column;
  }
`;

export const YearlyContribution = ({ initial, year, from, to }) => {
  const { data, error } = useGitHub({
    query: GET_YEAR_CONTRIBUTIONS,
    variables: {
      login: "icyJoseph",
      from,
      to
    },
    initialData: initial,
    selector: ({ user: { contributionsCollection } }) => contributionsCollection
  });

  const [windowSize, setWindowSize] = useState(1);

  const [pointer, setPointer] = useState(0);

  useEffect(() => {
    setPointer(0);
  }, [year]);

  const prev = useLastNonNullableValue(data);

  const stale = !error && !data;

  const {
    joinedGitHubContribution,
    totalRepositoryContributions,
    totalCommitContributions,
    restrictedContributionsCount,
    commitContributionsByRepository,
    startedAt,
    endedAt
  } = data ?? prev;

  const curateEndDate =
    new Date(endedAt) > new Date() ? new Date().toISOString() : endedAt;

  const [startDay, endDay] = [
    new Date(startedAt),
    new Date(curateEndDate)
  ].map((date) =>
    new Intl.DateTimeFormat("default", { timeZone: "UTC" }).format(date)
  );

  const ref = useRef(null);

  useLayoutEffect(() => {
    const handler = () => {
      let element = ref.current;
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

  return (
    <>
      <ContributionsSummary
        flexDirection="column"
        stale={stale}
        alignItems="center"
      >
        <Text as="h4">
          Contributions from: {startDay} to: {endDay}
        </Text>
        <Box m={2}>
          <Text>
            Total Repository Contributions: {totalRepositoryContributions}
          </Text>
          <Text>Total Commit Contributions: {totalCommitContributions}</Text>
          <Text>
            Restricted Contributions Count: {restrictedContributionsCount}
          </Text>
          <Text>
            Contributed to {commitContributionsByRepository.length} repositories
          </Text>
        </Box>
      </ContributionsSummary>

      <RepositoriesWithOptions stale={stale}>
        <Options>
          <OptionButton
            text={`Prev`}
            onClick={() => {
              setPointer((x) =>
                clamp(x - windowSize, 0, commitContributionsByRepository.length)
              );
            }}
            disabled={pointer === 0}
            my={2}
            mx="auto"
          />
          <OptionButton
            text={`Next`}
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
          />
        </Options>
        <RepositoriesGrid m={2} ref={ref}>
          {commitContributionsByRepository
            .slice(pointer, pointer + windowSize)
            .map(({ contributions, repository }, index) => (
              <StyledCard key={repository.id} p={2} m={2}>
                <Card.Header>
                  <Flex justifyContent="space-between" flexWrap="nowrap">
                    <Text
                      as="h4"
                      color="--smokeyWhite"
                      fontSize="2rem"
                      fontWeight={600}
                      mb={2}
                    >
                      {repository.name}
                    </Text>
                    <Text as="span" color="--yellow">
                      #{pointer + index + 1}
                    </Text>
                  </Flex>
                  <Text color="--smokeyWhite">Owner:</Text>
                  <Text color="--smokeyWhite">{repository.owner.login}</Text>
                </Card.Header>
                <Card.Section>
                  <Text color="--smokeyWhite">
                    Contributions: {contributions.totalCount}
                  </Text>
                  <Text color="--smokeyWhite">
                    Size: {repository.languages.totalSize} bytes
                  </Text>
                </Card.Section>
                <Card.Section>
                  {!repository.isArchived &&
                    repository?.languages?.edges.map(
                      ({ node: { color, name }, size }) => (
                        <Box key={name} mt={2}>
                          <LanguageName mb={1}>
                            {name}: {size} bytes
                          </LanguageName>
                          <DevIcon
                            colored
                            language={name}
                            mb={2}
                            fontSize="1.75rem"
                          />
                          <Indicator
                            color={color}
                            percentage={
                              (100 * size) / repository.languages.totalSize
                            }
                          />
                        </Box>
                      )
                    )}
                </Card.Section>
              </StyledCard>
            ))}
        </RepositoriesGrid>
      </RepositoriesWithOptions>
      {joinedGitHubContribution && (
        <ContributionsSummary my={2} mx="auto">
          <Text fontSize="2rem">Joined GitHub</Text>
          <Emoji symbol="🎉" title="Joined Github" ariaLabel="Tada" mx={2} />
        </ContributionsSummary>
      )}
    </>
  );
};
