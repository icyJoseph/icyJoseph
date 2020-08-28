import { Button } from "components/Button";
import { Card } from "components/Card";
import { Emoji } from "components/Emoji";
import { CircularProgress } from "components/CircularProgress";
import { Flex } from "components/Flex";
import { Section } from "components/Section";
import { Text } from "components/Text";
import { useLanguageEasing } from "hooks/useLanguageEasing";

const Language = ({ language, code, blanks, comments }) => {
  const { value, percentage } = useLanguageEasing({
    code,
    blanks,
    comments
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
          <p>lines</p>
        </CircularProgress>
      </Card.Section>
    </Card>
  );
};

export const Tokei = ({ tokei }) => {
  console.log({ tokei });
  return (
    <Section my={3} px={2}>
      <header>
        <Text as="h2" color="--blue" fontSize="2rem">
          <code>tokei ~/dev</code>
        </Text>
      </header>
      <Flex as="main" justifyContent="center">
        {tokei.map(({ language, ...rest }) => (
          <Language key={language} language={language} {...rest} />
        ))}
      </Flex>
      <Text>
        The indicators above show the ratio of actual lines of code to total
        number of lines, including blanks and comments.
      </Text>
    </Section>
  );
};
