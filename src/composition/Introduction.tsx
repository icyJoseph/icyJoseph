import { Bold } from "design-system/Bold";
import { Flex } from "design-system/Flex";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";
import { TextBox } from "design-system/TextBox";

export const Introduction = () => (
  <Section mt={0} pt={[2, 3, 4]} pb="5%">
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Text
        as="h1"
        $textAlign="center"
        $fontSize="3rem"
        $fontWeight={300}
        my={4}
      >
        Joseph
      </Text>

      <Text $textAlign="center">
        github:{" "}
        <a
          href="https://github.com/icyJoseph"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>@icyJoseph</i>
        </a>
      </Text>

      <Text $textAlign="center">
        medium:{" "}
        <a
          href="https://medium.com/@icjoseph"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>@icjoseph</i>
        </a>
      </Text>

      <TextBox chars="65ch">
        <Text mt={4} mx="auto" $fontWeight={300} $fontSize="2rem">
          Developer from <Bold>Peru</Bold>, living in <Bold>Sweden</Bold>. I
          have a Bachelor&apos;s in Electronics Engineering, and a Master&apos;s
          degree on business design.
        </Text>

        <Text mt={3} mx="auto" $fontWeight={300} $fontSize="2rem">
          I have over{" "}
          <Bold title="I do not believe in the value of this number.">
            {new Date().getFullYear() - 2016} years
          </Bold>{" "}
          of experience working as a software developer, in telecom, mining,
          freight, real state, news, transport and automotive industries.
        </Text>

        <Text mt={3} mx="auto" $fontWeight={300} $fontSize="2rem">
          I write <Bold>JavaScript</Bold>, and <Bold>TypeScript</Bold>. I am
          comfortable with any runtime, browser and <Bold>NodeJS</Bold>, even a
          little <Bold>Deno</Bold>.
        </Text>

        <Text mt={3} mx="auto" $fontWeight={300} $fontSize="2rem">
          Learning <Bold>Rust</Bold> on my free time, in fact it is my go to
          language for coding challenges.
        </Text>

        <Text mt={3} mx="auto" $fontWeight={300} $fontSize="2rem">
          I have started to learn <Bold>Swift</Bold>, mainly by building iOS
          apps on xcode, and occasionally using it to solve coding challenges.
        </Text>
      </TextBox>
    </Flex>
  </Section>
);
