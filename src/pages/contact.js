import Head from "next/head";
import { useState } from "react";

import Stegcloak from "stegcloak";
import Cookies from "cookies";

import { ContactForm } from "composition/ContactForm";
import { Intention } from "composition/Intention";

import { Calendar } from "components/Calendar";
import { Container } from "components/Container";
import { FullPage } from "components/Section";
import { Text } from "components/Text";

import { useFitbitHR } from "hooks/useFitbit";

import { fitbitAuth } from "pages/api/fitbit/profile";

export function Contact({ token, initialHR }) {
  const [isHuman, setIsHuman] = useState(false);
  const { data } = useFitbitHR(
    { date: "today", period: "1m", revalidateOnMount: true },
    initialHR
  );

  const heartData = data?.["activities-heart"] ?? [];

  return (
    <>
      <Head>
        <title>Contact - icyJoseph</title>
      </Head>
      <FullPage>
        <Container p={3}>
          <header>
            <Text as="h2" fontSize="3rem">
              Hello!
            </Text>

            <Text my={2}>
              Before contacting me, please consider my stress levels the last 31
              days.
            </Text>

            <Calendar data={heartData} />
          </header>
          <section>
            {isHuman ? (
              <ContactForm token={token} />
            ) : (
              <Intention callback={setIsHuman} />
            )}
          </section>
        </Container>
      </FullPage>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const cookies = new Cookies(req, res, { keys: ["crypto keys"] });

  const session = cookies.get("session");

  if (!session) {
    cookies.set("session", "some encoded stuff", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      signed: true
    });
  }

  const stegcloak = new Stegcloak(true, true);

  const token = stegcloak.hide(
    "secret",
    process.env.CLOAK_PASSWORD,
    "public lorem ipsum"
  );

  const initialHR = await fitbitAuth
    .get("/activities/heart/date/today/1m.json")
    .then(({ data }) => data);

  return { props: { token, initialHR } };
}

export default Contact;
