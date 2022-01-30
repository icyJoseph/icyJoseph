import NextImage from "next/image";
import { DataEntry } from "components/DataEntry";
import { Card } from "design-system/Card";
import { Text } from "design-system/Text";
import { Flex } from "design-system/Flex";

import { topBadge } from "design-system/styles/Badge.css";
import {
  textContainer,
  textContainerTheme
} from "design-system/styles/utility.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

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
      <Flex justifyContent="center">
        {profile.topBadges.map((badge) => (
          <Card
            key={badge.encodedId}
            my={2}
            mx="auto"
            className={textContainer}
            style={assignInlineVars(textContainerTheme, {
              maxWidth: "33ch"
            })}
          >
            <Card.Header>
              <Text renderAs="h4" fontSize="2rem" fontWeight={300}>
                {badge.shortName}
              </Text>
            </Card.Header>

            <Card.Section>
              <DataEntry>
                <Text textColor="--smokeyWhite" textAlign="center">
                  {badge.description}
                </Text>
                <Text textColor="--smokeyWhite" textAlign="center">
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

                <Text
                  textColor="--smokeyWhite"
                  fontWeight={300}
                  textAlign="center"
                >
                  {badge.shareText}
                </Text>
              </DataEntry>
            </Card.Section>
          </Card>
        ))}
      </Flex>
    </>
  );
};
