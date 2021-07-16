import Head from "next/head";
import { useState } from "react";

import Stegcloak from "stegcloak";
import Cookies from "cookies";

import { ContactForm } from "composition/ContactForm";
import { Intention } from "composition/Intention";

import { Container } from "components/Container";
import { FullPage, Section } from "components/Section";
import { Text } from "components/Text";

import { randomSequence } from "utils/randomSequence";

const Forms = ({ cloaked, done }) => {
  const [reason, setReason] = useState(false);

  return reason ? (
    <ContactForm cloaked={cloaked} done={done} reason={reason} />
  ) : (
    <Intention callback={setReason} />
  );
};

export function Contact({ cloaked }) {
  const [hasSubmitted, setHasSubmitted] = useState(false);

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

  const cookies = new Cookies(req, res, {
    keys: [process.env.CRYPTO_KEY],
    secure: true
  });

  const sessionCookie = cookies.get("session", { signed: true });

  let session;

  try {
    session = JSON.parse(sessionCookie);
  } catch (e) {
    session = {
      submitted: null,
      email: null
    };
  }

  const sequence = await randomSequence();

  const cookie = JSON.stringify({ ...session, sequence });

  cookies.set("session", cookie, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    signed: true
  });

  const stegcloak = new Stegcloak(true, true);

  const cloaked = stegcloak.hide(cookie, process.env.CLOAK_PASSWORD, sequence);

  return {
    props: { cloaked }
  };
}

export default Contact;
