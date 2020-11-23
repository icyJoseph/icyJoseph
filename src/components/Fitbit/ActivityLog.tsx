import { FC } from "react";
import styled from "styled-components";

import { Text } from "components/Text";
import { Table, Th, Td, Tr } from "components/Table";

import { useFitbitActivityLog } from "hooks/useFitbit";
import { exists } from "functional";

const YEAR = new Date().getFullYear();

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric"
});

const StyledUnit = styled(Text)`
  &:not(:last-child):after {
    content: " / ";
    font-weight: bolder;
  }
`;

const Unit: FC<{ unit: string }> = ({ unit }) => (
  <StyledUnit as="span" fontWeight="lighter">
    {unit}
  </StyledUnit>
);

const Value: FC<{ value: number | string }> = ({ value }) => (
  <Text as="span" fontWeight="lighter" fontSize="2rem">
    {value ?? "-"}
  </Text>
);

const isBaseActivity = <T extends IcyJoseph.Activities>(
  activity: IcyJoseph.Activities
): activity is IcyJoseph.BaseActivity => {
  switch (activity.activityName) {
    case "Walk":
    case "Sport":
    case "Run":
    case "Aerobic Workout":
      return true;

    default:
      return false;
  }
};

const isSwimming = (act: IcyJoseph.Activities): act is IcyJoseph.SwimActivity =>
  act.activityName === "Swim";

const Body: FC<{ activity: IcyJoseph.Activities }> = ({ activity }) => {
  if (isSwimming(activity)) {
    return (
      <>
        <Value value={activity.distance} /> <Unit unit="km" />
        <Value
          value={exists(activity.pace) ? (activity.pace / 60).toFixed(1) : "-"}
        />{" "}
        <Unit unit="min/km" />
      </>
    );
  }

  if (isBaseActivity(activity)) {
    return (
      <>
        <Value value={activity.steps} /> <Unit unit="steps" />
        <Value value={activity.averageHeartRate} /> <Unit unit="bpm" />
      </>
    );
  }

  return (
    <>
      <Value value={activity.averageHeartRate} /> <Unit unit="bpm" />
    </>
  );
};

type ActivityLogProps = {
  initial: IcyJoseph.ActivityLog;
};

export const ActivityLog: FC<ActivityLogProps> = ({ initial }) => {
  const { data } = useFitbitActivityLog(YEAR, initial);

  const activityLog = data ?? [];

  return (
    <>
      <Table my={3}>
        <thead>
          <Tr>
            <Th></Th>

            <Th>
              <Text textAlign="left" fontSize="2rem" fontWeight={100}>
                Activity during {YEAR}
              </Text>
            </Th>

            <Th></Th>
            <Th></Th>
          </Tr>
        </thead>

        <tbody>
          {activityLog.map((activity) => (
            <Tr key={activity.logId}>
              <Td></Td>
              <Td>
                <Text textAlign="left" fontSize="2rem" fontWeight="lighter">
                  {activity.activityName}
                </Text>
                <Text textAlign="left" fontWeight="lighter">
                  <Text
                    as="time"
                    dateTime={activity.startTime}
                    fontWeight="lighter"
                  >
                    {formatter.format(new Date(activity.startTime))}
                  </Text>
                </Text>
              </Td>

              <Td>
                <Value
                  value={(activity.activeDuration / (60 * 1000)).toFixed(1)}
                />{" "}
                <Unit unit="min" />
                <Value value={activity.calories} /> <Unit unit="Cals" />
                <Body activity={activity} />
              </Td>
              <Td></Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
