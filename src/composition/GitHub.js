import { useEffect, useState } from "react";
import styled from "styled-components";
import { space } from "@styled-system/space";

import { Button } from "design-system/Button";
import { Card, InfoCard } from "design-system/Card";
import { Flex } from "design-system/Flex";
import { Section, SectionHeader } from "design-system/Section";
import { Text } from "design-system/Text";
import { YearlyContribution } from "components/YearlyContribution";
import { useGitHub } from "hooks/useGitHub";

import { GET_USER } from "queries";
import { yearStart, yearEnd } from "helpers";
import { BackToTop } from "design-system/BackToTop";

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

const Bio = styled(Flex)`
  overflow: hidden;
`;

const RenderWithSelectedYear = ({ last, children }) => {
  const [selectedYear, setSelectedYear] = useState(last);

  return children({ selectedYear, setSelectedYear });
};

export const GitHub = ({ initial, name: pageName }) => {
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

  const [showContributions, setShowContributions] = useState(false);

  useEffect(() => {
    setShowContributions(true);
  }, []);

  return (
    <Section>
      <SectionHeader id={pageName}>
        <Text as="h2" $textColor="--blue" $fontSize="3rem">
          <a href={`#${pageName}`}>
            <code>GitHub</code>
          </a>
        </Text>
      </SectionHeader>
      <GitHubGrid>
        <Profile>
          <InfoCard m={3}>
            <Card.Header>
              <h3>{login}</h3>
              <Text $textColor="--smokeyWhite" my={2} $fontWeight={300}>
                {location}
              </Text>
              <GitHubImg
                src={avatarUrl}
                alt={`${name} github profile picture`}
                m={3}
              />
              <Text
                as="h2"
                $textColor="--yellow"
                $textAlign="center"
                mt={2}
                $fontWeight={500}
              >
                {name}
              </Text>
            </Card.Header>
            <Card.Section>
              <Bio flexDirection="column" py={3} px={2}>
                <Text $textColor="--yellow" mb={2}>
                  {company}
                </Text>

                <Text $textColor="--smokeyWhite" mb={2} $fontWeight={300}>
                  {bio}
                </Text>
              </Bio>
            </Card.Section>
          </InfoCard>
        </Profile>

        <RenderWithSelectedYear last={last}>
          {({ selectedYear, setSelectedYear }) => (
            <>
              <Contributions justifyContent="center" my={3}>
                {contributionYears
                  .slice(0)
                  .sort((a, b) => a - b)
                  .map((year) => (
                    <Button
                      key={year}
                      variant={year !== selectedYear ? "outlined" : "primary"}
                      m={2}
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </Button>
                  ))}
              </Contributions>

              {showContributions && (
                <YearlyContribution
                  year={selectedYear}
                  initial={
                    selectedYear === last ? contributionsCollection : null
                  }
                  {...(last === selectedYear
                    ? yearStart(selectedYear)
                    : yearEnd(selectedYear))}
                />
              )}
            </>
          )}
        </RenderWithSelectedYear>
      </GitHubGrid>
      <BackToTop />
    </Section>
  );
};
