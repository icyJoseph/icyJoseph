import { useState, useEffect } from "react";
import styled from "styled-components";

import { Button } from "components/Button";
import { Emoji } from "components/Emoji";
import { Flex } from "components/Flex";
import { Text } from "components/Text";

import { useGitHub } from "hooks/useGitHub";

import { GET_YEAR_CONTRIBUTIONS } from "queries";
import { Box } from "components/Box";

const ContributionsSummary = styled(Flex)`
  grid-column: span 2;
`;

const LanguageName = styled(Text)`
  color: ${({ color = "var(--black)" }) => color};
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

  const [windowSize, setWindowSize] = useState(10);

  useEffect(() => {
    setWindowSize(10);
  }, [year]);

  const loading = !error && !data;

  if (loading) return <div>Loading</div>;

  const {
    joinedGitHubContribution,
    totalRepositoryContributions,
    totalCommitContributions,
    restrictedContributionsCount,
    commitContributionsByRepository,
    startedAt,
    endedAt
  } = data;

  const curateEndDate =
    new Date(endedAt) > new Date() ? new Date().toISOString() : endedAt;

  const [startDay, endDay] = [
    new Date(startedAt),
    new Date(curateEndDate)
  ].map((date) =>
    new Intl.DateTimeFormat("default", { timeZone: "UTC" }).format(date)
  );

  return (
    <ContributionsSummary flexDirection="column">
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
        <Text>totalRepositoryContributions:{totalRepositoryContributions}</Text>
        <Text>totalCommitContributions:{totalCommitContributions}</Text>
        <Text>restrictedContributionsCount:{restrictedContributionsCount}</Text>
        <Text>
          Contributed to {commitContributionsByRepository.length} repositories
        </Text>
      </Box>
      <Flex m={2}>
        {commitContributionsByRepository
          .slice(0, windowSize)
          .map(({ contributions, repository }) => (
            <Flex key={repository.id} flexDirection="column" flex={1}>
              <Text>{repository.name}</Text>
              <Text>Contributions:{contributions.totalCount}</Text>
              <Text>Size: {repository.languages.totalSize} bytes</Text>
              {repository?.languages?.edges?.map(
                ({ node: { color, name }, size }) => (
                  <LanguageName key={name} color={color}>
                    {name}: {size} bytes
                  </LanguageName>
                )
              )}
            </Flex>
          ))}
      </Flex>
      <Button text="Show more" onClick={() => setWindowSize((x) => x + 10)} />
    </ContributionsSummary>
  );
};
