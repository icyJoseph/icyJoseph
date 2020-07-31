import { Card } from "components/Card";
import { Container } from "components/Container";
import { RenderWithCodeWars } from "hooks/useCodeWars";

import {
  Clan,
  Leaderboard,
  Honor,
  Challenges,
  Languages
} from "components/CodeWarsBlocks";

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
                  <Languages {...ranks} />
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
