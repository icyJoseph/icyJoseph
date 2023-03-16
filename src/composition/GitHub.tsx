import { useState, Fragment, useMemo } from "react";

import dynamic from "next/dynamic";
import NextImage from "next/legacy/image";

import { Header } from "components/Header";
import { BackToTop } from "design-system/BackToTop";
import { Box } from "design-system/Box";
import { Button } from "design-system/Button";
import { Flex } from "design-system/Flex";
import { GitHubImg } from "design-system/GitHub/Image";
import { Profile, Bio } from "design-system/GitHub/Profile";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";
import { yearRange } from "helpers";

type SelectYearProps = {
  selectedYear: number;
  setSelectedYear: (next: number) => void;
};

const DynamicYearlyContribution = dynamic(
  () => import("components/GitHub/YearlyContribution")
);

const RenderWithSelectedYear = ({
  last,
  children,
}: {
  last: number;
  children: (props: SelectYearProps) => JSX.Element;
}) => {
  const [selectedYear, setSelectedYear] = useState(last);

  return children({ selectedYear, setSelectedYear });
};

type GitHubProps = {
  initial: Omit<IcyJoseph.GitHub, "repositoryDiscussionComments"> & {
    repositoryDiscussionComments: {
      totalCount: number;
      repositories: string[];
    };
  };
  name: string;
};

export const GitHub = ({ initial, name: pageName }: GitHubProps) => {
  const {
    bio,
    name,
    company,
    location,
    login,
    avatarUrl,
    contributionsCollection,
    repositoryDiscussionComments,
    followers,
  } = initial;

  const { contributionYears } = contributionsCollection;
  const [last = new Date().getFullYear()] = contributionYears;

  const totalAnswers = repositoryDiscussionComments.totalCount;

  const answeredOn = useMemo(
    () =>
      repositoryDiscussionComments.repositories.map((repo, index, src) => {
        if (index === src.length - 2) {
          return (
            <Fragment key={repo}>
              <Text as="span" $textColor="--yellow" $fontWeight={400}>
                {repo}
              </Text>
              <span>, and </span>
            </Fragment>
          );
        }

        return (
          <Fragment key={repo}>
            <Text as="span" $textColor="--yellow" $fontWeight={400}>
              {repo}
            </Text>

            {index < src.length - 1 && <span>, </span>}
          </Fragment>
        );
      }),
    [repositoryDiscussionComments.repositories]
  );

  const totalFollowers = followers.totalCount;

  return (
    <Section style={{ contentVisibility: "auto" }}>
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

              <Text $fontWeight={300} mb={1}>
                <Text $textColor="--yellow" as="span" $fontWeight={400}>
                  {totalFollowers}
                </Text>{" "}
                followers
              </Text>

              <Text $fontWeight={300}>
                <Text $textColor="--yellow" as="span" $fontWeight={400}>
                  {totalAnswers}
                </Text>{" "}
                resolved discussions on {answeredOn}
              </Text>
            </Bio>
          </section>
        </Profile>

        <Text as="h3" $fontSize="2.5rem" mt={4} mb={3}>
          Contributions
        </Text>

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

              <DynamicYearlyContribution
                year={selectedYear}
                fallback={contributionsCollection}
                {...yearRange(selectedYear)}
              />
            </Fragment>
          )}
        </RenderWithSelectedYear>
      </Flex>

      <BackToTop />
    </Section>
  );
};
