import { alignBox } from "@nivo/core";
import { timeFormat } from "d3-time-format";
import { timeDays, timeWeeks } from "d3-time";

const computeCellSize = ({ width, height, maxWeeks }) => {
  const hCellSize = width / 7;
  const vCellSize = height / maxWeeks;

  return Math.min(hCellSize, vCellSize);
};

const cellPosition = (cellSize, originX, originY, date, weekIndex) => {
  const offset = 20;
  return {
    x: originX + date.getDay() * cellSize,
    y: originY + weekIndex * cellSize + offset
  };
};

const dayFormat = timeFormat("%Y-%m-%d");

export const computeLayout = ({ width, height, from, to, align }) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (Math.abs(fromDate.getMonth() - toDate.getMonth()) > 12) {
    throw new Error("Period is greater than 12 months");
  }

  const maxWeeks = timeWeeks(fromDate, toDate).length + 3;

  const cellSize = computeCellSize({
    width,
    height,
    maxWeeks
  });

  const calendarWidth = 7 * cellSize;
  const calendarHeight = maxWeeks * cellSize;

  const [originX, originY] = alignBox(
    {
      x: 0,
      y: 0,
      width: calendarWidth,
      height: calendarHeight
    },
    {
      x: 0,
      y: 0,
      width,
      height
    },
    align
  );

  const days = timeDays(fromDate, toDate).map((dayDate) => {
    const weekIndex = timeWeeks(fromDate, dayDate).length;

    return {
      date: dayDate,
      day: dayFormat(dayDate),
      size: cellSize,
      ...cellPosition(
        cellSize,
        originX,
        originY,
        dayDate,
        dayDate.getDay() === 0 ? weekIndex + 1 : weekIndex
      )
    };
  });

  return {
    days,
    cellSize,
    calendarWidth,
    calendarHeight,
    originX,
    originY
  };
};
