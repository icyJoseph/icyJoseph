import Head from "next/head";

import { Button } from "components/Button";
import { Flex } from "components/Flex";
import { FullPage } from "components/Section";
import { Container } from "components/Container";
import { Text } from "components/Text";
import { useFitbitHR } from "hooks/useFitbit";

export function Contact() {
  const { data } = useFitbitHR({ date: "today", period: "1m" });

  const heartData = data?.["activities-heart"] ?? [];

  const [lastDay = null] = heartData.slice(-1);

  const restingPulse = lastDay?.value?.restingHeartRate ?? 0;

  return (
    <>
      <Head>
        <title>icyJoseph</title>
      </Head>
      <FullPage>
        <Container p={3}>
          <header>
            <Text as="h2" fontSize="3rem">
              Let's play a game
            </Text>
            <Text my={2}>If you win, you get to contact me</Text>
            <Text my={2}>
              Before contacting me, please consider my stress level:{" "}
              {restingPulse > 60 ? "Little high" : "It's all cool"}
            </Text>
          </header>
          <Flex as="main" justifyContent="center" py={2} px={3} mt={3}>
            <Button text="Technology or Pokemon?" />
          </Flex>
        </Container>
      </FullPage>
    </>
  );
}

export default Contact;
