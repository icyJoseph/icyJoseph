import { Keyword } from "design-system/Keyword";
import { Text } from "design-system/Text";

export const BlogIntro = () => {
  return (
    <>
      <header>
        <Text as="h1" $fontSize="2.5rem" my={4}>
          Blog
        </Text>
      </header>

      <div className="max-w-prose">
        <Text mb={2} $fontWeight={300}>
          Here I publish my solutions to coding challenges, and things I learn
          on my day to day job.
        </Text>

        <Text mb={2} $fontWeight={300}>
          I also publish on Medium. You can find me over there as{" "}
          <Text
            as="a"
            href="https://medium.com/@icjoseph"
            target="_blank"
            rel="noopener noreferrer"
            $textColor="--yellow"
            $fontWeight={400}
          >
            <i>@icjoseph</i>
          </Text>
          .
        </Text>

        <Text as="h2" pt={1} mt={3} mb={2} $fontSize="1.8rem">
          Coding Challenges
        </Text>

        <Text mb={2} $fontWeight={300}>
          I put time into coding competitons and coding challengens. I focus
          mostly on <Keyword>Hash Code</Keyword>, <Keyword>Code Jam</Keyword>,{" "}
          <Keyword>Kick Start</Keyword>, and <Keyword>Advent of Code</Keyword>.
        </Text>

        <Text mb={2} $fontWeight={300}>
          When solving coding challenges, I use the Rust programming language.
        </Text>

        <Text as="h2" pt={1} mt={3} mb={2} $fontSize="1.8rem">
          Lessons Learned
        </Text>

        <Text mb={2} $fontWeight={300}>
          In this blog, I take the opportunity to document, things I learn, or
          best practices to use when working with front end and back end
          frameworks, using <Keyword>JavaScript</Keyword>,{" "}
          <Keyword>TypeScript</Keyword>, and even <Keyword>Rust</Keyword>.
        </Text>
      </div>
    </>
  );
};
