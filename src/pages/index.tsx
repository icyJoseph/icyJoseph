import path from "path";
import fs from "fs";
import { promisify } from "util";

import Head from "next/head";
import type { GetStaticPropsResult } from "next";
import styled from "styled-components";

import { Flex } from "design-system/Flex";
import { Box } from "design-system/Box";
import { Container } from "design-system/Container";
import { Text } from "design-system/Text";
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

import { yearStart, isoStringWithoutMs } from "helpers";
import { Section } from "design-system/Section";

type HomeProps = {
  codewars: IcyJoseph.CodeWars;
  github: IcyJoseph.GitHub;
  tokei: IcyJoseph.Tokei[];
  fitbit: IcyJoseph.Fitbit;
  activityLog: IcyJoseph.ActivityLog;
  initialHR: IcyJoseph.HeartRateActivity;
};

const StyledSection = styled(Section)`
  min-height: 100vh;

  & ${Text} {
    color: var(--smokeyWhite);
  }
`;

const IntroCopy = styled(Box)`
  max-width: 55ch;
`;

const Introduction = () => (
  <StyledSection mt={0}>
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Text
        as="h1"
        $textAlign="center"
        $fontSize="3rem"
        $fontWeight={300}
        my={4}
      >
        Joseph
      </Text>

      <Text $textAlign="center">
        github: <i>@icyJoseph</i>
      </Text>

      <Text $textAlign="center">
        medium: <i>@icjoseph</i>
      </Text>

      <IntroCopy>
        <Text mt={4} mx="auto" $fontWeight={300} $fontSize="2rem">
          Developer from <b>Peru</b>, living in <b>Sweden</b>. I have a
          Bachelor&apos;s in Electronics Engineering, and a Master&apos;s degree
          on business design.
        </Text>

        <Text mt={3} mx="auto" $fontWeight={300} $fontSize="2rem">
          I have over <b>400 years</b> of experience working as a software
          developer, in telecom, mining, freight, real state, news, transport
          and automotive industries.
        </Text>

        <Text mt={3} mx="auto" $fontWeight={300} $fontSize="2rem">
          I write <b>JavaScript</b>, and <b>TypeScript</b>. I am comfortable
          with any runtime, browser and <b>NodeJS</b>, even a little <b>Deno</b>
          .
        </Text>

        <Text mt={3} mx="auto" $fontWeight={300} $fontSize="2rem">
          Learning <b>Rust</b> on my free time, in fact it is my go to language
          for coding challenges.
        </Text>

        <Text mt={3} mx="auto" $fontWeight={300} $fontSize="2rem">
          I enjoy writing <b>CSS</b>, and keep my <b>HTML</b> semantic.
        </Text>
      </IntroCopy>
    </Flex>
  </StyledSection>
);

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
