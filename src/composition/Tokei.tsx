import { Header } from "components/Header";
import { LoC } from "components/Tokei/LoC";

import { Flex } from "design-system/Flex";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";

type TokeiProps = {
  tokei: IcyJoseph.Tokei[];
  name: string;
};

export const Tokei = ({ tokei, name }: TokeiProps) => (
  <Section>
    <Header name={name} title="tokei ~/dev" />

    <Text mt={3} $fontWeight={300}>
      <Text as="span" $textColor="--lightYellow" $fontWeight={400}>
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
        $fontWeight={400}
      >
        tokei
      </Text>
      .
    </Text>

    <Text mt={2} $fontWeight={300}>
      <i>A full circle means 0 blank lines and 0 comments, only code.</i>
    </Text>

    <Flex justifyContent="center" mt={4}>
      {tokei.map(({ language, ...rest }) => (
        <LoC key={language} language={language} {...rest} />
      ))}
    </Flex>

    <Text mt={2} $fontWeight={300}>
      <i>I update these numbers about once a month.</i>
    </Text>
  </Section>
);
