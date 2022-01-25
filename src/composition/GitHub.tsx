import { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";
import NextImage from "next/image";

import { YearlyContribution } from "components/YearlyContribution";

import { Button } from "design-system/Button";
import { Flex } from "design-system/Flex";
import { Section, SectionHeader } from "design-system/Section";
import { Text } from "design-system/Text";
import { BackToTop } from "design-system/BackToTop";

import { yearStart, yearEnd } from "helpers";
import { useGitHub } from "hooks/useGitHub";

import { GET_USER } from "queries";

const GitHubImg = styled.span`
  ${space({ m: "auto" })};
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;

  @media (min-width: 540px) {
    width: 75%;
  }

  & > span {
    box-shadow: 0 0 0 2px white;
    border-radius: 50%;
  }

  & > span:before {
    position: absolute;
    content: "";
    background-color: var(--background);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const Contributions = styled(Flex)``;

const Profile = styled.div`
  grid-column: span 2;
  justify-content: center;

  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 540px) {
    grid-template-columns: minmax(250px, 33.33%) 1fr;
  }

  > section {
    ${space({ mx: "auto", mt: 4, px: 2 })};

    @media (min-width: 540px) {
      ${space({ mt: 0, px: 0 })};
    }
  }
  > section header {
    text-align: center;

    @media (min-width: 540px) {
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
    fallbackData: initial,
    selector: ({ user }: { user: IcyJoseph.GitHub }) => user,
    revalidateOnMount: false
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
      <SectionHeader id={pageName} mb={3}>
        <Text as="h2" $fontSize="3rem">
          <a href={`#${pageName}`}>
            <code>GitHub</code>
          </a>
        </Text>
      </SectionHeader>

      <GitHubContainer>
        <Profile>
          <GitHubImg>
            <NextImage
              src={avatarUrl}
              alt={`${name} github profile picture`}
              width="460"
              height="460"
            />
          </GitHubImg>

          <section>
            <header>
              <Text as="h3" $textColor="--yellow">
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

              <Text $textColor="--yellow" mb={2}>
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
