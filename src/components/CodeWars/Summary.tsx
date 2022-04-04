import { DataEntry } from "design-system/DataEntry";
import { BlockEmoji } from "design-system/Emoji";
import { isSupportedColor, type ColorVars } from "design-system/Global/theme";
import { Text } from "design-system/Text";
import { capitalize } from "functional";

function summaryColor(color: string): ColorVars {
  const key = `light${capitalize(color)}`;

  if (isSupportedColor(key)) {
    return `--${key}`;
  }

  console.warn(`${key} is not a supported color. Default to --white.`);

  return `--white`;
}

export const Summary = ({
  title = "overall",
  name,
  score,
  color,
}: {
  title: string;
} & IcyJoseph.Rank) => (
  <DataEntry>
    <Text $textColor="--lightBlue">{title}</Text>

    <BlockEmoji symbol="🦀" ariaLabel={`${name} language`} />

    <Text $textColor={summaryColor(color)}>
      <span>{name}</span>
    </Text>

    <Text $textColor="--white" $fontSize="1.4rem">
      {score} exp
    </Text>
  </DataEntry>
);
