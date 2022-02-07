import { Header } from "components/Header";
import { Card } from "components/Card";
import { Summary } from "components/CodeWars/Summary";
import { Challenges } from "components/CodeWars/Challenges";
import { Clan } from "components/CodeWars/Clan";
import { Honor } from "components/CodeWars/Honor";
import { Leaderboard } from "components/CodeWars/Leaderboard";

import { BackToTop } from "design-system/BackToTop";
import { Flex } from "design-system/Flex";
import { Section } from "design-system/Section";

import { Text } from "design-system/Text";

import { useCodeWars } from "hooks/useCodeWars";

export const CodeWars = ({
  initial,
  name
}: {
  initial: IcyJoseph.CodeWars;
  name: "codewars";
}) => {
  const { data = initial } = useCodeWars(initial);

  const { username, honor, clan, leaderboardPosition, ranks, codeChallenges } =
    data;

  return (
    <Section>
      <Header name={name} title="CodeWars" />

      <Text mt={3} $fontWeight={300}>
        I like to solve coding challenges. For now I am only showing my{" "}
        <a
          href="https://www.codewars.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text as="span" $textColor="--lightBlue">
            Codewars
          </Text>
        </a>{" "}
        profile, but I will eventually include more.
      </Text>

      <Flex mt={4}>
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

            {Object.entries(ranks.languages).map(([name, lang]) => (
              <Summary key={name} title={name} {...lang} />
            ))}
          </Card.Section>

          <Card.Section>
            <Honor honor={honor} />
            <Leaderboard position={leaderboardPosition} />
          </Card.Section>

          <Card.Section>
            <Challenges completed={codeChallenges.totalCompleted} />
          </Card.Section>
        </Card>
      </Flex>

      <BackToTop />
    </Section>
  );
};
