import path from "path";
import fs from "fs";
import { promisify } from "util";

import Head from "next/head";

import { Container } from "components/Container";
import { PageNav } from "components/PageNav";

import { CodeWars } from "composition/CodeWars";
import { Fitbit } from "composition/Fitbit";
import { Tokei } from "composition/Tokei";
import { GitHub } from "composition/GitHub";

import { getCodeWarsUser } from "pages/api/codewars";
import { queryGitHub } from "pages/api/github";
import { fitbitAuth } from "pages/api/fitbit/profile";
import { getActivityLog } from "pages/api/fitbit/activities/list";

import { GET_USER } from "queries";

import { yearStart } from "helpers";

type HomeProps = {
  codewars: IcyJoseph.CodeWars;
  github: IcyJoseph.GitHub;
  tokei: IcyJoseph.Tokei[];
  fitbit: IcyJoseph.Fitbit;
  activityLog: IcyJoseph.ActivityLog;
  initialHR: IcyJoseph.HeartRate;
};

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
      <Head>
        <title>icyJoseph</title>
      </Head>

      <Container>
        <PageNav>
          <Tokei tokei={tokei} name="tokei" />

          <CodeWars initial={codewars} name="codewars" />

          <Fitbit
            profile={fitbit}
            activityLog={activityLog}
            initialHR={initialHR}
            name="fitbit"
          />

          <GitHub initial={github} name="github" />
        </PageNav>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const codewars = await getCodeWarsUser();

  const github = await queryGitHub(GET_USER, {
    login: "icyJoseph",
    ...yearStart()
  }).then(({ data }) => data.user);

  const tokei = await promisify(fs.readFile)(
    path.resolve(process.cwd(), "tokei.json"),
    "utf-8"
  ).then<IcyJoseph.Tokei[]>(JSON.parse);

  const fitbit = await fitbitAuth
    .get("/profile.json")
    .then(({ data }) => data.user);

  const initialHR = await fitbitAuth
    .get("/activities/heart/date/today/1m.json")
    .then(({ data }) => data);

  const activityLog = await getActivityLog({
    afterDate: `${new Date().getFullYear()}-01-01`
  });

  return { props: { codewars, github, tokei, fitbit, activityLog, initialHR } };
}

export default Home;
