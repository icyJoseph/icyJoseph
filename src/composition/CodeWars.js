import { Card } from "components/Card";
import { Flex } from "components/Flex";
import { Section } from "components/Section";
import { RenderWithCodeWars } from "hooks/useCodeWars";

import {
  Clan,
  Leaderboard,
  Honor,
  Challenges,
  Languages
} from "components/CodeWarsBlocks";
import { Text } from "components/Text";

export const CodeWars = ({ initial }) => {
  return (
    <Section my={3} px={2}>
      <header>
        <Text as="h2" color="--blue" fontSize="2rem">
          On CodeWars
        </Text>
      </header>
      <Flex as="main">
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
              <Card my={2} mx="auto">
                <Card.Header>
                  <h2>
                    <a
                      href="https://www.codewars.com/users/icyJoseph"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {username}
                    </a>
                  </h2>
                </Card.Header>

                <Card.Section>
                  <Clan clan={clan} />
                  <Languages {...ranks} />
                </Card.Section>

                <Card.Section>
                  <Honor honor={honor} />
                  <Leaderboard position={leaderboardPosition} />
                </Card.Section>

                <Card.Section>
                  <Challenges completed={codeChallenges.totalCompleted} />
                </Card.Section>
              </Card>
            );
          }}
        </RenderWithCodeWars>
      </Flex>
    </Section>
  );
};
