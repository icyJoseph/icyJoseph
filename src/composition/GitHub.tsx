import { useState, Fragment, useMemo, ReactNode } from "react";

import NextImage from "next/image";

import YearlyContribution from "components/GitHub/YearlyContribution";
import { Header } from "components/Header";
import { BackToTop } from "design-system/BackToTop";
import { Button } from "design-system/Button";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";
import { yearRange } from "helpers";

type SelectYearProps = {
  selectedYear: number;
  setSelectedYear: (next: number) => void;
};

const RenderWithSelectedYear = ({
  initial,
  children,
}: {
  initial: number;
  children: (props: SelectYearProps) => JSX.Element;
}) => {
  const [selectedYear, setSelectedYear] = useState(initial);

  return children({ selectedYear, setSelectedYear });
};

type GitHubProps = {
  initial: Omit<
    IcyJoseph.GitHub,
    "repositoryDiscussionComments" | "repositories"
  > & {
    repositoryDiscussionComments: {
      totalCount: number;
      repositories: string[];
    };
  };
  name: string;
  children: ReactNode;
};

export const GitHub = ({ children, initial, name: pageName }: GitHubProps) => {
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

      <div className="flex flex-col items-center">
        <NextImage
          src={avatarUrl}
          alt={`${name} github profile picture`}
          width="460"
          height="460"
          className="max-w-sm rounded-full border-white border-2 border-solid shadow-md"
          priority
        />

        <section className="py-12 mx-auto flex flex-col">
          <header>
            <Text as="h3" $textColor="--yellow">
              @{login}
            </Text>

            <Text my={2} $fontWeight={300}>
              <i>{location}</i>
            </Text>
          </header>

          <div className="flex flex-col py-3 overflow-hidden">
            <Text mb={2} $fontWeight={300} className="max-w-3xl">
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
          </div>
        </section>

        {children}

        <Text as="h3" $fontSize="2.5rem" mt={4} mb={3}>
          Contributions
        </Text>

        <RenderWithSelectedYear initial={last}>
          {({ selectedYear, setSelectedYear }) => (
            <Fragment>
              <div className="w-4/5">
                <div className="flex flex-wrap-reverse flex-row-reverse justify-center mx-auto my-4">
                  {contributionYears.map((year) => (
                    <Button
                      key={year}
                      variant={year !== selectedYear ? "outlined" : "primary"}
                      m={2}
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>

              <YearlyContribution
                year={selectedYear}
                fallback={contributionsCollection}
                {...yearRange(selectedYear)}
              />
            </Fragment>
          )}
        </RenderWithSelectedYear>
      </div>

      <BackToTop />
    </Section>
  );
};
