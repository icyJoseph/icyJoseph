import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { ContactForm } from "composition/ContactForm";
import { Intention } from "composition/Intention";

import { Container } from "components/Container";
import { FullPage, Section } from "components/Section";
import { Text } from "components/Text";

const Forms = ({
  cloaked,
  done
}: {
  cloaked: string | null;
  done: () => void;
}) => {
  const [reason, setReason] = useState(null);

  if (!cloaked) return null;

  return reason ? (
    <ContactForm cloaked={cloaked} done={done} reason={reason} />
  ) : (
    <Intention callback={setReason} />
  );
};

export function Contact() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [cloaked, setCloaked] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get("/api/cloaked", { cancelToken: source.token })
      .then(({ data }) => setCloaked(data.cloaked));

    return () => source.cancel();
  }, []);

  const done = useCallback(() => setHasSubmitted(true), [setHasSubmitted]);

  return (
    <>
      <Head>
        <title>Contact - icyJoseph</title>
      </Head>
      <Container as="section">
        <FullPage>
          <header>
            <Text as="h2" $textColor="--blue" $fontSize="3rem">
              Hello!
            </Text>
          </header>

          <Section maxWidth="65ch">
            {hasSubmitted ? (
              <div>Thanks for reaching out!</div>
            ) : (
              <Forms cloaked={cloaked} done={done} />
            )}
          </Section>
        </FullPage>
      </Container>
    </>
  );
}

export default Contact;
