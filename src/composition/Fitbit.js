import styled from "styled-components";
import { Box } from "components/Box";
import { Card, InfoCard } from "components/Card";
import { DataEntry } from "components/DataEntry";
import { Flex } from "components/Flex";
import { Section } from "components/Section";
import { Text } from "components/Text";

import { TopBadges } from "components/Fitbit/TopBadges";
import { ActivityLog } from "components/Fitbit/ActivityLog";

import { useFitbitHR } from "hooks/useFitbit";

const StyledDataEntry = styled(DataEntry)`
  flex-basis: 33.33%;

  & > p:not(:first-child) {
    text-transform: inherit;
  }
`;

const heartRateMonthSummary = (points) =>
  points.reduce((prev, { value }) => {
    const { heartRateZones } = value;

    heartRateZones.forEach(({ name, ...rest }) => {
      if (prev.has(name)) {
        const current = prev.get(name);

        const update = {
          ...current,
          ...rest,
          caloriesOut: current.caloriesOut + (rest.caloriesOut ?? 0),
          minutes: current.minutes + (rest.minutes ?? 0)
        };
        prev.set(name, update);
      } else {
        prev.set(name, { name, ...rest });
      }
    });

    return prev;
  }, new Map());

export const Fitbit = ({ profile, activityLog, initialHR }) => {
  const { data } = useFitbitHR(
    { date: "today", period: "1m", revalidateOnMount: true },
    initialHR
  );

  const heartData = data?.["activities-heart"] ?? [];
  const [prevDay = null, today = null] = heartData.slice(-2);
  const summary = heartRateMonthSummary(heartData);

  return (
    <Section>
      <header id="fitbit">
        <Text as="h2" color="--blue" fontSize="3rem">
          <a href="#fitbit">
            <code>Fitbit</code>
          </a>
        </Text>
      </header>
      <Box as="main">
        <Flex flexDirection="column" my={2}>
          <InfoCard mx="auto">
            <Card.Header>
              <h2>Summary</h2>
              <Text
                as="h6"
                fontSize="1.5rem"
                my={2}
                color="--smokeyWhite"
                fontWeight={300}
              >
                Joined Fitbit in {profile.memberSince}
              </Text>
            </Card.Header>
            <Card.Section>
              <Flex flex={1} flexDirection="column" alignItems="center">
                <Text color="--smokeyWhite">Avg Daily Steps:</Text>

                <Text color="--yellow" fontWeight="bold" m={3} fontSize="2rem">
                  {profile.averageDailySteps}
                </Text>

                <Text color="--smokeyWhite">
                  Resting pulse{" "}
                  <Text
                    as="span"
                    textTransform="lowercase"
                    color="--smokeyWhite"
                  >
                    (bpm)
                  </Text>
                  :
                </Text>
                <Text color="--yellow" fontWeight="bold" m={3} fontSize="2rem">
                  {today?.value?.restingHeartRate ??
                    prevDay?.value?.restingHeartRate}
                </Text>

                <Text color="--smokeyWhite">Last {heartData.length} days</Text>

                <Flex>
                  {Array.from(summary.values()).map(
                    ({ name, minutes, caloriesOut }) => {
                      return (
                        <StyledDataEntry key={name}>
                          <Text color="--smokeyWhite" fontWeight={300}>
                            {name}
                          </Text>
                          <Text color="--yellow" fontWeight="bold" mt={2}>
                            {minutes}{" "}
                            <Text
                              as="span"
                              color="--smokeyWhite"
                              fontWeight={300}
                            >
                              min
                            </Text>
                          </Text>
                          <Text color="--yellow" fontWeight="bold" mt={2}>
                            {Math.floor(caloriesOut)}{" "}
                            <Text
                              as="span"
                              color="--smokeyWhite"
                              fontWeight={300}
                            >
                              Cal
                            </Text>
                          </Text>
                        </StyledDataEntry>
                      );
                    }
                  )}
                </Flex>
              </Flex>
            </Card.Section>
          </InfoCard>
          <TopBadges profile={profile} />
        </Flex>
        <ActivityLog initial={activityLog} />
      </Box>
    </Section>
  );
};
