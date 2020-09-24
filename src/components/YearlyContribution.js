import { useEffect, useState } from "react";
import styled from "styled-components";
import { space } from "@styled-system/space";

import { motion, AnimatePresence, useAnimation } from "framer-motion";

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
import { createClamp } from "helpers";

const windowSize = 3;
const clamp = createClamp(0, windowSize);

const ContributionsSummary = styled(Flex)`
  grid-column: span 2;
  opacity: ${({ stale = false }) => (stale ? 0.5 : 1)};
  transition: opacity 0.5s ease-in-out;
`;

const RepoProgress = styled(Box)`
  grid-column: span 2;
  text-align: center;
`;

const RepositoriesGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  grid-column: span 2;
  grid-template-columns: repeat(auto-fit, 1fr);
  grid-template-rows: auto;
  min-height: 500px;

  @media (min-width: 768px) {
    flex-direction: row;
    min-height: 375px;
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
`;

const Options = styled.div`
  display: flex;
  grid-column: span 3;
`;

const StyledCard = styled(Card)`
  ${space({ mx: "auto" })};
  width: 100%;

  @media (min-width: 768px) {
    width: unset;
    min-width: 256px;
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

  const [pointer, setPointer] = useState(0);

  useEffect(() => {
    setPointer(0);
  }, [year]);

  const prev = useLastNonNullableValue(data);

  const stale = !error && !data;
  const loading = !error && !prev;

  if (loading) return <div>Loading</div>;

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

  const controls = useAnimation();
  const [exit, setExit] = useState(null);

  useEffect(() => {
    controls.start({
      display: "inline-flex",
      opacity: 1
    });
  }, [exit]);

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
        {joinedGitHubContribution && (
          <Box m={2}>
            <Text>Joined GitHub</Text>
            <Emoji symbol="🎉" title="Joined Github" ariaLabel="Tada" />
          </Box>
        )}
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
      <Options>
        <Button
          text={`Prev ${windowSize} repos`}
          onClick={() => {
            setPointer((x) => clamp(x - windowSize));
          }}
          disabled={pointer === 0}
          my={2}
          mx="auto"
        />
        <Button
          text={`Next ${clamp(
            commitContributionsByRepository.length - (pointer + windowSize)
          )} repos`}
          onClick={() => {
            setPointer((x) => x + windowSize);
          }}
          disabled={
            pointer + windowSize >= commitContributionsByRepository.length
          }
          my={2}
          mx="auto"
        />
      </Options>
      <RepoProgress>
        <span>
          {pointer + windowSize} / {commitContributionsByRepository.length}
        </span>
      </RepoProgress>
      <RepositoriesGrid m={2}>
        <AnimatePresence
          onExitComplete={() => {
            console.log("exit complete");
            setExit(() => Date.now());
          }}
        >
          {commitContributionsByRepository
            .slice(pointer, pointer + windowSize)
            .map(({ contributions, repository }) => (
              <motion.div
                key={`${repository.id}-${year}`}
                initial={{
                  display: "none",
                  opacity: 0,
                  flex: 1,
                  padding: 8
                }}
                animate={controls}
                transition={{ duration: 1 }}
                exit={{
                  opacity: 0
                }}
              >
                <StyledCard key={repository.id} p={2}>
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
                    {repository?.languages?.edges.map(
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
              </motion.div>
            ))}
        </AnimatePresence>
      </RepositoriesGrid>
    </>
  );
};
