import Head from "next/head";
import styles from "../styles/Home.module.css";
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
