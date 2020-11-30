import { DataEntry } from "components/DataEntry";
import { Emoji } from "components/Emoji";
import { Text } from "components/Text";
import { capitalize } from "functional";

const Summary = ({
  title = "overall",
  name,
  score,
  color
}: {
  title: string;
} & IcyJoseph.Rank) => (
  <DataEntry>
    <Text color="--lightBlue">{title}</Text>
    <p>
      <Emoji symbol="🦀" ariaLabel={`${name} language`} />
    </p>
    <Text color={`--light${capitalize(color)}`}>
      <span>{name}</span>
    </Text>
    <Text color="--white" fontSize="1.4rem">
      {score} exp
    </Text>
  </DataEntry>
);

export const Clan = ({ clan }: { clan: IcyJoseph.CodeWars["clan"] }) => (
  <DataEntry>
    <Text color="--lightGreen">clan</Text>
    <p>
      <Emoji symbol="🛡️" ariaLabel={`My clan: ${clan}`} />
    </p>
    <Text color="--smokeyWhite">{clan}</Text>
  </DataEntry>
);

export const Leaderboard = ({
  position
}: {
  position: IcyJoseph.CodeWars["leaderboardPosition"];
}) => (
  <DataEntry>
    <Text color="--lightYellow">Rank</Text>
    <p>
      <Emoji symbol="👨🏽‍💻" ariaLabel={`Leaderboard position: ${position}`} />
    </p>
    <Text color="--smokeyWhite">{position}</Text>
  </DataEntry>
);

export const Honor = ({ honor }: { honor: IcyJoseph.CodeWars["honor"] }) => (
  <DataEntry>
    <Text color="--yellow">honor</Text>
    <p>
      <Emoji symbol="✨" ariaLabel={`Honor: ${honor}`} />
    </p>
    <Text color="--smokeyWhite">{honor}</Text>
  </DataEntry>
);

export const Challenges = ({
  completed
}: {
  completed: IcyJoseph.CodeWars["codeChallenges"]["totalCompleted"];
}) => (
  <Text color="--smokeyWhite" m="0 auto">
    <Text as="span" color="--yellow">
      {completed}
    </Text>{" "}
    challenges completed
  </Text>
);

export const Languages = ({
  languages
}: {
  languages: IcyJoseph.CodeWars["ranks"]["languages"];
}) => {
  return (
    <>
      {Object.entries(languages).map(([name, lang]) => (
        <Summary key={name} title={name} {...lang} />
      ))}
    </>
  );
};
