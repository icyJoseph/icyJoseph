import { DataEntry } from "design-system/DataEntry";
import { BlockEmoji } from "design-system/Emoji";
import { Text } from "design-system/Text";

export const Honor = ({ honor }: { honor: IcyJoseph.CodeWars["honor"] }) => (
  <DataEntry>
    <Text $textColor="--yellow">honor</Text>

    <BlockEmoji symbol="✨" ariaLabel={`Honor: ${honor}`} />

    <Text $textColor="--smokeyWhite">{honor}</Text>
  </DataEntry>
);
