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

const Unit = ({ unit }) => (
  <StyledUnit as="span" fontWeight="lighter">
    {unit}
  </StyledUnit>
);

const Value = ({ value }) => (
  <Text as="span" fontWeight="lighter" fontSize="2rem">
    {value ?? "-"}
  </Text>
);

const Body = ({ activity }) => {
  const { activityName } = activity;
  switch (activityName) {
    case "Swim":
      return (
        <>
          <Value value={activity.distance} /> <Unit unit="km" />
          <Value
            value={
              exists(activity?.pace) ? (activity.pace / 60).toFixed(1) : "-"
            }
          />{" "}
          <Unit unit="min/km" />
        </>
      );
    case "Walk":
    case "Sport":
    case "Run":
    case "Aerobic Workout":
      return (
        <>
          <Value value={activity.steps} /> <Unit unit="steps" />
          <Value value={activity.averageHeartRate} /> <Unit unit="bpm" />
        </>
      );
    case "Outdoor Bike":
    default:
      return (
        <>
          <Value value={activity.averageHeartRate} /> <Unit unit="bpm" />
        </>
      );
  }
};

export const ActivityLog = ({ initial }) => {
  const { data } = useFitbitActivityLog(YEAR, initial);

  const activityLog = data ?? [];

  return (
    <>
      <Table my={3}>
        <thead>
          <Tr>
            <Th></Th>

            <Th>
              <Text textAlign="left" fontSize="2rem" fontWeight="100">
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
