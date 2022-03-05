import { useEffect, useState, Fragment, useMemo } from "react";
import NextImage from "next/image";

import { Header } from "components/Header";
import { YearlyContribution } from "components/GitHub/YearlyContribution";

import { BackToTop } from "design-system/BackToTop";
import { Button } from "design-system/Button";
import { Flex } from "design-system/Flex";
import { GitHubImg } from "design-system/GitHub/Image";
import { Profile, Bio } from "design-system/GitHub/Profile";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";

import { yearStart, yearEnd } from "helpers";
import { useGitHubProfile } from "hooks/useGitHub";
import { Box } from "design-system/Box";

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
  const { data } = useGitHubProfile({
    ...yearStart(),
    fallbackData: initial
  });

  const {
    bio,
    name,
    company,
    location,
    login,
    avatarUrl,
    contributionsCollection,
    repositoryDiscussionComments
  } = data || initial;

  const { contributionYears } = contributionsCollection;
  const [last = new Date().getFullYear()] = contributionYears;

  const [showContributions, setShowContributions] = useState(false);

  useEffect(() => {
    setShowContributions(true);
  }, []);

  const totalAnswers = repositoryDiscussionComments.totalCount;

  const answersToRepos = useMemo(
    () => [
      ...new Set(
        repositoryDiscussionComments.nodes.map(({ discussion }) => {
          return discussion.repository.name;
        })
      )
    ],
    [repositoryDiscussionComments]
  );

  return (
    <Section>
      <Header name={pageName} title="GitHub" />

      <Flex flexDirection="column" alignItems="center">
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
              <Box $width="80%">
                <Flex justifyContent="center" my={3} mx="auto">
                  {contributionYears
                    .slice(0)
                    .sort((a, b) => a - b)
                    .map((year) => (
                      <Button
                        key={year}
                        variant={year !== selectedYear ? "outlined" : "primary"}
                        m={2}
                        onClick={() => {
                          setSelectedYear(year);
                        }}
                      >
                        {year}
                      </Button>
                    ))}
                </Flex>
              </Box>

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

        <Box mt={5}>
          <Text as="h3" $fontSize="2.5rem" mb={3}>
            Answers
          </Text>

          <Text $fontWeight={300}>
            Whenever possible I try to answer questions on the discussions for
            GitHub projects I support.
          </Text>

          <Text $fontWeight={300} mt={2}>
            In total I have{" "}
            <Text as="span" $textColor="--yellow" $fontWeight={400}>
              {totalAnswers}
            </Text>{" "}
            accepted answers, in these repositories:{" "}
            {answersToRepos.map((repo, index, src) => (
              <>
                <Text
                  key={repo}
                  as="span"
                  $textColor="--yellow"
                  $fontWeight={400}
                >
                  {repo}
                </Text>
                {index < src.length - 1 && <span>, </span>}
              </>
            ))}
            .
          </Text>
        </Box>
      </Flex>

      <BackToTop />
    </Section>
  );
};
