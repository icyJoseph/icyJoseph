import { DataEntry } from "design-system/DataEntry";
import { BlockEmoji } from "design-system/Emoji";
import { Text } from "design-system/Text";

export const Leaderboard = ({
  position
}: {
  position: IcyJoseph.CodeWars["leaderboardPosition"];
}) => (
  <DataEntry>
    <Text $textColor="--lightYellow">Rank</Text>

    <BlockEmoji symbol="👨🏽‍💻" ariaLabel={`Leaderboard position: ${position}`} />

    <Text $textColor="--smokeyWhite">{position}</Text>
  </DataEntry>
);
