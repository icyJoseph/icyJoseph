import { BackToTop } from "design-system/BackToTop";
import { Card } from "design-system/Card";
import { Flex } from "design-system/Flex";
import { Section, SectionHeader } from "design-system/Section";

import {
  Clan,
  Leaderboard,
  Honor,
  Challenges,
  Languages
} from "components/CodeWarsBlocks";

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
      <SectionHeader id={name} mb={3}>
        <Text renderAs="h2" fontSize="3rem">
          <a href={`#${name}`}>
            <code>CodeWars</code>
          </a>
        </Text>
      </SectionHeader>

      <Text mt={3} fontWeight={300}>
        I like to solve coding challenges. For now I am only showing my{" "}
        <a
          href="https://www.codewars.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text renderAs="span" textColor="--lightBlue">
            Codewars
          </Text>
        </a>{" "}
        profile, but I will eventually include more.
      </Text>

      <Flex mt={4}>
        <Card my={2} mx="auto">
          <Card.Header>
            <Text renderAs="h2" fontWeight={300} fontSize="2rem">
              <a
                href="https://www.codewars.com/users/icyJoseph"
                rel="noopener noreferrer"
                target="_blank"
              >
                {username}
              </a>
            </Text>
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
      </Flex>
      <BackToTop />
    </Section>
  );
};
