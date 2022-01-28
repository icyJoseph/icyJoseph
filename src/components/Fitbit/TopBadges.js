import styled from "styled-components";
import { space } from "@styled-system/space";
import { DataEntry } from "components/DataEntry";
import { Card, InfoCard } from "design-system/Card";
import { Text } from "design-system/Text";
import { Flex } from "design-system/Flex";

const BadgeImg = styled.img`
  ${space({ my: 2, mx: "auto" })};
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 1px solid var(--smokeyWhite);
`;

export const TopBadges = ({ profile }) => {
  return (
    <>
      <Text
        renderAs="h3"
        fontSize="2rem"
        fontWeight={300}
        mt={3}
        mb={2}
        pl="1.5rem"
      >
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
                <BadgeImg
                  src={badge.image75px}
                  alt={badge.shortName}
                  loading="lazy"
                />
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
