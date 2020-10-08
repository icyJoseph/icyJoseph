import { Card } from "components/Card";
import { Emoji } from "components/Emoji";
import { CircularProgress } from "components/CircularProgress";
import { Flex } from "components/Flex";
import { Section } from "components/Section";
import { Text } from "components/Text";
import { useLanguageEasing } from "hooks/useLanguageEasing";

const Language = ({ language, code, blanks, comments, order }) => {
  const { value, percentage } = useLanguageEasing({
    code,
    blanks,
    comments,
    order
  });

  return (
    <Card m={2}>
      <Card.Header>
        <h2>{language}</h2>
      </Card.Header>

      <Card.Section>
        <CircularProgress percentage={percentage}>
          <Emoji
            mb={2}
            symbol="📜"
            ariaLabel={`Lines of ${language} code`}
            title={`Lines of ${language} code`}
          />
          <code>{value}</code>
          <p>LoC</p>
        </CircularProgress>
      </Card.Section>
    </Card>
  );
};

export const Tokei = ({ tokei }) => {
  return (
    <Section my={3} px={2}>
      <header id="tokei">
        <Text as="h2" color="--blue" fontSize="3rem">
          <a href="#tokei">
            <code>tokei ~/dev</code>
          </a>
        </Text>
      </header>
      <Flex as="main" justifyContent="center">
        {tokei.map(({ language, ...rest }, index) => (
          <Language
            key={language}
            language={language}
            {...rest}
            order={index}
          />
        ))}
      </Flex>
      <Text mt={3}>
        Actual{" "}
        <Text as="span" color="--red">
          LoC
        </Text>{" "}
        (Lines of Code), without counting blanks and comments, taken from my{" "}
        <code>dev</code> folder, using{" "}
        <Text
          as="a"
          href="https://github.com/XAMPPRocky/tokei"
          target="_blank"
          rel="noreferrer noopener"
          color="--blue"
        >
          tokei
        </Text>
        . A full circle would mean that, for that language, I would have written
        zero blank lines and zero comments, only code.
      </Text>
    </Section>
  );
};
