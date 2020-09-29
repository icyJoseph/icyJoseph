import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

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

const cardWidth = 250;

const ContributionsSummary = styled(Flex)`
  grid-column: span 2;
  opacity: ${({ stale = false }) => (stale ? 0.5 : 1)};
  transition: opacity 0.5s ease-in-out;
`;

const RepoProgress = styled(Box)`
  grid-column: span 2;
  text-align: center;
`;

const RepositoriesWithOptions = styled(Box)`
  grid-column: span 2;
`;

const RepositoriesGrid = styled(motion.div)`
  display: flex;
  flex-direction: column;

  justify-content: unset;
  align-items: center;

  flex-wrap: wrap;

  grid-column: span 2;
  grid-template-columns: repeat(auto-fit, 1fr);
  grid-template-rows: auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: unset;
  }
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
  position: sticky;
  bottom: 5px;
  z-index: 10;
`;

const OptionButton = styled(Button)`
  &[disabled] {
    visibility: hidden;
  }
`;

const StyledCard = styled(Card)`
  width: ${cardWidth}px;

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

  const [pointer, setPointer] = useState(windowSize);

  useEffect(() => {
    setPointer(windowSize);
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

  useEffect(() => {
    setPointer((prev) => {
      const coef = Math.ceil(prev / windowSize);
      return coef * windowSize;
    });
  }, [windowSize]);

  useLayoutEffect(() => {
    const handler = () => {
      let element = ref.current;
      setWindowSize(Math.floor(element.offsetWidth / cardWidth));
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
      <AnimateSharedLayout>
        {!stale && (
          <React.Fragment>
            <RepoProgress>
              {!!commitContributionsByRepository.length && (
                <span>
                  {pointer} / {commitContributionsByRepository.length}
                </span>
              )}
            </RepoProgress>
            <RepositoriesWithOptions>
              <RepositoriesGrid layout m={2} ref={ref}>
                <AnimatePresence initial={false}>
                  {commitContributionsByRepository
                    .slice(0, pointer)
                    .reverse()
                    .map(({ contributions, repository }) => (
                      <motion.div
                        key={`${repository.id}-${year}`}
                        initial={{
                          height: 0,
                          opacity: 0
                        }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20
                        }}
                        exit={{
                          height: 0,
                          opacity: 0
                        }}
                      >
                        <StyledCard p={2} m={2}>
                          <Card.Header>
                            <Text
                              as="h4"
                              color="--smokeyWhite"
                              fontSize="2rem"
                              fontWeight={600}
                              mb={2}
                            >
                              {repository.name}
                            </Text>
                            <Text color="--smokeyWhite">Owner:</Text>
                            <Text color="--smokeyWhite">
                              {repository.owner.login}
                            </Text>
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
                                        (100 * size) /
                                        repository.languages.totalSize
                                      }
                                    />
                                  </Box>
                                )
                              )}
                          </Card.Section>
                        </StyledCard>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </RepositoriesGrid>
              <Options>
                <OptionButton
                  text={`- ${windowSize} repos`}
                  onClick={() => {
                    setPointer((x) => x - windowSize);
                  }}
                  disabled={pointer === windowSize}
                  my={2}
                  mx="auto"
                />
                <OptionButton
                  text={`+ ${windowSize} repos`}
                  onClick={() => {
                    setPointer((x) => x + windowSize);
                  }}
                  disabled={
                    pointer + windowSize >=
                    commitContributionsByRepository.length
                  }
                  my={2}
                  mx="auto"
                />
              </Options>
            </RepositoriesWithOptions>
            {joinedGitHubContribution && (
              <ContributionsSummary my={2} mx="auto">
                <Text>Joined GitHub</Text>
                <Emoji
                  symbol="🎉"
                  title="Joined Github"
                  ariaLabel="Tada"
                  mx={2}
                />
              </ContributionsSummary>
            )}
          </React.Fragment>
        )}
      </AnimateSharedLayout>
    </>
  );
};
