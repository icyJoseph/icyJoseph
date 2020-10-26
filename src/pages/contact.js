import Head from "next/head";
import { useState } from "react";
import axios from "axios";

import Stegcloak from "stegcloak";
import Cookies from "cookies";

import { ContactForm } from "composition/ContactForm";
import { Intention } from "composition/Intention";

import { Calendar } from "components/Calendar";
import { Container } from "components/Container";
import { FullPage, Section } from "components/Section";
import { Text } from "components/Text";

import { useFitbitHR } from "hooks/useFitbit";

import { fitbitAuth } from "pages/api/fitbit/profile";
import { buildMissionName } from "utils/missionName";

const Forms = ({ cloaked, done }) => {
  const [reason, setReason] = useState(false);

  return reason ? (
    <ContactForm cloaked={cloaked} done={done} reason={reason} />
  ) : (
    <Intention callback={setReason} />
  );
};

export function Contact({ submitted, cloaked, initialHR }) {
  const { data } = useFitbitHR(
    { date: "today", period: "1m", revalidateOnMount: true },
    initialHR
  );

  const heartData = data?.["activities-heart"] ?? [];

  const [hasSubmitted, setHasSubmitted] = useState(!!submitted);

  return (
    <>
      <Head>
        <title>Contact - icyJoseph</title>
      </Head>
      <Container>
        <FullPage>
          <header>
            <Text as="h2" color="--blue" fontSize="3rem">
              Hello!
            </Text>
          </header>
          <Section as="main" maxWidth="65ch">
            <Text my={2}>
              Before contacting me, please consider my stress levels the last 31
              days.
            </Text>

            <Calendar data={heartData} />

            {hasSubmitted ? (
              <div>Thanks for reaching out!</div>
            ) : (
              <Forms cloaked={cloaked} done={() => setHasSubmitted(true)} />
            )}
          </Section>
        </FullPage>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const cookies = new Cookies(req, res, { keys: [process.env.CRYPTO_KEY] });

  let session = cookies.get("session", { signed: true });

  if (!session) {
    const latest = await axios(
      "https://api.spacexdata.com/v3/launches/latest"
    ).then(({ data }) => data);

    const payload = { ...latest, submitted: null };
    const cookie = JSON.stringify(payload);

    cookies.set("session", cookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      signed: true
    });

    session = cookie;
  }

  const stegcloak = new Stegcloak(true, true);

  const parsed = JSON.parse(session);

  const visible = buildMissionName(parsed);

  const cloaked = stegcloak.hide(session, process.env.CLOAK_PASSWORD, visible);

  const initialHR = await fitbitAuth
    .get("/activities/heart/date/today/1m.json")
    .then(({ data }) => data);

  return {
    props: { cloaked, initialHR, submitted: parsed.submitted }
  };
}

export default Contact;
