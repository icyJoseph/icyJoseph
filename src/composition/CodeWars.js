import styled from "styled-components";
import { space } from "@styled-system/space";

import { Container } from "components/Container";
import { Card } from "components/Card";
import { Emoji } from "components/Emoji";
import { RenderWithCodeWars } from "hooks/useCodeWars";

const DataEntry = styled.div`
  ${space({ mx: 1, mt: 2 })};
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;

  > p {
    ${space({ my: 1 })}
    text-transform: capitalize;
  }

  > p:first-child {
    font-size: 1.8rem;
  }
`;

const Text = styled(({ as: Element = "p", ...props }) => (
  <Element {...props} />
))`
  color: ${({ color, theme }) => `var(${color}, ${theme.white})`};
`;

const Clan = ({ clan }) => (
  <DataEntry>
    <Text color="--lightGreen">clan</Text>
    <p>
      <Emoji symbol="🛡️" ariaLabel={`My clan: ${clan}`} />
    </p>
    <Text color="--smokeyWhite">{clan}</Text>
  </DataEntry>
);

const Leaderboard = ({ position }) => (
  <DataEntry>
    <Text color="--lightYellow">Rank</Text>
    <p>
      <Emoji symbol="👨🏽‍💻" ariaLabel={`Leaderboard position: ${position}`} />
    </p>
    <Text>{position}</Text>
  </DataEntry>
);

const Honor = ({ honor }) => (
  <DataEntry>
    <Text color="--lightRed">honor</Text>
    <p>
      <Emoji symbol="✨" ariaLabel={`Honor: ${honor}`} />
    </p>
    <Text>{honor}</Text>
  </DataEntry>
);

const Completed = styled(Text)`
  ${space({ m: "0 auto" })};
  text-align: center;
`;

const Challenges = ({ completed }) => (
  <Completed color="--smokeyWhite">
    <Text as="span" color="--yellow">
      {completed}
    </Text>{" "}
    challenges completed
  </Completed>
);

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const Summary = ({ title = "overall", name, score, color }) => (
  <DataEntry>
    <Text color="--lightBlue">{title}</Text>
    <p>
      <Emoji symbol="🦀" ariaLabel={`${name} language`} />
    </p>
    <Text color={`--light${capitalize(color)}`}>
      <span>
        {name} / {score} exp
      </span>
    </Text>
  </DataEntry>
);

const Ranks = ({ languages }) => {
  return (
    <>
      {Object.entries(languages).map(([name, lang]) => (
        <Summary key={name} title={name} {...lang} />
      ))}
    </>
  );
};

export const CodeWars = ({ initial }) => {
  return (
    <RenderWithCodeWars initial={initial}>
      {({ data, error, loading }) => {
        if (error) return <span>Something went wrong</span>;
        if (loading) return <span>Loading</span>;

        const {
          username,
          honor,
          clan,
          leaderboardPosition,
          ranks,
          codeChallenges
        } = data;

        return (
          <Container>
            <Container.Main>
              <Card>
                <Card.Header>
                  <h2>
                    <a
                      href="https://www.codewars.com/users/icyJoseph"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      CodeWars
                    </a>
                  </h2>

                  <Card.SubHeader as="h3">
                    <i>{username}</i>
                  </Card.SubHeader>
                </Card.Header>

                <Card.Section>
                  <Clan clan={clan} />
                  <Honor honor={honor} />
                </Card.Section>

                <Card.Section>
                  <Leaderboard position={leaderboardPosition} />
                  <Ranks {...ranks} />
                </Card.Section>

                <Card.Section>
                  <Challenges completed={codeChallenges.totalCompleted} />
                </Card.Section>
              </Card>
            </Container.Main>
          </Container>
        );
      }}
    </RenderWithCodeWars>
  );
};
