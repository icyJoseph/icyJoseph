/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * Modified by Joseph Chamochumbi
 *
 */
import { memo, useCallback, useMemo } from "react";
import { useTooltip } from "@nivo/tooltip";

const BaseCalendarDay = ({
  data,
  x,
  y,
  size,
  color,
  borderWidth,
  borderColor,
  Tooltip,
  formatValue
}) => {
  const { showTooltipFromEvent, hideTooltip } = useTooltip();

  const handleMouseEnter = useCallback(
    (event) => {
      const formatedData = {
        ...data,
        value: formatValue(data.value),
        data: { ...data.data },
        color
      };
      showTooltipFromEvent(<Tooltip {...formatedData} />, event);
    },
    [showTooltipFromEvent, Tooltip, data, formatValue]
  );

  const handleMouseMove = useCallback(
    (event) => {
      const formatedData = {
        ...data,
        value: formatValue(data.value),
        data: { ...data.data },
        color
      };
      showTooltipFromEvent(<Tooltip {...formatedData} />, event);
    },
    [showTooltipFromEvent, Tooltip, data, formatValue]
  );

  const style = useMemo(
    () => ({ fill: color, strokeWidth: borderWidth, stroke: borderColor }),
    [color, borderWidth, borderColor]
  );

  return (
    <rect
      x={x}
      y={y}
      width={size}
      height={size}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={hideTooltip}
      style={style}
    />
  );
};

export const Calendar = memo(BaseCalendarDay);
