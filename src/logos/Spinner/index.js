import React from "react";
import { SpinnerContainer, SvgContainer, SvgCircle } from "./styled";

const SPINNER_SIZES = {
  small: 30,
  medium: 50,
  large: 70
};

const STROKE_WIDTHS = {
  small: 4,
  medium: 5,
  large: 6
};

// Heavily inspired by https://codepen.io/mrrocks/pen/EiplA
export default function Spinner({ size = "medium" }) {
  const baseSize = SPINNER_SIZES[size];
  const pathSize = baseSize / 2;
  const strokeWidth = STROKE_WIDTHS[size];
  const pathRadius = `${baseSize / 2 - strokeWidth}px`;

  return (
    <SpinnerContainer>
      <SvgContainer
        width={baseSize}
        height={baseSize}
        viewBox={`0 0 ${baseSize} ${baseSize}`}
      >
        <SvgCircle
          size={size}
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
          strokeLinecap="flat"
          cx={pathSize}
          cy={pathSize}
          r={pathRadius}
        />
      </SvgContainer>
    </SpinnerContainer>
  );
}
