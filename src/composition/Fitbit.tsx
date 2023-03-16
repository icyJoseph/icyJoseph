import {
  ActivityLog,
  type ReducedActivityLog,
} from "components/Fitbit/ActivityLog";
import { TopBadges } from "components/Fitbit/TopBadges";
import { Header } from "components/Header";
import { BackToTop } from "design-system/BackToTop";
import { Box } from "design-system/Box";
import { Flex } from "design-system/Flex";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";

type FitbitProps = {
  profile: Pick<IcyJoseph.FitbitProfile, "topBadges" | "averageDailySteps">;
  activityLog: ReducedActivityLog[];
  restingHeartRate:
    | IcyJoseph.HeartRateActivity["activities-heart"][number]["value"]["restingHeartRate"]
    | undefined;
  name: string;
};

export const Fitbit = ({
  profile,
  activityLog,
  restingHeartRate,
  name,
}: FitbitProps) => {
  return (
    <Section style={{ contentVisibility: "auto" }}>
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
              {restingHeartRate ?? "-"}{" "}
              <Text as="span" $fontWeight={300}>
                bpm
              </Text>
            </Text>
          </Flex>
        </Flex>

        <TopBadges badges={profile.topBadges} />

        <ActivityLog activities={activityLog} />
      </Box>

      <BackToTop />
    </Section>
  );
};
