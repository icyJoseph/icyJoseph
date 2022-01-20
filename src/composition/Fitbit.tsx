import { FC } from "react";
import styled from "styled-components";

import { BackToTop } from "design-system/BackToTop";
import { Box } from "design-system/Box";
// import { DataEntry } from "components/DataEntry";
import { Flex } from "design-system/Flex";
import { Section, SectionHeader } from "design-system/Section";
import { Text } from "design-system/Text";

import { TopBadges } from "components/Fitbit/TopBadges";
import { ActivityLog } from "components/Fitbit/ActivityLog";

import { useFitbitHR } from "hooks/useFitbit";

// const Cardio = styled(Flex)`
//   width: 100%;
// `;

const DataSegment = styled(Flex)`
  min-width: 80%;

  @media (min-width: 414px) {
    min-width: 328px;
  }
`;

// const StyledDataEntry = styled(DataEntry)`
//   & > p:not(:first-child) {
//     text-transform: inherit;
//   }
// `;

// const heartRateMonthSummary = (points: IcyJoseph.HeartRatePoint[]) =>
//   points.reduce((prev, { value }) => {
//     const { heartRateZones } = value;

//     heartRateZones.forEach(({ name, ...rest }) => {
//       if (prev.has(name)) {
//         const current = prev.get(name);

//         const update = {
//           ...current,
//           ...rest,
//           caloriesOut: current.caloriesOut + (rest.caloriesOut ?? 0),
//           minutes: current.minutes + (rest.minutes ?? 0)
//         };
//         prev.set(name, update);
//       } else {
//         prev.set(name, { name, ...rest });
//       }
//     });

//     return prev;
//   }, new Map());

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
  // const summary = heartRateMonthSummary(heartData);

  return (
    <Section>
      <SectionHeader id={name} mb={5}>
        <Text as="h2" $fontSize="3rem">
          <a href={`#${name}`}>
            <code>Fitbit</code>
          </a>
        </Text>
      </SectionHeader>

      <Box>
        <Flex mt={2} pb={3}>
          <DataSegment
            flex={1}
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Text $fontSize="2rem" $fontWeight={300}>
              Average Daily Steps
            </Text>

            <Text m={3} $fontSize="5rem">
              {profile.averageDailySteps}
            </Text>
          </DataSegment>

          <DataSegment
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text $fontSize="2rem" $fontWeight={300}>
              Resting pulse
            </Text>

            <Text m={3} $fontSize="5rem">
              {today?.value?.restingHeartRate ??
                prevDay?.value?.restingHeartRate}{" "}
              <Text as="span" $fontWeight={300}>
                bpm
              </Text>
            </Text>
          </DataSegment>
        </Flex>

        <TopBadges profile={profile} />

        <ActivityLog initial={activityLog} />
      </Box>

      <BackToTop />
    </Section>
  );
};
