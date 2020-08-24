import path from "path";
import fs from "fs";
import { promisify } from "util";

import Head from "next/head";
import axios from "axios";

import { CodeWars } from "composition/CodeWars";
import { Container } from "components/Container";
import { Dev } from "composition/Dev";
import { GitHub } from "composition/GitHub";
import { Navigation } from "composition/Navigation";

export function Home({ codewars, tokei }) {
  return (
    <>
      <Head>
        <title>icyJoseph</title>
      </Head>
      <Navigation />
      <Container>
        <Dev tokei={tokei} />
        <GitHub />
        <CodeWars initial={codewars} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const { data: codewars } = await axios.get(
    "https://www.codewars.com/api/v1/users/icyJoseph"
  );

  const tokei = await promisify(fs.readFile)(
    path.resolve(process.cwd(), "tokei.json"),
    "utf-8"
  ).then(JSON.parse);

  return { props: { codewars, tokei } };
}

export default Home;
