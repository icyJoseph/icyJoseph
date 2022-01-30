import path from "path";
import fs from "fs";
import { promisify } from "util";

import Head from "next/head";
import type { GetStaticPropsResult } from "next";

import { Container } from "design-system/Container";
import { PageNav } from "components/PageNav";

import { CodeWars } from "composition/CodeWars";
import { Fitbit } from "composition/Fitbit";
import { Introduction } from "composition/Introduction";
import { Tokei } from "composition/Tokei";
import { GitHub } from "composition/GitHub";

import { queryGitHub } from "github/fetcher";
import { GET_USER } from "github/queries";

import { getCodeWarsUser } from "pages/api/codewars";
import { fitbitAuth } from "pages/api/fitbit/profile";
import { getActivityLog } from "pages/api/fitbit/activities/list";

import { yearStart, isoStringWithoutMs } from "helpers";
import { NextSeo } from "next-seo";

type HomeProps = {
  codewars: IcyJoseph.CodeWars;
  github: IcyJoseph.GitHub;
  tokei: IcyJoseph.Tokei[];
  fitbit: IcyJoseph.FitbitProfile;
  activityLog: IcyJoseph.ActivityLog;
  initialHR: IcyJoseph.HeartRateActivity;
};

const VERCEL_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export function Home({
  codewars,
  github,
  tokei,
  fitbit,
  activityLog,
  initialHR
}: HomeProps) {
  return (
    <>
      <NextSeo
        title="icyJoseph | Señor Developer"
        description="Señor Developer. JavaScript, TypeScript, Rust, CSS. I work with fullstack. I enjoy coding challenges."
        openGraph={{
          url: `${VERCEL_URL}`,
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
              type: "image/png"
            }
          ]
        }}
      />
      <Head>
        <title>icyJoseph</title>
      </Head>

      <Introduction />

      <Container as="main">
        <PageNav>
          <Tokei tokei={tokei} name="tokei" />

          <Fitbit
            profile={fitbit}
            activityLog={activityLog}
            initialHR={initialHR}
            name="fitbit"
          />

          <GitHub initial={github} name="github" />

          <CodeWars initial={codewars} name="codewars" />
        </PageNav>
      </Container>
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomeProps>
> {
  const codewars = await getCodeWarsUser();

  const github = await queryGitHub<{ data: { user: IcyJoseph.GitHub } }>(
    GET_USER,
    {
      login: "icyJoseph",
      ...yearStart()
    }
  ).then(({ data }) => data.user);

  const tokei = await promisify(fs.readFile)(
    path.resolve(process.cwd(), "tokei.json"),
    "utf-8"
  ).then<IcyJoseph.Tokei[]>(JSON.parse);

  const fitbit = await fitbitAuth
    .get<IcyJoseph.Fitbit>("/profile.json")
    .then(({ data }) => data.user);

  const initialHR = await fitbitAuth
    .get<IcyJoseph.HeartRateActivity>("/activities/heart/date/today/1m.json")
    .then(({ data }) => data);

  const activityLog = await getActivityLog({
    beforeDate: isoStringWithoutMs(new Date().toISOString())
  });

  return {
    props: { codewars, github, tokei, fitbit, activityLog, initialHR },
    revalidate: 10
  };
}

export default Home;
