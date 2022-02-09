import { DataEntry } from "design-system/DataEntry";
import { BlockEmoji } from "design-system/Emoji";
import { Text } from "design-system/Text";

export const Clan = ({ clan }: { clan: IcyJoseph.CodeWars["clan"] }) => (
  <DataEntry>
    <Text $textColor="--lightGreen">clan</Text>

    <BlockEmoji symbol="🛡️" ariaLabel={`My clan: ${clan}`} />

    <Text $textColor="--smokeyWhite">{clan}</Text>
  </DataEntry>
);
