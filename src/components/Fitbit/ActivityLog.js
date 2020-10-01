import { useState } from "react";
import styled, { css } from "styled-components";
import { space } from "@styled-system/space";

import { Box } from "components/Box";
import { Emoji } from "components/Emoji";
import { Flex } from "components/Flex";
import { Text } from "components/Text";

import { useFitbitActivityLog } from "hooks/useFitbit";

const YEAR = new Date().getFullYear();

const SelectBox = styled(Box)`
  text-align: center;
`;

const Label = styled.label`
  ${space};
  display: block;
  font-size: 2rem;
`;

const Select = styled.select`
  ${space};
  font-size: 1.8rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--dark);
  color: var(--softDark);
  outline-offset: 4px;
  outline-color: var(--softDark);

  > option {
    background: var(--smokeyWhite);
  }

  > option:checked {
    background: var(--softDark);
    color: var(--smokeyWhite);
  }
`;

const Table = styled.table`
  ${space};
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;

  @media (min-width: 768px) {
    max-width: 90%;
  }

  @media (min-width: 1280px) {
    max-width: 80%;
  }
`;

const cellMixin = css`
  overflow: visible;
  padding: 1em 0.5em 1em 0;
  border-bottom: 1px solid var(--softDark);

  &:empty:first-child,
  &:empty:last-child {
    padding: 1em 0.5em;
    border-bottom: none;
  }

  display: ${(props) => (props.desktop ? "none" : "table-cell")};

  @media (min-width: 1024px) {
    display: table-cell;
  }
`;

const Th = styled.th`
  text-align: center;

  ${cellMixin};
`;

const Td = styled.td`
  text-align: center;

  ${cellMixin};
`;

const Tr = styled.tr`
  &:last-child > td {
    border-bottom: none;
  }
`;

const Details = styled.details`
  display: inline-block;
  outline-offset: 4px;
  outline-color: var(--softDark);

  > summary {
    cursor: pointer;
  }

  > * {
    cursor: default;
  }
`;

const EmojiMap = ({ activity }) => {
  switch (activity) {
    case "Swim":
      return <Emoji symbol="🏊🏾" title={activity} ariaLabel={activity} />;
    case "Walk":
      return <Emoji symbol="🚶🏾" title={activity} ariaLabel={activity} />;
    case "Sport":
      return <Emoji symbol="🕴🏾" title={activity} ariaLabel={activity} />;
    case "Run":
      return <Emoji symbol="🏃🏾" title={activity} ariaLabel={activity} />;
    case "Aerobic Workout":
      return <Emoji symbol="🤸🏾" title={activity} ariaLabel={activity} />;
    case "Outdoor Bike":
      return <Emoji symbol="🚵🏾" title={activity} ariaLabel={activity} />;
    default:
      return null;
  }
};

const Headers = ({ activityType }) => {
  switch (activityType) {
    case "Swim":
      return (
        <>
          <Th>
            <Emoji symbol="💨" title="Speed" ariaLabel="Speed" /> (km/h)
          </Th>
          <Th>
            <Emoji symbol="📏" title="Distance" ariaLabel="Distance" /> (km)
          </Th>
          <Th desktop>Swim Lengths</Th>
          <Th desktop>Pool Length (m)</Th>
          <Th>
            <Emoji symbol="⏱️" title="Pace" ariaLabel="Pace" /> (min/km)
          </Th>
        </>
      );
    case "Walk":
    case "Sport":
    case "Run":
    case "Aerobic Workout":
      return (
        <>
          <Th>Steps</Th>
          <Th>
            <Emoji
              symbol="💓"
              title="Average Heart Rate"
              ariaLabel="Average Heart Rate"
            />{" "}
            (bpm)
          </Th>
        </>
      );

    case "Outdoor Bike":
    default:
      return (
        <>
          <Th>
            <Emoji
              symbol="💓"
              title="Average Heart Rate"
              ariaLabel="Average Heart Rate"
            />{" "}
            (bpm)
          </Th>
        </>
      );
  }
};

const Body = ({ activity, activityType }) => {
  switch (activityType) {
    case "Swim":
      return (
        <>
          <Td>{activity.speed.toFixed(2)}</Td>
          <Td>{activity.distance}</Td>
          <Td desktop>{activity.swimLengths ?? "N/A"}</Td>
          <Td desktop>{activity.poolLength ?? "N/A"}</Td>
          <Td>{(activity.pace / 60).toFixed(1)}</Td>
        </>
      );
    case "Walk":
    case "Sport":
    case "Run":
    case "Aerobic Workout":
      return (
        <>
          <Td>{activity.steps}</Td>
          <Td>{activity.averageHeartRate}</Td>
        </>
      );
    case "Outdoor Bike":
    default:
      return (
        <>
          <Td>{activity.averageHeartRate ?? "N/A"}</Td>
        </>
      );
  }
};

const EmojiLegend = () => (
  <Details>
    <summary>Legend</summary>
    <ul>
      <li>
        Duration: <Emoji symbol="⌚" title="Duration" ariaLabel="Duration" />
      </li>
      <li>
        Calories: <Emoji symbol="🔥" title="Calories" ariaLabel="Calories" />
      </li>
      <li>
        Speed: <Emoji symbol="💨" title="Speed" ariaLabel="Speed" />
      </li>
      <li>
        Distance: <Emoji symbol="📏" title="Distance" ariaLabel="Distance" />
      </li>
      <li>
        Pace: <Emoji symbol="⏱️" title="Pace" ariaLabel="Pace" />
      </li>
      <li>
        Average Heart Rate:{" "}
        <Emoji
          symbol="💓"
          title="Average Heart Rate"
          ariaLabel="Average Heart Rate"
        />
      </li>
    </ul>
  </Details>
);

export const ActivityLog = ({ initial }) => {
  const { data, error } = useFitbitActivityLog(YEAR, initial);

  const activityLog = data ?? [];

  const isLoading = !data && !error;

  const activityNames = [
    ...new Set(activityLog.map(({ activityName }) => activityName))
  ];

  const [selected, setSelected] = useState(() => {
    const favorite = activityNames.find((activity) => activity === "Swim");
    return favorite ?? "";
  });

  const [pagination, setPagination] = useState(0);

  const page = activityLog
    .filter(({ activityName }) => activityName === selected)
    .slice(pagination * 10, (pagination + 1) * 10);

  return (
    <>
      <SelectBox mx="auto" my={4}>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <Text as="h6" fontSize="1.8rem" textAlign="start">
              Browse through activities done this year
            </Text>
            <Select
              id="activity-selector"
              name="activities"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              mt={2}
            >
              <option value="" disabled>
                Choose one
              </option>
              {activityNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
            <Label htmlFor="activity-selector" mt={4}>
              {selected ? (
                <Text fontSize="inherit">
                  <span>{selected}</span>
                  <EmojiMap activity={selected} />
                </Text>
              ) : (
                "Select an activity"
              )}
            </Label>
          </>
        )}
      </SelectBox>
      {selected && (
        <>
          <Table mx="auto">
            <caption>
              <EmojiLegend />
            </caption>

            <thead>
              <Tr>
                <Th desktop></Th>
                <Th>
                  <Emoji symbol="⌚" title="Duration" ariaLabel="Duration" />{" "}
                  (min)
                </Th>
                <Th>
                  <Emoji symbol="🔥" title="Calories" ariaLabel="Calories" />{" "}
                  (Cal)
                </Th>
                <Headers activityType={selected} />
                <Th desktop>Log type</Th>
                <Th desktop></Th>
              </Tr>
            </thead>
            <tbody>
              {page.map((activity) => (
                <Tr key={activity.logId}>
                  <Td desktop></Td>
                  <Td>{(activity.activeDuration / (60 * 1000)).toFixed(1)}</Td>
                  <Td>{activity.calories}</Td>
                  <Body activityType={selected} activity={activity} />
                  <Td desktop>
                    {activity.logType === "auto_detected" ? "Auto" : "Manual"}
                  </Td>
                  <Td desktop></Td>
                </Tr>
              ))}
            </tbody>
            {/* <caption>{}</caption> */}
          </Table>
        </>
      )}
    </>
  );
};
