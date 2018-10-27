import { css, keyframes } from "styled-components";

export const rotate = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(270deg);
    }
  `;

export const SmallDash = keyframes`
    0% {
      stroke-dashoffset: 100;
    }
    50% {
      stroke-dashoffset: 50;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 100;
      transform: rotate(450deg);
    }
  `;

export const MediumDash = keyframes` 
    0% {
      stroke-dashoffset: 150;
    }
    50% {
      stroke-dashoffset: 50;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 150;
      transform: rotate(450deg);
    }

`;

export const LargeDash = keyframes` 
    0% {
      stroke-dashoffset: 200;
    }
    50% {
      stroke-dashoffset: 50;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 200;
      transform: rotate(450deg);
    }
  `;

export const SmallSpinnerPath = css`
  stroke-dasharray: 100;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${SmallDash} 1.3s ease-in-out infinite;
`;

export const MediumSpinnerPath = css`
  stroke-dasharray: 150;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${MediumDash} 1.3s ease-in-out infinite;
`;

export const LargeSpinnerPath = css`
  stroke-dasharray: 200;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${LargeDash} 1.3s ease-in-out infinite;
`;
