import { Card } from "components/Card";
import { Emoji } from "components/Emoji";
import { DataEntry } from "components/DataEntry";
import { Text } from "components/Text";
import { Flex } from "components/Flex";

export const TopBadges = ({ profile }) => {
  return (
    <>
      <Text as="h6">Top Badges</Text>
      <Flex>
        {profile.topBadges.map((badge) => (
          <Card my={2} mx="auto" key={badge.encodedId}>
            <Card.Header>{badge.shortName}</Card.Header>
            <Card.Section>
              <DataEntry>
                <Text color="--smokeyWhite">{badge.description}</Text>
                <Text color="--smokeyWhite">
                  Achived: {badge.timesAchieved} times
                </Text>
              </DataEntry>
            </Card.Section>
          </Card>
        ))}
      </Flex>
    </>
  );
};
