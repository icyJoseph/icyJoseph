import path from "path";
import fs from "fs";
import { promisify } from "util";

import Head from "next/head";

import { CodeWars } from "composition/CodeWars";
import { Container } from "components/Container";
import { Dev } from "composition/Dev";
import { GitHub } from "composition/GitHub";
import { Navigation } from "composition/Navigation";

import { getCodeWarsUser } from "pages/api/codewars";
import { getGitHubUser } from "pages/api/github";

export function Home({ codewars, github, tokei }) {
  return (
    <>
      <Head>
        <title>icyJoseph</title>
      </Head>
      <Navigation />
      <Container>
        <Dev tokei={tokei} />
        <GitHub initial={github} />
        <CodeWars initial={codewars} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const codewars = await getCodeWarsUser();

  const github = await getGitHubUser();

  const tokei = await promisify(fs.readFile)(
    path.resolve(process.cwd(), "tokei.json"),
    "utf-8"
  ).then(JSON.parse);

  return { props: { codewars, github, tokei } };
}

export default Home;
