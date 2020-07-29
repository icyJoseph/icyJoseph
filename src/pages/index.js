import Head from "next/head";

import { Navigation } from "composition/Navigation";
import { useCodeWars } from "hooks/useCodeWars";

const RenderWithCodeWars = ({ children }) => {
  return children(useCodeWars());
};

export default function Home() {
  return (
    <>
      <Head>
        <title>icyJoseph</title>
      </Head>
      <Navigation />
      <RenderWithCodeWars>
        {({ data, error, loading }) => {
          if (error) return <span>Something went wrong</span>;
          if (loading) return <span>Loading</span>;

          return <span>{JSON.stringify(data)}</span>;
        }}
      </RenderWithCodeWars>
    </>
  );
}
