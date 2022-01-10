import { FC } from "react";
import { Card } from "design-system/Card";
import { Emoji } from "design-system/Emoji";
import { CircularProgress } from "design-system/CircularProgress";
import { Flex } from "design-system/Flex";
import { Section, SectionHeader } from "design-system/Section";
import { Text } from "design-system/Text";
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
    <SectionHeader id={name} pt={2} mb={5}>
      <Text as="h2" $textColor="--blue" $fontSize="3rem">
        <a href={`#${name}`}>
          <code>tokei ~/dev</code>
        </a>
      </Text>
    </SectionHeader>

    <Flex justifyContent="center">
      {tokei.map(({ language, ...rest }, index) => (
        <Language key={language} language={language} {...rest} order={index} />
      ))}
    </Flex>

    <Text mt={3} $fontWeight={300}>
      <Text as="span" $textColor="--red">
        Lines of Code
      </Text>
      , without counting <strong>blanks</strong> or <strong>comments</strong>,
      taken from my <strong>dev</strong> folder, using{" "}
      <Text
        as="a"
        href="https://github.com/XAMPPRocky/tokei"
        target="_blank"
        rel="noreferrer noopener"
        $textColor="--blue"
      >
        tokei
      </Text>
      .
    </Text>
    <Text mt={2} $fontWeight={300}>
      <i>A full circle means 0 blanks and 0 comments.</i>
    </Text>
  </Section>
);
