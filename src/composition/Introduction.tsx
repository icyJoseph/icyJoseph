import { IntroCopy } from "components/Introduction/IntroCopy";
import { Experience } from "components/Introduction/Experience";

import { Flex } from "design-system/Flex";
import { FullPage } from "design-system/Section";
import { Text } from "design-system/Text";

export const Introduction = () => (
  <FullPage my={0} pb={3}>
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Text
        renderAs="h1"
        textAlign="center"
        fontSize="3rem"
        fontWeight={300}
        my={4}
      >
        Joseph
      </Text>

      <Text textAlign="center">
        github:{" "}
        <a
          href="https://github.com/icyJoseph"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>@icyJoseph</i>
        </a>
      </Text>

      <Text textAlign="center">
        medium:{" "}
        <a
          href="https://medium.com/@icjoseph"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>@icjoseph</i>
        </a>
      </Text>

      <IntroCopy>
        <Text mt={4} mx="auto" fontWeight={300} fontSize="2rem">
          Developer from <b>Peru</b>, living in <b>Sweden</b>. I have a
          Bachelor&apos;s in Electronics Engineering, and a Master&apos;s degree
          on business design.
        </Text>

        <Text mt={3} mx="auto" fontWeight={300} fontSize="2rem">
          I have over{" "}
          <Experience title="I do not believe in the value of this number.">
            6 years
          </Experience>{" "}
          of experience working as a software developer, in telecom, mining,
          freight, real state, news, transport and automotive industries.
        </Text>

        <Text mt={3} mx="auto" fontWeight={300} fontSize="2rem">
          I write <b>JavaScript</b>, and <b>TypeScript</b>. I am comfortable
          with any runtime, browser and <b>NodeJS</b>, even a little <b>Deno</b>
          .
        </Text>

        <Text mt={3} mx="auto" fontWeight={300} fontSize="2rem">
          Learning <b>Rust</b> on my free time, in fact it is my go to language
          for coding challenges.
        </Text>

        <Text mt={3} mx="auto" fontWeight={300} fontSize="2rem">
          I enjoy writing <b>CSS</b>, and keep my <b>HTML</b> semantic.
        </Text>
      </IntroCopy>
    </Flex>
  </FullPage>
);
