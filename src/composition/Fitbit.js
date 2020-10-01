import { Box } from "components/Box";
import { Card } from "components/Card";
import { Emoji } from "components/Emoji";
import { DataEntry } from "components/DataEntry";
import { Flex } from "components/Flex";
import { Section } from "components/Section";
import { Text } from "components/Text";

import { TopBadges } from "components/Fitbit/TopBadges";
import { ActivityLog } from "components/Fitbit/ActivityLog";

import { useFitbitHR } from "hooks/useFitbit";

export const Fitbit = ({ profile, activityLog }) => {
  const { data } = useFitbitHR({ date: "today", period: "1m" });

  const heartData = data?.["activities-heart"] ?? [];
  const [lastDay = null] = heartData.slice(-1);

  return (
    <Section my={3} px={2}>
      <header id="activity">
        <Text as="h2" color="--blue" fontSize="3rem">
          <a href="#activity">
            <code>Activity</code>
          </a>
        </Text>
      </header>
      <Box as="main">
        <Box my={2}>
          <Text>Joined Fitbit in {profile.memberSince}</Text>
        </Box>
        <Flex flexDirection="column">
          <Card my={2} mx="auto">
            <Card.Header>
              <h2>Steps</h2>
            </Card.Header>
            <Card.Section>
              <DataEntry>
                <Text color="--smokeyWhite">
                  Avg Daily Steps: {profile.averageDailySteps}
                </Text>
                <Text color="--smokeyWhite">
                  Resting pulse today: {lastDay?.value?.restingHeartRate}
                </Text>
              </DataEntry>
            </Card.Section>
          </Card>
          <TopBadges profile={profile} />
        </Flex>
        <ActivityLog initial={activityLog} />
      </Box>
    </Section>
  );
};
