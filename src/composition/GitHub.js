import { useEffect, useState } from "react";
import styled from "styled-components";
import { space } from "@styled-system/space";

import { Button } from "components/Button";
import { Card, InfoCard } from "components/Card";
import { Flex } from "components/Flex";
import { Section } from "components/Section";
import { Text } from "components/Text";
import { YearlyContribution } from "components/YearlyContribution";
import { useGitHub } from "hooks/useGitHub";

import { GET_USER } from "queries";
import { yearStart, yearEnd } from "helpers";

const GitHubImg = styled.img`
  ${space({ m: "0 auto" })};
  display: block;
  border: 1px solid var(--smokeyWhite);
  border-radius: 50%;
  max-width: 192px;
  min-width: 96px;
  width: 66.66%;
`;

const GitHubGrid = styled.div`
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

const Profile = styled(Flex)`
  grid-column: span 2;
  justify-content: center;
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
  const [last = 2020] = contributionYears;
  const [selectedYear, setSelectedYear] = useState(last);

  const [showContributions, setShowContributions] = useState(false);

  useEffect(() => {
    setShowContributions(true);
  }, []);

  return (
    <Section my={3} px={2}>
      <header id="github">
        <Text as="h2" color="--blue" fontSize="3rem">
          <a href="#github">
            <code>GitHub</code>
          </a>
        </Text>
      </header>
      <GitHubGrid as="main">
        <Profile>
          <InfoCard m={3}>
            <Card.Header>
              <h3>{login}</h3>
              <Text color="--smokeyWhite" my={2} fontWeight={300}>
                {location}
              </Text>
              <GitHubImg
                src={avatarUrl}
                alt={`${name} github profile picture`}
                m={3}
              />
              <Text
                as="h2"
                color="--yellow"
                textAlign="center"
                mt={2}
                fontWeight={500}
              >
                {name}
              </Text>
            </Card.Header>
            <Card.Section>
              <Flex flexDirection="column" py={3} px={2}>
                <Text color="--yellow" mb={2}>
                  {company}
                </Text>

                <Text color="--smokeyWhite" mb={2} fontWeight={300}>
                  {bio}
                </Text>
              </Flex>
            </Card.Section>
          </InfoCard>
        </Profile>

        <Contributions justifyContent="center" my={3}>
          {contributionYears
            .slice(0)
            .sort((a, b) => a - b)
            .map((year) => (
              <Button
                key={year}
                variant={year !== selectedYear ? "outlined" : null}
                text={year}
                m={2}
                onClick={() => setSelectedYear(year)}
              />
            ))}
        </Contributions>

        {showContributions && (
          <YearlyContribution
            year={selectedYear}
            initial={selectedYear === last ? contributionsCollection : null}
            {...(last === selectedYear
              ? yearStart(selectedYear)
              : yearEnd(selectedYear))}
          />
        )}
      </GitHubGrid>
    </Section>
  );
};
