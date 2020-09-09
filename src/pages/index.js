import path from "path";
import fs from "fs";
import { promisify } from "util";

import Head from "next/head";

import { CodeWars } from "composition/CodeWars";
import { Container } from "components/Container";
import { Tokei } from "composition/Tokei";
import { GitHub } from "composition/GitHub";
import { Navigation } from "composition/Navigation";

import { getCodeWarsUser } from "pages/api/codewars";
import { queryGitHub } from "pages/api/github";
import { GET_USER } from "queries";

export function Home({ codewars, github, tokei }) {
  return (
    <>
      <Head>
        <title>icyJoseph</title>
      </Head>
      <Navigation />
      <Container>
        <Tokei tokei={tokei} />
        <CodeWars initial={codewars} />
        <GitHub initial={github} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const codewars = await getCodeWarsUser();

  const github = await queryGitHub(GET_USER, {
    login: "icyJoseph"
  }).then(({ data }) => data.user);

  const tokei = await promisify(fs.readFile)(
    path.resolve(process.cwd(), "tokei.json"),
    "utf-8"
  ).then(JSON.parse);

  return { props: { codewars, github, tokei } };
}

export default Home;
