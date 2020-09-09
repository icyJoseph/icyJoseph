import { useState } from "react";
import styled from "styled-components";

import { Button } from "components/Button";
import { Flex } from "components/Flex";
import { Section } from "components/Section";
import { Text } from "components/Text";
import { YearlyContribution } from "components/YearlyContribution";
import { useGitHub } from "hooks/useGitHub";

import { GET_USER } from "queries";
import { yearStart, yearEnd } from "helpers";

const Img = styled.img`
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  max-width: 192px;
  min-width: 96px;
  width: 66.66%;
`;

const GHGrid = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: minmax(33%, 192px) 1fr;
    grid-template-rows: auto;
  }
`;

const Contributions = styled(Flex)`
  grid-column: span 2;
`;

export const GitHub = ({ initial }) => {
  const { data } = useGitHub({
    query: GET_USER,
    variables: {
      login: "icyJoseph",
      ...yearStart()
    },
    initialData: initial,
    selector: ({ user }) => user
  });

  const {
    bio,
    name,
    company,
    location,
    login,
    avatarUrl,
    contributionsCollection
  } = data;

  const { contributionYears } = contributionsCollection;
  const [last] = contributionYears;
  const [selectedYear, setSelectedYear] = useState(last || 2020);

  return (
    <Section my={3} px={2}>
      <header>
        <Text as="h2" color="--blue" fontSize="2rem">
          GitHub
        </Text>
      </header>
      <GHGrid as="main">
        <Img src={avatarUrl} alt={`${name} github profile picture`} />
        <Flex flexDirection="column" py={3} px={2}>
          <h2>{name}</h2>

          <h3>{login}</h3>

          <Text>{company}</Text>

          <Text>{bio}</Text>

          <Text>{location}</Text>
        </Flex>
        <Contributions justifyContent="center" my={3}>
          {contributionYears
            .slice(0)
            .sort((a, b) => a - b)
            .map((year) => (
              <Button
                key={year}
                variant={year !== selectedYear ? "outlined" : null}
                text={year}
                mx={2}
                onClick={() => setSelectedYear(year)}
              />
            ))}
        </Contributions>
        <YearlyContribution
          year={selectedYear}
          initial={selectedYear === last ? contributionsCollection : null}
          {...(last === selectedYear
            ? yearStart(selectedYear)
            : yearEnd(selectedYear))}
        />
      </GHGrid>
    </Section>
  );
};
