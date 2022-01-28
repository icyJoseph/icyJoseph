import NextImage from "next/image";
import { DataEntry } from "components/DataEntry";
import { Card, InfoCard } from "design-system/Card";
import { Text } from "design-system/Text";
import { Flex } from "design-system/Flex";

import { topBadge } from "design-system/styles/Badge.css";

export const TopBadges = ({
  profile
}: {
  profile: IcyJoseph.FitbitProfile;
}) => {
  return (
    <>
      <Text renderAs="h3" fontSize="2rem" fontWeight={300} mt={3} mb={2} pl={4}>
        Top Badges
      </Text>
      <Flex>
        {profile.topBadges.map((badge) => (
          <InfoCard key={badge.encodedId} my={2} mx="auto">
            <Card.Header>{badge.shortName}</Card.Header>
            <Card.Section>
              <DataEntry>
                <Text textColor="--smokeyWhite">{badge.description}</Text>
                <Text textColor="--smokeyWhite">
                  Achived: {badge.timesAchieved} times
                </Text>
                <div className={topBadge}>
                  <NextImage
                    className={topBadge}
                    src={badge.image75px}
                    width="75"
                    height="75"
                    alt={badge.shortName}
                    loading="lazy"
                  />
                </div>
                <Text textColor="--smokeyWhite" fontWeight={300}>
                  {badge.shareText}
                </Text>
              </DataEntry>
            </Card.Section>
          </InfoCard>
        ))}
      </Flex>
    </>
  );
};
