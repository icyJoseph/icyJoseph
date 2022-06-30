import { Fragment } from "react";

import { Measurement } from "design-system/Measurement";
import { Table, Th, Td, Tr } from "design-system/Table";
import { Text } from "design-system/Text";
import { exists } from "functional";

export const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const isBaseActivity = (
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

const Body = ({ activity }: { activity: IcyJoseph.Activities }) => {
  if (isSwimming(activity)) {
    return (
      <>
        <Measurement value={activity.distance} unit="km" />

        <Measurement
          value={exists(activity.pace) ? (activity.pace / 60).toFixed(1) : "-"}
          unit="min/km"
        />
      </>
    );
  }

  if (isBaseActivity(activity)) {
    return (
      <>
        <Measurement value={activity.steps} unit="steps" />
        <Measurement value={activity.averageHeartRate} unit="bpm" />
      </>
    );
  }

  return <Measurement value={activity.averageHeartRate} unit="bpm" />;
};

type ActivityLogProps = {
  activities: IcyJoseph.ActivityLog;
};

export const ActivityLog = ({ activities }: ActivityLogProps) => {
  return (
    <Fragment>
      <Table my={3}>
        <thead>
          <Tr>
            <Th />

            <Th colSpan={2}>
              <Text $textAlign="left" $fontSize="2rem" $fontWeight={100}>
                Activities
              </Text>
            </Th>
          </Tr>
        </thead>

        <tbody>
          {activities.map((activity) => (
            <Tr key={activity.logId}>
              <Td />
              <Td>
                <Text $textAlign="left" $fontSize="2rem" $fontWeight={300}>
                  {activity.activityName}
                </Text>
                <Text $textAlign="left" $fontWeight={300}>
                  <Text
                    as="time"
                    dateTime={activity.startTime}
                    $fontWeight={300}
                  >
                    {formatter.format(new Date(activity.startTime))}
                  </Text>
                </Text>
              </Td>

              <Td>
                <Measurement
                  value={(activity.activeDuration / (60 * 1000)).toFixed(1)}
                  unit="min"
                />

                <Measurement value={activity.calories} unit="Cals" />

                <Body activity={activity} />
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};
