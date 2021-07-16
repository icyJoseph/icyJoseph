import { FC, useState, useRef } from "react";
import styled from "styled-components";

import { Button } from "components/Button";
import { Flex } from "components/Flex";
import { Text } from "components/Text";
import { Table, Th, Td, Tr } from "components/Table";

import { useFitbitActivityLog } from "hooks/useFitbit";
import { useLastNonNullableValue } from "hooks/useLastNonNullableValue";

import { head, exists } from "functional";
import { isoStringWithoutMs } from "helpers";
import { useEffect } from "react";

export const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric"
});

const BaseEntry = styled(Text)`
  white-space: nowrap;
  color: var(--blue);

  &:not(:last-child):after {
    content: "\\A";
    white-space: pre-wrap;
  }

  @media (min-width: 768px) {
    &:not(:last-child):after {
      content: " / ";
      font-weight: bolder;
      font-size: 3rem;
    }
  }
`;

const BaseUnit = styled(Text)`
  display: inline-block;
  min-width: 6ch;
  text-align: left;

  @media (min-width: 768px) {
    display: inline;
  }
`;

const BaseValue = styled(Text)`
  font-variant-numeric: oldstyle-nums;
  font-size: 2rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Unit: FC<{ unit: string }> = ({ unit }) => (
  <BaseUnit as="span" fontWeight="lighter">
    {unit}
  </BaseUnit>
);

const Value: FC<{ value: number | string }> = ({ value }) => (
  <BaseValue as="span" fontWeight="lighter">
    {value ?? "-"}
  </BaseValue>
);

const Entry: FC<{ value: number | string; unit: string }> = ({
  value,
  unit
}) => (
  <BaseEntry as="span">
    <Value value={value} /> <Unit unit={unit} />
  </BaseEntry>
);

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

const Body: FC<{ activity: IcyJoseph.Activities }> = ({ activity }) => {
  if (isSwimming(activity)) {
    return (
      <>
        <Entry value={activity.distance} unit="km" />

        <Entry
          value={exists(activity.pace) ? (activity.pace / 60).toFixed(1) : "-"}
          unit="min/km"
        />
      </>
    );
  }

  if (isBaseActivity(activity)) {
    return (
      <>
        <Entry value={activity.steps} unit="steps" />
        <Entry value={activity.averageHeartRate} unit="bpm" />
      </>
    );
  }

  return <Entry value={activity.averageHeartRate} unit="bpm" />;
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
  }, [currentDate]);

  return [currentDate, prevAction, nextAction] as const;
};

export const ActivityLog: FC<ActivityLogProps> = ({
  initial,
  onDateChange = () => {}
}) => {
  const { startTime: initialStartTime } = head(initial);
  const [currentDate, prevAction, nextAction] = useDateQueue(
    initialStartTime,
    onDateChange
  );

  const { data, error } = useFitbitActivityLog(currentDate, initial);
  const prev = useLastNonNullableValue(data) ?? [];
  const activityLog = data ?? prev;
  const stale = !error && !data;

  const [last] = activityLog.slice(-1);

  return (
    <>
      <Table my={3} stale={stale}>
        <thead>
          <Tr>
            <Th></Th>

            <Th colSpan={2}>
              <Text textAlign="left" fontSize="2rem" fontWeight={100}>
                Activities
              </Text>
            </Th>
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
                <Entry
                  value={(activity.activeDuration / (60 * 1000)).toFixed(1)}
                  unit="min"
                />

                <Entry value={activity.calories} unit="Cals" />

                <Body activity={activity} />
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <Flex justifyContent="space-around">
        <Button
          variant="primary"
          disabled={currentDate === isoStringWithoutMs(initialStartTime)}
          onClick={prevAction}
        >
          Back
        </Button>

        <Button
          variant="primary"
          onClick={() => nextAction(isoStringWithoutMs(last?.startTime))}
        >
          More
        </Button>
      </Flex>
    </>
  );
};
