import NextImage from "next/image";

import { Card } from "components/Card";

import { Badge, BadgesWrapper } from "design-system/Fitbit/Badges";
import { DataEntry } from "design-system/DataEntry";
import { Flex } from "design-system/Flex";
import { Text } from "design-system/Text";

export const TopBadges = ({
  profile,
}: {
  profile: IcyJoseph.FitbitProfile;
}) => {
  return (
    <>
      <Text
        as="h3"
        $fontSize="2rem"
        $fontWeight={300}
        mt={3}
        mb={2}
        pl="1.5rem"
      >
        Top Badges
      </Text>

      <BadgesWrapper>
        {profile.topBadges.map((badge) => (
          <Flex key={badge.encodedId} flex={1}>
            <Card my={2} mx="auto">
              <Card.Header>{badge.shortName}</Card.Header>

              <Card.Section>
                <DataEntry>
                  <Text $textColor="--smokeyWhite">{badge.description}</Text>

                  <Text $textColor="--smokeyWhite">
                    Achieved: {badge.timesAchieved} times
                  </Text>

                  <Badge>
                    <NextImage
                      src={badge.image75px}
                      width="75"
                      height="75"
                      alt={badge.shortName}
                      loading="lazy"
                    />
                  </Badge>

                  <Text $textColor="--smokeyWhite" $fontWeight={300}>
                    {badge.shareText}
                  </Text>
                </DataEntry>
              </Card.Section>
            </Card>
          </Flex>
        ))}
      </BadgesWrapper>
    </>
  );
};
