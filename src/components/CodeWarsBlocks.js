import { DataEntry } from "components/DataEntry";
import { Emoji } from "components/Emoji";
import { Text } from "components/Text";
import { capitalize } from "functional";

const Summary = ({ title = "overall", name, score, color }) => (
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

export const Clan = ({ clan }) => (
  <DataEntry>
    <Text color="--lightGreen">clan</Text>
    <p>
      <Emoji symbol="🛡️" ariaLabel={`My clan: ${clan}`} />
    </p>
    <Text color="--smokeyWhite">{clan}</Text>
  </DataEntry>
);

export const Leaderboard = ({ position }) => (
  <DataEntry>
    <Text color="--lightYellow">Rank</Text>
    <p>
      <Emoji symbol="👨🏽‍💻" ariaLabel={`Leaderboard position: ${position}`} />
    </p>
    <Text color="--smokeyWhite">{position}</Text>
  </DataEntry>
);

export const Honor = ({ honor }) => (
  <DataEntry>
    <Text color="--lightRed">honor</Text>
    <p>
      <Emoji symbol="✨" ariaLabel={`Honor: ${honor}`} />
    </p>
    <Text color="--smokeyWhite">{honor}</Text>
  </DataEntry>
);

export const Challenges = ({ completed }) => (
  <Text color="--smokeyWhite" m="0 auto" align="center">
    <Text as="span" color="--yellow">
      {completed}
    </Text>{" "}
    challenges completed
  </Text>
);

export const Languages = ({ languages }) => {
  return (
    <>
      {Object.entries(languages).map(([name, lang]) => (
        <Summary key={name} title={name} {...lang} />
      ))}
    </>
  );
};
