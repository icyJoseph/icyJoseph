import { useState, useRef, useEffect, Fragment } from "react";

import { Button } from "design-system/Button";
import { Flex } from "design-system/Flex";
import { Measurement } from "design-system/Measurement";
import { Table, Th, Td, Tr } from "design-system/Table";
import { Text } from "design-system/Text";

import { head, exists } from "functional";

import { isoStringWithoutMs } from "helpers";

import { useFitbitActivityLog } from "hooks/useFitbit";
import { useLastNonNullableValue } from "hooks/useLastNonNullableValue";
import { useLoader } from "hooks/useLoader";
import { Stale } from "design-system/Stale";

export const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric"
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
  initial: IcyJoseph.ActivityLog;
  onDateChange?: (data: string) => void;
};

const beforeDateQueue = (initial: string) => {
  const set = new Set(initial);
  const arr = [initial];

  return {
    add: (date: string) => {
      if (set.has(date)) {
        return;
      }
      set.add(date);
      arr.push(date);
    },
    get: (index: number) => arr[index]
  };
};

const useDateQueue = (seed: string, onChange?: (date: string) => void) => {
  const [cursor, setCursor] = useState(0);

  const queue = useRef(beforeDateQueue(isoStringWithoutMs(seed)));

  const currentDate = queue.current.get(cursor);
  const prevCurrentDate = useRef(currentDate);

  const prevAction = () => {
    setCursor((prev) => (prev === 0 ? prev : prev - 1));
  };

  const nextAction = (next: string) => {
    queue.current.add(next);
    setCursor((prev) => prev + 1);
  };

  useEffect(() => {
    if (prevCurrentDate.current !== currentDate) {
      onChange?.(currentDate);
    }
    prevCurrentDate.current = currentDate;
  }, [currentDate, onChange]);

  return [currentDate, prevAction, nextAction] as const;
};

const noop = () => void 0;

export const ActivityLog = ({
  initial,
  onDateChange = noop
}: ActivityLogProps) => {
  const { startTime: initialStartTime } = head(initial);
  const [currentDate, prevAction, nextAction] = useDateQueue(
    initialStartTime,
    onDateChange
  );

  const { data, error } = useFitbitActivityLog(currentDate, initial);
  const prev = useLastNonNullableValue(data) ?? [];
  const activityLog = data ?? prev;
  const stale = !error && !data;

  useLoader(data, error);

  const [last] = activityLog.slice(-1);

  return (
    <Fragment>
      <Stale $stale={stale}>
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
            {activityLog.map((activity) => (
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
      </Stale>

      <Flex justifyContent="space-around">
        <Button
          variant="primary"
          disabled={currentDate === isoStringWithoutMs(initialStartTime)}
          onClick={prevAction}
        >
          Back
        </Button>

        <Button
          disabled={stale}
          variant="primary"
          onClick={() => nextAction(isoStringWithoutMs(last?.startTime))}
        >
          More
        </Button>
      </Flex>
    </Fragment>
  );
};
