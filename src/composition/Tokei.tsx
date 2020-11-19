import { FC } from "react";
import { Card } from "components/Card";
import { Emoji } from "components/Emoji";
import { CircularProgress } from "components/CircularProgress";
import { Flex } from "components/Flex";
import { Section } from "components/Section";
import { Text } from "components/Text";
import { useLanguageEasing } from "hooks/useLanguageEasing";

const Language: FC<IcyJoseph.Tokei & { order: number }> = ({
  language,
  code,
  blanks,
  comments,
  order
}) => {
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

type TokeiProps = {
  tokei: IcyJoseph.Tokei[];
  name: string;
};

export const Tokei: FC<TokeiProps> = ({ tokei, name }) => (
  <Section>
    <Section.Header id={name} pt={2}>
      <Text as="h2" color="--blue" fontSize="3rem">
        <a href={`#${name}`}>
          <code>tokei ~/dev</code>
        </a>
      </Text>
    </Section.Header>
    <Flex as="main" justifyContent="center">
      {tokei.map(({ language, ...rest }, index) => (
        <Language key={language} language={language} {...rest} order={index} />
      ))}
    </Flex>
    <Text mt={3} fontWeight="lighter">
      <Text as="span" color="--red">
        Lines of Code,
      </Text>
      , without <strong>blanks</strong> or <strong>comments</strong>, taken from
      my <strong>dev</strong> folder, using{" "}
      <Text
        as="a"
        href="https://github.com/XAMPPRocky/tokei"
        target="_blank"
        rel="noreferrer noopener"
        color="--blue"
      >
        tokei
      </Text>
      .
      <Text mt={2} fontWeight="lighter">
        <i>A full circle means 0 blanks and 0 comments.</i>
      </Text>
    </Text>
  </Section>
);
