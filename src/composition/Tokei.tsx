import { Card } from "design-system/Card";
import { Emoji } from "design-system/Emoji";
import { CircularProgress } from "design-system/CircularProgress";
import { Flex } from "design-system/Flex";
import { Section, SectionHeader } from "design-system/Section";
import { Text } from "design-system/Text";

const Language = ({ language, code, blanks, comments }: IcyJoseph.Tokei) => {
  const total = code + blanks + comments;

  const percentage = (code / total) * 100;

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
          <code>{code}</code>
          <p>LoC</p>
        </CircularProgress>
      </Card.Section>
    </Card>
  );
};

type TokeiProps = {
  tokei: IcyJoseph.Tokei[];
  name: string;
};

export const Tokei = ({ tokei, name }: TokeiProps) => (
  <Section>
    <SectionHeader id={name} mb={3}>
      <Text as="h2" $fontSize="3rem">
        <a href={`#${name}`}>
          <code>tokei ~/dev</code>
        </a>
      </Text>
    </SectionHeader>

    <Text mt={3} $fontWeight={300}>
      <Text as="span" $textColor="--lightYellow">
        Lines of Code
      </Text>
      , without counting <strong>blanks</strong> or <strong>comments</strong>,
      taken from my <strong>dev</strong> folder, using{" "}
      <Text
        as="a"
        href="https://github.com/XAMPPRocky/tokei"
        target="_blank"
        rel="noreferrer noopener"
        $textColor="--lightBlue"
      >
        tokei
      </Text>
      .
    </Text>

    <Text mt={2} $fontWeight={300}>
      <i>A full circle means 0 blanks and 0 comments.</i>
    </Text>

    <Flex justifyContent="center" mt={4}>
      {tokei.map(({ language, ...rest }) => (
        <Language key={language} language={language} {...rest} />
      ))}
    </Flex>

    <Text mt={2} $fontWeight={300}>
      <i>I update these numbers about once a month.</i>
    </Text>
  </Section>
);
