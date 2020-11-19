import { useState } from "react";
import styled from "styled-components";
import { space } from "@styled-system/space";

import { Box } from "components/Box";
import { Emoji } from "components/Emoji";
import { Text } from "components/Text";
import {
  Table,
  Th,
  Td,
  Tr,
  Tdate,
  LegendList,
  LegendItem,
  Details
} from "components/Table";
import { Select } from "components/Select";

import { useFitbitActivityLog } from "hooks/useFitbit";
import { exists } from "functional";

const YEAR = new Date().getFullYear();

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric"
});

const SelectBox = styled(Box)`
  text-align: center;
`;

const Label = styled.label`
  ${space};
  font-size: 2rem;
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
    case "All":
      return (
        <>
          <Th>
            <Emoji symbol="📏" title="Distance" ariaLabel="Distance" />{" "}
            <span>(km)</span>
          </Th>
          <Th>
            <Emoji symbol="⏱️" title="Pace" ariaLabel="Pace" />{" "}
            <span>(min/km)</span>
          </Th>
          <Th>
            <Emoji symbol="🥾" title="Steps" ariaLabel="Steps" />{" "}
            <span>steps</span>
          </Th>
          <Th>
            <Emoji
              symbol="💓"
              title="Average Heart Rate"
              ariaLabel="Average Heart Rate"
            />{" "}
            <span>(bpm)</span>
          </Th>
        </>
      );
    case "Swim":
      return (
        <>
          <Th desktop>
            <Emoji symbol="💨" title="Speed" ariaLabel="Speed" />{" "}
            <span>(km/h)</span>
          </Th>
          <Th>
            <Emoji symbol="📏" title="Distance" ariaLabel="Distance" />{" "}
            <span>(km)</span>
          </Th>
          <Th desktop>Swim Lengths</Th>
          <Th desktop>
            Pool Size <span>(m)</span>
          </Th>
          <Th>
            <Emoji symbol="⏱️" title="Pace" ariaLabel="Pace" />{" "}
            <span>(min/km)</span>
          </Th>
        </>
      );
    case "Walk":
    case "Sport":
    case "Run":
    case "Aerobic Workout":
      return (
        <>
          <Th>
            <Emoji symbol="🥾" title="Steps" ariaLabel="Steps" />{" "}
            <span>steps</span>
          </Th>
          <Th>
            <Emoji
              symbol="💓"
              title="Average Heart Rate"
              ariaLabel="Average Heart Rate"
            />{" "}
            <span>(bpm)</span>
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
            <span>(bpm)</span>
          </Th>
        </>
      );
  }
};

const Body = ({ activity = {}, activityType }) => {
  switch (activityType) {
    case "All":
      return (
        <>
          <Td>{activity?.distance ?? "-"}</Td>
          <Td>
            {exists(activity?.pace) ? (activity.pace / 60).toFixed(1) : "-"}
          </Td>
          <Td>{activity?.steps ?? "-"}</Td>
          <Td>{activity?.averageHeartRate ?? "-"}</Td>
        </>
      );

    case "Swim":
      return (
        <>
          <Td desktop>{activity?.speed?.toFixed(2) ?? "-"}</Td>
          <Td>{activity?.distance ?? "-"}</Td>
          <Td desktop>{activity?.swimLengths ?? "-"}</Td>
          <Td desktop>{activity?.poolLength ?? "-"}</Td>
          <Td>
            {exists(activity?.pace) ? (activity.pace / 60).toFixed(1) : "-"}
          </Td>
        </>
      );
    case "Walk":
    case "Sport":
    case "Run":
    case "Aerobic Workout":
      return (
        <>
          <Td>{activity?.steps ?? "-"}</Td>
          <Td>{activity?.averageHeartRate ?? "-"}</Td>
        </>
      );
    case "Outdoor Bike":
    default:
      return (
        <>
          <Td>{activity?.averageHeartRate ?? "-"}</Td>
        </>
      );
  }
};

const EmojiLegend = () => (
  <Details>
    <summary>Legend</summary>
    <LegendList px={2} py={3}>
      <LegendItem>
        <Emoji symbol="⌚" title="Duration" ariaLabel="Duration" />
        <span>Duration</span>
      </LegendItem>
      <LegendItem>
        <Emoji symbol="🔥" title="Calories" ariaLabel="Calories" />
        <span>Calories</span>
      </LegendItem>
      <LegendItem>
        <Emoji symbol="💨" title="Speed" ariaLabel="Speed" />
        <span>Speed</span>
      </LegendItem>
      <LegendItem>
        <Emoji symbol="📏" title="Distance" ariaLabel="Distance" />
        <span>Distance</span>
      </LegendItem>
      <LegendItem>
        <Emoji symbol="⏱️" title="Pace" ariaLabel="Pace" />
        <span>Pace</span>
      </LegendItem>
      <LegendItem>
        <Emoji
          symbol="💓"
          title="Average Heart Rate"
          ariaLabel="Average Heart Rate"
        />
        <span>Average Heart Rate</span>
      </LegendItem>
      <LegendItem>
        <Emoji symbol="📆" title="Event Date" ariaLabel="Event Date" />
        <span>Event Date</span>
      </LegendItem>
      <LegendItem>
        <Emoji symbol="🥾" title="Steps" ariaLabel="Steps" />
        <span>Steps</span>
      </LegendItem>
    </LegendList>
  </Details>
);

export const ActivityLog = ({ initial }) => {
  const { data, error } = useFitbitActivityLog(YEAR, initial);

  const activityLog = data ?? [];

  const isLoading = !data && !error;

  const activityNames = [
    ...new Set(activityLog.map(({ activityName }) => activityName))
  ];

  const [selected, setSelected] = useState("All");

  const selectedActivities = activityLog.filter(({ activityName }) => {
    if (selected === "All") return true;
    return activityName === selected;
  });

  return (
    <>
      <SelectBox mx="auto" mt={4} mb={2}>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <Text as="h6" fontSize="1.8rem" textAlign="start">
              Activities done in {YEAR}
            </Text>

            <fieldset>
              <Select
                id="activity-selector"
                name="activities"
                value={selected}
                onChange={(e) => {
                  if (e.target.value) {
                    setSelected(e.target.value);
                  }
                }}
                mt={2}
              >
                <option value="All">All</option>
                {activityNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
              <Label htmlFor="activity-selector" ml={2}>
                {selected && <EmojiMap activity={selected} />}
              </Label>
            </fieldset>
          </>
        )}
      </SelectBox>
      {selected && (
        <Table>
          <caption>
            <Text as="p" fontSize="1rem" textAlign="center" my={2}>
              Automatically logged by Tracker
            </Text>
            <EmojiLegend />
          </caption>

          <thead>
            <Tr>
              <Th desktop></Th>
              {selected === "All" && <Th></Th>}
              <Th>
                <Emoji symbol="⌚" title="Duration" ariaLabel="Duration" />{" "}
                <span>(min)</span>
              </Th>
              <Th>
                <Emoji symbol="🔥" title="Calories" ariaLabel="Calories" />{" "}
                <span>(Cal)</span>
              </Th>
              <Headers activityType={selected} />
              <Th>
                <Emoji symbol="📆" title="Event Date" ariaLabel="Event Date" />
              </Th>
              <Th desktop></Th>
            </Tr>
          </thead>

          <tbody>
            {selectedActivities.map((activity) => (
              <Tr key={activity.logId}>
                <Td desktop></Td>
                {selected === "All" && (
                  <Td>
                    <EmojiMap activity={activity.activityName} />
                  </Td>
                )}
                <Td>{(activity.activeDuration / (60 * 1000)).toFixed(1)}</Td>
                <Td>{activity.calories}</Td>
                <Body activityType={selected} activity={activity} />
                <Tdate>{formatter.format(new Date(activity.startTime))}</Tdate>
                <Td desktop></Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
