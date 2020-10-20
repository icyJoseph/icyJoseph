import React, { memo, useMemo } from "react";
import styled from "styled-components";
import { space } from "@styled-system/space";

import {
  SvgWrapper,
  useTheme,
  useDimensions,
  withContainer,
  useValueFormatter,
  ResponsiveWrapper
} from "@nivo/core";

import { BoxLegendSvg } from "@nivo/legends";

import { useColorScale, CalendarDefaultProps } from "@nivo/calendar";
import { CalendarDay } from "components/CalendarDay";

import { computeLayout } from "utils/compute";

const bindDaysData = ({ days, data, colorScale, emptyColor }) => {
  const cache = new Map();

  data.forEach((entry) => {
    cache.set(entry.day, entry);
  });

  return days.map(({ day, ...rest }) => {
    if (cache.has(day)) {
      const dayData = cache.get(day);
      return {
        ...rest,
        day,
        value: dayData.value,
        color: colorScale(dayData.value),
        data: dayData
      };
    }

    return { ...rest, day, color: emptyColor };
  });
};

const useDays = ({ days, data, colorScale, emptyColor }) =>
  useMemo(
    () =>
      bindDaysData({
        days,
        data,
        colorScale,
        emptyColor
      }),
    [days, data, colorScale, emptyColor]
  );

const useCalendarLayout = ({ width, height, from, to, align }) =>
  useMemo(
    () =>
      computeLayout({
        width,
        height,
        from,
        to,
        align
      }),
    [width, height, from, to, align]
  );

const BaseCalendarMonthLegends = ({ from, to, x, y, rotation = 0, theme }) => {
  const fmt = new Intl.DateTimeFormat("sv-SE");

  return (
    <text
      transform={`translate(${x},${y}) rotate(${rotation})`}
      textAnchor="middle"
      style={{ ...theme.labels.text, fontSize: 14, fontFamily: "Recursive" }}
    >
      {fmt.format(new Date(from))} - {fmt.format(new Date(to))}
    </text>
  );
};

const CalendarMonthLegends = memo(BaseCalendarMonthLegends);

const BaseCalendar = ({
  margin: partialMargin,
  width,
  height,

  align,
  colors,
  colorScale,
  data,
  emptyColor,
  from,
  to,
  minValue,
  maxValue,
  valueFormat,
  legendFormat,

  daySpacing,
  dayBorderColor,
  dayBorderWidth,

  tooltip,

  legends
}) => {
  const theme = useTheme();

  const {
    margin,
    innerWidth,
    innerHeight,
    outerWidth,
    outerHeight
  } = useDimensions(width, height, partialMargin);

  const {
    days,
    originX,
    originY,
    calendarWidth,
    calendarHeight
  } = useCalendarLayout({
    width: innerWidth,
    height: innerHeight,
    from,
    to,
    align
  });

  const colorScaleFn = useColorScale({
    data,
    minValue,
    maxValue,
    colors,
    colorScale
  });

  const dataDays = useDays({
    days,
    data,
    colorScale: colorScaleFn,
    emptyColor
  });

  const formatLegend = useValueFormatter(legendFormat);
  const formatValue = useValueFormatter(valueFormat);

  return (
    <SvgWrapper
      width={outerWidth}
      height={outerHeight}
      margin={margin}
      theme={theme}
    >
      {dataDays.map(({ data, date, x, y, size, color }) => (
        <CalendarDay
          key={date.toString()}
          data={data}
          x={x}
          y={y}
          size={size}
          spacing={daySpacing}
          borderColor={dayBorderColor}
          borderWidth={dayBorderWidth}
          Tooltip={tooltip}
          color={color}
          theme={theme}
          formatValue={formatValue}
        />
      ))}

      <CalendarMonthLegends
        x={originX + calendarWidth / 2}
        y={originY + calendarHeight / 20}
        from={from}
        to={to}
        theme={theme}
      />

      {legends.map((legend, i) => {
        const legendData = colorScaleFn
          .ticks(legend.itemCount)
          .map((value) => ({
            id: value,
            label: formatLegend(value),
            color: colorScaleFn(value)
          }));

        return (
          <BoxLegendSvg
            key={i}
            {...legend}
            containerWidth={width}
            containerHeight={height}
            data={legendData}
          />
        );
      })}
    </SvgWrapper>
  );
};

BaseCalendar.defaultProps = CalendarDefaultProps;

const SimpleCalendar = withContainer(BaseCalendar);

const pipeData = (raw) => {
  const data = raw.map(({ dateTime: day, value }) => ({
    day,
    value: value?.restingHeartRate ?? 0
  }));

  const [{ day: from, value: init }] = data;
  const [{ day: to }] = data.slice(-1);

  const [minValue, maxValue] = data
    .slice(1)
    .filter(({ value }) => value > 0)
    .reduce(
      ([prevMin, prevMax], { value }) => [
        Math.min(prevMin, value),
        Math.max(prevMax, value)
      ],
      [init, init]
    );
  return { data, from, to, minValue, maxValue };
};

const ChartContainer = styled.div`
  ${space({ my: 3, mx: "auto" })};
  height: 33.33vh;
  width: 66.66%;
  text-align: center;
`;

export const Calendar = ({ data }) => (
  <ChartContainer>
    <ResponsiveWrapper>
      {(responsiveProps) => (
        <SimpleCalendar
          {...responsiveProps}
          {...pipeData(data)}
          emptyColor="#eeeeee"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              fontFamily: "Recursive",
              anchor: "bottom",
              direction: "row",
              translateY: 0,
              itemCount: 2,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left"
            }
          ]}
        />
      )}
    </ResponsiveWrapper>
  </ChartContainer>
);
