import { Card } from "components/Card";
import { Emoji } from "design-system/Emoji";
import { CircularProgress } from "design-system/CircularProgress";
import { Text } from "design-system/Text";

export const LoC = ({ language, code, blanks, comments }: IcyJoseph.Tokei) => {
  const total = code + blanks + comments;

  const percentage = (code / total) * 100;

  return (
    <Card m={2} px={2}>
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

          <Text>LoC</Text>
        </CircularProgress>
      </Card.Section>
    </Card>
  );
};
