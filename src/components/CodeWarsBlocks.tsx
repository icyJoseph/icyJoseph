import { DataEntry } from "components/DataEntry";
import { Emoji } from "design-system/Emoji";
import { Text } from "design-system/Text";
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
    <Text $textColor="--lightBlue">{title}</Text>
    <p>
      <Emoji symbol="🦀" ariaLabel={`${name} language`} />
    </p>
    <Text $textColor={`--light${capitalize(color)}`}>
      <span>{name}</span>
    </Text>
    <Text $textColor="--white" $fontSize="1.4rem">
      {score} exp
    </Text>
  </DataEntry>
);

export const Clan = ({ clan }: { clan: IcyJoseph.CodeWars["clan"] }) => (
  <DataEntry>
    <Text $textColor="--lightGreen">clan</Text>
    <p>
      <Emoji symbol="🛡️" ariaLabel={`My clan: ${clan}`} />
    </p>
    <Text $textColor="--smokeyWhite">{clan}</Text>
  </DataEntry>
);

export const Leaderboard = ({
  position
}: {
  position: IcyJoseph.CodeWars["leaderboardPosition"];
}) => (
  <DataEntry>
    <Text $textColor="--lightYellow">Rank</Text>
    <p>
      <Emoji symbol="👨🏽‍💻" ariaLabel={`Leaderboard position: ${position}`} />
    </p>
    <Text $textColor="--smokeyWhite">{position}</Text>
  </DataEntry>
);

export const Honor = ({ honor }: { honor: IcyJoseph.CodeWars["honor"] }) => (
  <DataEntry>
    <Text $textColor="--yellow">honor</Text>
    <p>
      <Emoji symbol="✨" ariaLabel={`Honor: ${honor}`} />
    </p>
    <Text $textColor="--smokeyWhite">{honor}</Text>
  </DataEntry>
);

export const Challenges = ({
  completed
}: {
  completed: IcyJoseph.CodeWars["codeChallenges"]["totalCompleted"];
}) => (
  <Text $textColor="--smokeyWhite" m="0 auto">
    <Text as="span" $textColor="--yellow">
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
