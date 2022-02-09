import { ActivityLog } from "components/Fitbit/ActivityLog";
import { Header } from "components/Header";
import { TopBadges } from "components/Fitbit/TopBadges";

import { BackToTop } from "design-system/BackToTop";
import { Box } from "design-system/Box";
import { Flex } from "design-system/Flex";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";

import { useFitbitHR } from "hooks/useFitbit";

type FitbitProps = {
  profile: IcyJoseph.FitbitProfile;
  activityLog: IcyJoseph.ActivityLog;
  initialHR: IcyJoseph.HeartRateActivity;
  name: string;
  row: string;
};

export const Fitbit = ({
  profile,
  activityLog,
  initialHR,
  name,
  row
}: FitbitProps) => {
  const { data } = useFitbitHR(
    { date: "today", period: "1m", revalidateOnMount: true },
    initialHR
  );

  const heartData = data?.["activities-heart"] ?? [];
  const [prevDay = null, today = null] = heartData.slice(-2);

  return (
    <Section $row={row}>
      <Header name={name} title="Fitbit" />

      <Box>
        <Flex mt={2} pb={3} flexDirection="column" gap="2rem">
          <Flex
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
          </Flex>

          <Flex
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
          </Flex>
        </Flex>

        <TopBadges profile={profile} />

        <ActivityLog initial={activityLog} />
      </Box>

      <BackToTop />
    </Section>
  );
};
