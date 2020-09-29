import path from "path";
import fs from "fs";
import { promisify } from "util";

import Head from "next/head";

import { Container } from "components/Container";

import { CodeWars } from "composition/CodeWars";
import { Fitbit } from "composition/Fitbit";
import { Tokei } from "composition/Tokei";
import { GitHub } from "composition/GitHub";

import { getCodeWarsUser } from "pages/api/codewars";
import { queryGitHub } from "pages/api/github";
import { fitbitAuth } from "pages/api/fitbit/profile";

import { GET_USER } from "queries";

import { yearStart } from "helpers";

export function Home({ codewars, github, tokei, fitbit }) {
  return (
    <>
      <Head>
        <title>icyJoseph</title>
      </Head>

      <Container>
        <Tokei tokei={tokei} />
        <CodeWars initial={codewars} />
        <Fitbit profile={fitbit} />
        <GitHub initial={github} />
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
  ).then(JSON.parse);

  const fitbit = await fitbitAuth
    .get("/profile.json")
    .then(({ data }) => data.user);

  return { props: { codewars, github, tokei, fitbit } };
}

export default Home;
