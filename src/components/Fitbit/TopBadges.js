import { Card, InfoCard } from "components/Card";
import { DataEntry } from "components/DataEntry";
import { Text } from "components/Text";
import { Flex } from "components/Flex";

export const TopBadges = ({ profile }) => {
  return (
    <>
      <Text as="h6" fontSize="1.8rem" mt={3}>
        Top Badges
      </Text>
      <Flex>
        {profile.topBadges.map((badge) => (
          <InfoCard key={badge.encodedId} my={2} mx="auto">
            <Card.Header>{badge.shortName}</Card.Header>
            <Card.Section>
              <DataEntry>
                <Text color="--smokeyWhite">{badge.description}</Text>
                <Text color="--smokeyWhite">
                  Achived: {badge.timesAchieved} times
                </Text>
              </DataEntry>
            </Card.Section>
          </InfoCard>
        ))}
      </Flex>
    </>
  );
};
