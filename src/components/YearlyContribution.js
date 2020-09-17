import { useEffect, useState } from "react";
import styled from "styled-components";

import { Box } from "components/Box";
import { Button } from "components/Button";
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

const RepositoriesGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 2;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-template-rows: auto;
    grid-gap: 8px 8px;
  }
`;

const LanguageName = styled(Text)`
  display: block;
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
        <span>
          {pointer + windowSize} / {commitContributionsByRepository.length}
        </span>
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
      <RepositoriesGrid m={2}>
        {commitContributionsByRepository
          .slice(pointer, pointer + windowSize)
          .map(({ contributions, repository }) => (
            <Box key={repository.id} p={2}>
              <Flex flexDirection="column">
                <Text>{repository.name}</Text>
                <Text>Owner: {repository.owner.login}</Text>
                <Text>Contributions: {contributions.totalCount}</Text>
                <Text>Size: {repository.languages.totalSize} bytes</Text>
                {repository?.languages?.edges.map(
                  ({ node: { color, name }, size }) => (
                    <React.Fragment key={name}>
                      <LanguageName>
                        {name}: {size} bytes
                      </LanguageName>
                      <Indicator
                        color={color}
                        percentage={
                          (100 * size) / repository.languages.totalSize
                        }
                      />
                    </React.Fragment>
                  )
                )}
              </Flex>
            </Box>
          ))}
      </RepositoriesGrid>
    </>
  );
};
