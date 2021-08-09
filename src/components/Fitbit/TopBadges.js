import styled from "styled-components";
import { space } from "@styled-system/space";
import { Card, InfoCard } from "components/Card";
import { DataEntry } from "components/DataEntry";
import { Text } from "components/Text";
import { Flex } from "components/Flex";

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
        as="h6"
        $fontSize="2rem"
        $fontWeight="lighter"
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
                <Text $textColor="--smokeyWhite">{badge.description}</Text>
                <Text $textColor="--smokeyWhite">
                  Achived: {badge.timesAchieved} times
                </Text>
                <BadgeImg
                  src={badge.image75px}
                  alt={badge.shortName}
                  loading="lazy"
                />
                <Text $textColor="--smokeyWhite" $fontWeight={300}>
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
