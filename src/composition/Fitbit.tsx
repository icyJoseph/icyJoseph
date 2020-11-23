import { FC } from "react";
import styled from "styled-components";

import { BackToTop } from "components/BackToTop";
import { Box } from "components/Box";
import { DataEntry } from "components/DataEntry";
import { Flex } from "components/Flex";
import { Section } from "components/Section";
import { Text } from "components/Text";

import { TopBadges } from "components/Fitbit/TopBadges";
import { ActivityLog } from "components/Fitbit/ActivityLog";

import { useFitbitHR } from "hooks/useFitbit";

const Cardio = styled(Flex)`
  width: 100%;
`;

const DataSegment = styled(Flex)`
  min-width: 80%;

  @media (min-width: 414px) {
    min-width: 328px;
  }
`;

const StyledDataEntry = styled(DataEntry)`
  & > p:not(:first-child) {
    text-transform: inherit;
  }
`;

const heartRateMonthSummary = (points: IcyJoseph.HeartRatePoint[]) =>
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

type FitbitProps = {
  profile: IcyJoseph.FitbitUser;
  activityLog: IcyJoseph.ActivityLog;
  initialHR: IcyJoseph.HeartRateActivity;
  name: string;
};

export const Fitbit: FC<FitbitProps> = ({
  profile,
  activityLog,
  initialHR,
  name
}) => {
  const { data } = useFitbitHR(
    { date: "today", period: "1m", revalidateOnMount: true },
    initialHR
  );

  const heartData = data?.["activities-heart"] ?? [];
  const [prevDay = null, today = null] = heartData.slice(-2);
  const summary = heartRateMonthSummary(heartData);

  return (
    <Section>
      <Section.Header id={name}>
        <Text as="h2" color="--blue" fontSize="3rem">
          <a href={`#${name}`}>
            <code>Fitbit</code>
          </a>
        </Text>
      </Section.Header>
      <Box as="main" mb={2}>
        <Flex mt={2} pb={3}>
          <DataSegment
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="2rem" fontWeight="lighter">
              Average Daily Steps
            </Text>

            <Text color="--blue" m={3} fontSize="5rem">
              {profile.averageDailySteps}
            </Text>
          </DataSegment>
          <DataSegment
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="2rem" fontWeight="lighter">
              Resting pulse
            </Text>
            <Text color="--blue" m={3} fontSize="5rem">
              {today?.value?.restingHeartRate ??
                prevDay?.value?.restingHeartRate}{" "}
              <Text as="span" fontWeight="lighter">
                bpm
              </Text>
            </Text>

            <Text fontWeight="lighter">
              Heart activity last {heartData.length} days
            </Text>

            <Cardio>
              {Array.from(summary.values())
                .slice(1)
                .filter(({ minutes, caloriesOut }) => minutes * caloriesOut > 0)
                .map(({ name, minutes, caloriesOut }) => {
                  return (
                    <StyledDataEntry key={name}>
                      <Text fontWeight={300}>{name}</Text>
                      <Text fontSize="2.5rem" color="--yellow" mt={2}>
                        {minutes}{" "}
                        <Text as="span" fontWeight={300}>
                          min
                        </Text>
                      </Text>
                      <Text fontSize="2.5rem" color="--yellow" mt={2}>
                        {Math.floor(caloriesOut)}{" "}
                        <Text as="span" fontWeight={300}>
                          Cal
                        </Text>
                      </Text>
                    </StyledDataEntry>
                  );
                })}
            </Cardio>
          </DataSegment>
        </Flex>
        <TopBadges profile={profile} />
        <ActivityLog initial={activityLog} />
      </Box>
      <BackToTop />
    </Section>
  );
};
