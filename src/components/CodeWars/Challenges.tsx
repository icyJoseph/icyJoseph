import { Text } from "design-system/Text";

export const Challenges = ({
  completed
}: {
  completed: IcyJoseph.CodeWars["codeChallenges"]["totalCompleted"];
}) => (
  <Text $textColor="--smokeyWhite" m="0 auto">
    <Text as="span" $textColor="--yellow">
      {completed}
    </Text>{" "}
    <span>challenges completed</span>
  </Text>
);
