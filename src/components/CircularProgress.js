import styled from "styled-components";

const Progress = styled.div`
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
`;

Progress.Svg = styled.svg`
  transform: rotate(-90deg);
  fill: none;
  stroke-linecap: round;
`;

Progress.Circle = styled.circle`
  stroke: var(--dark);
`;

Progress.CircleFill = styled.circle`
  stroke: var(--smokeyWhite);
`;

Progress.Overlay = styled.div`
  margin: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

Progress.Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const CircularProgress = ({ percentage, size = 150, children }) => {
  const center = size / 2;
  const strokeWidth = size * 0.05;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = ((100 - percentage) / 100) * circumference;

  const style = {
    strokeDashoffset: offset
  };

  return (
    <Progress>
      <Progress.Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Progress.Circle
          className="circle-background"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Progress.CircleFill
          style={style}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
        />
      </Progress.Svg>
      <Progress.Overlay>
        <Progress.Content>
          <>{children}</>
        </Progress.Content>
      </Progress.Overlay>
    </Progress>
  );
};
