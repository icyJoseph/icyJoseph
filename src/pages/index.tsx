import type { GetStaticPropsResult } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";

import { getCodeWarsUser } from "codewars";
import { Bytes } from "components/Bytes";
import {
  isBaseActivity,
  isSwimming,
  type ReducedActivityLog,
} from "components/Fitbit/ActivityLog";
import { PageNav } from "components/PageNav";
import { CodeWars } from "composition/CodeWars";
import { Fitbit } from "composition/Fitbit";
import { GitHub } from "composition/GitHub";
import { Introduction } from "composition/Introduction";
import { Container } from "design-system/Container";
import { queryGitHub, redactedGitHubRepositoryData } from "github/fetcher";
import { GET_USER } from "github/queries";
import { isoStringWithoutMs, yearRange } from "helpers";
import { getActivityLog } from "pages/api/fitbit/activities/list";
import { fitbitAuth } from "pages/api/fitbit/profile";

type HomeProps = {
  codewars: IcyJoseph.CodeWars;
  github: Omit<
    IcyJoseph.GitHub,
    "repositoryDiscussionComments" | "repositories"
  > & {
    repositoryDiscussionComments: {
      totalCount: number;
      repositories: string[];
    };
  };
  languages: Array<{ name: string; size: number }>;
  fitbit: Pick<IcyJoseph.FitbitProfile, "topBadges" | "averageDailySteps">;
  activityLog: Array<ReducedActivityLog>;
  restingHeartRate: number | undefined;
};

const VERCEL_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

const landingPageOpenGraph = {
  url: VERCEL_URL,
  title: "icyJoseph | Señor Developer",
  site_name: "icyJoseph",
  description:
    "Señor Developer. JavaScript, TypeScript, Rust, CSS. I work with fullstack. I enjoy coding challenges.",
  images: [
    {
      url: `${VERCEL_URL}/waves_background.png`,
      width: 960,
      height: 540,
      alt: "icyJoseph wavy background",
      type: "image/png",
    },
  ],
};

export function Home({
  codewars,
  github,
  languages,
  fitbit,
  activityLog,
  restingHeartRate,
}: HomeProps) {
  return (
    <>
      <NextSeo
        title="icyJoseph | Señor Developer"
        description="Señor Developer. JavaScript, TypeScript, Rust, CSS. I work with fullstack. I enjoy coding challenges."
        openGraph={landingPageOpenGraph}
      />

      <Head>
        <title>icyJoseph</title>
      </Head>

      <Introduction />

      <Container>
        <PageNav>
          <GitHub initial={github} name="github">
            <Bytes languages={languages} />
          </GitHub>

          <CodeWars codewars={codewars} name="codewars" />

          <Fitbit
            profile={fitbit}
            activityLog={activityLog}
            restingHeartRate={restingHeartRate}
            name="fitbit"
          />
        </PageNav>
      </Container>
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomeProps>
> {
  const codewars = await getCodeWarsUser();

  const githubData = await queryGitHub<{ data: { user: IcyJoseph.GitHub } }>(
    GET_USER,
    {
      login: "icyJoseph",
      ...yearRange(),
    }
  ).then(({ data }) => data.user);

  const { repositories, ...otherData } = githubData;

  const github: HomeProps["github"] = {
    ...otherData,
    contributionsCollection: {
      ...githubData.contributionsCollection,
      commitContributionsByRepository: redactedGitHubRepositoryData(
        githubData.contributionsCollection.commitContributionsByRepository
      ),
    },
    repositoryDiscussionComments: {
      totalCount: githubData.repositoryDiscussionComments.totalCount,
      repositories: [
        ...new Set(
          githubData.repositoryDiscussionComments.nodes.map(
            ({ discussion }) => discussion.repository.name
          )
        ),
      ],
    },
  };

  const languagesAggregate: Record<string, number> = {};

  repositories.nodes.forEach((curr) => {
    if (curr.isArchived) return;

    curr.languages.edges.forEach((lang) => {
      if (!lang) return;

      languagesAggregate[lang.node.name] =
        languagesAggregate[lang.node.name] || 0;
      languagesAggregate[lang.node.name] += lang.size;
    });
  });

  const topLanguages = Object.entries(languagesAggregate)
    .sort((lhs, rhs) => rhs[1] - lhs[1])
    .map(([key, value]) => ({ name: key, size: value }))
    .slice(0, 4);

  const languages = topLanguages;

  const fitbitData = await fitbitAuth
    .get<IcyJoseph.Fitbit>("/profile.json")
    .then(({ data }) => data.user);

  const fitbit: Pick<
    IcyJoseph.FitbitProfile,
    "topBadges" | "averageDailySteps"
  > = {
    averageDailySteps: fitbitData.averageDailySteps,
    topBadges: fitbitData.topBadges,
  };

  const heartRateData = await fitbitAuth
    .get<IcyJoseph.HeartRateActivity>("/activities/heart/date/today/7d.json")
    .then(({ data }) => data["activities-heart"]);

  const restingHeartRate = heartRateData
    .slice(0)
    .reverse()
    .find((entry) => Boolean(entry))?.value.restingHeartRate;

  const fullActivityLog: IcyJoseph.ActivityLog = await getActivityLog({
    beforeDate: isoStringWithoutMs(new Date().toISOString()),
  });

  const activityLog = fullActivityLog.map((entry) => {
    const base = {
      logId: entry.logId,
      activityName: entry.activityName,
      startTime: entry.startTime,
      activeDuration: entry.activeDuration,
      calories: entry.calories,
      averageHeartRate: entry.averageHeartRate,
    };

    if (isSwimming(entry)) {
      return { ...base, distance: entry.distance, pace: entry.pace };
    }

    if (isBaseActivity(entry)) {
      return { ...base, steps: entry.steps };
    }

    return base;
  });

  return {
    props: {
      codewars,
      github,
      languages,
      fitbit,
      activityLog,
      restingHeartRate,
    },
    revalidate: 10,
  };
}

export default Home;
