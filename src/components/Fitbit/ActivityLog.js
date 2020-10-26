import { useState } from "react";
import styled, { css } from "styled-components";
import { space } from "@styled-system/space";

import { Box } from "components/Box";
import { Emoji } from "components/Emoji";
import { Flex } from "components/Flex";
import { Text } from "components/Text";

import { useFitbitActivityLog } from "hooks/useFitbit";
import { exists } from "functional";

const YEAR = new Date().getFullYear();

const SelectBox = styled(Box)`
  text-align: center;
`;

const Label = styled.label`
  ${space};
  font-size: 2rem;
`;

const Select = styled.select`
  ${space};
  ${space({ pr: 3 })};
  font-size: 2rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--dark);
  color: var(--softDark);
  outline-offset: 8px;
  outline-color: var(--softDark);
  text-align: center;
  text-align-last: center;
  background-image: url("data:image/svg+xml,<svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'><path d='m0,6l12,12l12,-12l-24,0z'/><path fill='none' d='m0,0l24,0l0,24l-24,0l0,-24z'/></svg>");
  background-repeat: no-repeat;
  background-size: 12px;
  background-position-x: 100%;
  background-position-y: 50%;
  appearance: none;

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
`;

const cellMixin = css`
  overflow: visible;

  ${space({ p: "1.5rem 0.75rem 1.5rem 0" })};
  border-bottom: 1px solid var(--softDark);

  &:empty:first-child,
  &:empty:last-child {
    ${space({ p: "1.5rem 0.75rem" })};
    border-bottom: none;
  }

  display: ${(props) => (props.desktop ? "none" : "table-cell")};

  font-size: 1.15rem;

  @media (min-width: 514px) {
    font-size: 1.25rem;
  }

  @media (min-width: 768px) {
    font-size: inherit;
  }

  @media (min-width: 1024px) {
    display: table-cell;
  }
`;

const Th = styled.th`
  text-align: center;

  ${cellMixin};

  > span:nth-child(2) {
    display: none;
  }

  @media (min-width: 768px) {
    > span:nth-child(2) {
      display: inline;
    }
  }
`;

const Td = styled.td`
  text-align: center;

  ${cellMixin};
`;

const Tdate = styled(Td)`
  font-size: 1.15rem;
  width: 120px;

  @media (min-width: 768px) {
    font-size: inherit;
    width: 200px;
  }
`;

const Tr = styled.tr`
  &:last-child > td {
    border-bottom: none;
  }
`;

const Details = styled.details`
  display: inline-block;

  color: white;

  width: 33%;
  min-width: 225px;
  max-width: 300px;

  position: relative;
  background: var(--softDark);
  line-height: 1.5;

  > summary {
    cursor: pointer;
    outline-offset: 4px;
    outline-color: var(--softDark);
  }

  > ul {
    position: absolute;
  }

  > * {
    cursor: default;
  }
`;

const LegendList = styled.ul`
  ${space};
  background: var(--softDark);
  width: 100%;
  opacity: 0.9;
`;

const LegendItem = styled.li`
  display: grid;
  grid-template-columns: 33.33% 1fr;
  grid-column-gap: 8px;

  & > span:first-child {
    text-align: end;
  }

  & > span:last-child {
    text-align: start;
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

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric"
});

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

const TableWithControls = styled(Flex)`
  > table {
    order: 1;
  }
`;

const Pagination = styled.div`
  ${space({ mx: "auto" })};
  text-align: center;

  max-width: 300px;
  overflow-wrap: break-word;
  order: 0;

  @media (min-width: 768px) {
    order: 2;
    max-width: 528px;
  }
`;

Pagination.Control = styled(({ active: _omit, disabled: __omit, ...rest }) => (
  <span {...rest} />
))`
  ${space({ m: 2 })};
  display: inline-block;
  cursor: pointer;
  text-decoration: underline;
  color: ${(props) => (props.active ? "var(--green)" : "var(--dark)")};
  visibility: ${(props) => (props.disabled ? "hidden" : "unset")};
`;

const pageSize = 7;

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

  const selectedActivities = activityLog.filter(({ activityName }) => {
    if (selected === "All") return true;
    return activityName === selected;
  });

  const numberOfPages = Math.ceil(selectedActivities.length / pageSize);

  const tableSize = pageSize;

  const currentTable = selectedActivities.slice(
    pagination * pageSize,
    (pagination + 1) * pageSize
  );

  const padding = Array.from(
    { length: tableSize - currentTable.length },
    (_, pad) => pad
  );

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
                    setPagination(0);
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
        <TableWithControls flexDirection="column">
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
                  <Emoji
                    symbol="📆"
                    title="Event Date"
                    ariaLabel="Event Date"
                  />
                </Th>
                <Th desktop></Th>
              </Tr>
            </thead>

            <tbody>
              {currentTable.map((activity) => (
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
                  <Tdate>
                    {formatter.format(new Date(activity.startTime))}
                  </Tdate>
                  <Td desktop></Td>
                </Tr>
              ))}
              {padding.map((pad) => (
                <Tr key={pad}>
                  <Td desktop></Td>
                  {selected === "All" && <Td>-</Td>}
                  <Td>-</Td>
                  <Td>-</Td>
                  <Body activityType={selected} />
                  <Td>-</Td>
                  <Td desktop></Td>
                </Tr>
              ))}
            </tbody>
          </Table>

          <Pagination aria-label="Table Pagination">
            {Array.from(
              { length: Math.ceil(selectedActivities.length / pageSize) },
              (_, num) => (
                <Pagination.Control
                  key={num}
                  active={pagination === num}
                  disabled={numberOfPages === 1}
                  onClick={() => setPagination(num)}
                >
                  {num}
                </Pagination.Control>
              )
            )}
          </Pagination>
        </TableWithControls>
      )}
    </>
  );
};
