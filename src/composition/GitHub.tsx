import { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

import { Button } from "design-system/Button";
import { Flex } from "design-system/Flex";
import { Section, SectionHeader } from "design-system/Section";
import { Text } from "design-system/Text";
import { YearlyContribution } from "components/YearlyContribution";
import { useGitHub } from "hooks/useGitHub";

import { GET_USER } from "queries";
import { yearStart, yearEnd } from "helpers";
import { BackToTop } from "design-system/BackToTop";

const GitHubImg = styled.img<SpaceProps>`
  ${space({ m: "0 auto", p: 1 })};
  display: block;

  border: 2px solid var(--blue);
  border-radius: 50%;

  max-width: 192px;
  min-width: 96px;
  width: 66.66%;
`;

const Contributions = styled(Flex)``;

const Profile = styled.div`
  grid-column: span 2;
  justify-content: center;

  display: grid;
  grid-template-columns: 1fr;

  & ${GitHubImg} {
    justify-self: center;
    align-self: center;
  }

  @media (min-width: 768px) {
    grid-template-columns: minmax(250px, 33.33%) 1fr;
  }

  > section {
    ${space({ mx: "auto", mt: 4, px: 2 })};

    @media (min-width: 768px) {
      ${space({ mt: 0, px: 0 })};
    }
  }
  > section header {
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }
  }
`;

const GitHubContainer = styled.div<SpaceProps>`
  ${space}
  display: flex;
  flex-direction: column;

  & ${Contributions}, & ${Profile} {
    ${space({ mx: "auto" })};

    max-width: unset;

    @media (min-width: 768px) {
      max-width: 75%;
    }
  }
`;

const Bio = styled(Flex)`
  overflow: hidden;
`;

type SelectYearProps = {
  selectedYear: number;
  setSelectedYear: (next: number) => void;
};

const RenderWithSelectedYear = ({
  last,
  children
}: {
  last: number;
  children: (props: SelectYearProps) => JSX.Element;
}) => {
  const [selectedYear, setSelectedYear] = useState(last);

  return children({ selectedYear, setSelectedYear });
};

type GitHubProps = { initial: IcyJoseph.GitHub; name: string };

export const GitHub = ({ initial, name: pageName }: GitHubProps) => {
  const { data } = useGitHub<
    { login: "icyJoseph"; from: string },
    IcyJoseph.GitHub,
    { user: IcyJoseph.GitHub }
  >({
    query: GET_USER,
    variables: {
      login: "icyJoseph",
      ...yearStart()
    },
    initialData: initial,
    selector: ({ user }: { user: IcyJoseph.GitHub }) => user
  });

  const {
    bio,
    name,
    company,
    location,
    login,
    avatarUrl,
    contributionsCollection
  } = data || initial;

  const { contributionYears } = contributionsCollection;
  const [last = new Date().getFullYear()] = contributionYears;

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

      <GitHubContainer mt={5}>
        <Profile>
          <GitHubImg src={avatarUrl} alt={`${name} github profile picture`} />

          <section>
            <header>
              <Text as="h3" $textColor="--blue">
                @{login}
              </Text>

              <Text my={2} $fontWeight={300}>
                <i>{location}</i>
              </Text>
            </header>

            <Bio flexDirection="column" py={3}>
              <Text mb={2} $fontWeight={300}>
                {bio}
              </Text>

              <Text $textColor="--blue" mb={2}>
                {company}
              </Text>
            </Bio>
          </section>
        </Profile>

        <RenderWithSelectedYear last={last}>
          {({ selectedYear, setSelectedYear }) => (
            <Fragment>
              <Contributions justifyContent="center" my={3} mx="auto">
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

              {/* Don't render on SSR */}
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
            </Fragment>
          )}
        </RenderWithSelectedYear>
      </GitHubContainer>

      <BackToTop />
    </Section>
  );
};
