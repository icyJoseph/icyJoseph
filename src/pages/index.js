import Head from "next/head";
import axios from "axios";

import { Navigation } from "composition/Navigation";
import { CodeWars } from "composition/CodeWars";

export function Home({ codewars }) {
  return (
    <>
      <Head>
        <title>icyJoseph</title>
      </Head>
      <Navigation />
      <CodeWars initial={codewars} />
    </>
  );
}

export async function getStaticProps() {
  const { data: codewars } = await axios.get(
    "https://www.codewars.com/api/v1/users/icyJoseph"
  );

  return { props: { codewars } };
}

export default Home;
