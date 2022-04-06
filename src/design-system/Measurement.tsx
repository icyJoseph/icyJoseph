import type { FC } from "react";

import styled from "styled-components";

import { Text } from "design-system/Text";

const BaseEntry = styled(Text)`
  white-space: nowrap;

  &:not(:last-child):after {
    content: "\\A";
    white-space: pre-wrap;
  }

  @media (min-width: 768px) {
    &:not(:last-child):after {
      content: " / ";
      font-weight: bolder;
      font-size: 3rem;
      color: var(--lightBlue);
    }
  }
`;

const BaseUnit = styled(Text)`
  display: inline-block;
  min-width: 6ch;
  text-align: left;

  @media (min-width: 768px) {
    display: inline;
  }
`;

const BaseValue = styled(Text)`
  && {
    font-variant-numeric: oldstyle-nums;
    font-size: 2rem;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }
`;

export const Unit: FC<{ unit: string; className?: string }> = ({
  unit,
  className,
}) => (
  <BaseUnit as="span" $fontWeight={300} className={className}>
    {unit}
  </BaseUnit>
);

export const Value: FC<{ value: number | string; className?: string }> = ({
  value,
  className,
}) => (
  <BaseValue as="span" $fontWeight={300} className={className}>
    {value ?? "-"}
  </BaseValue>
);

export type MeasurementProps = {
  value: number | string;
  unit: string;
  renderAs?: Extract<keyof JSX.IntrinsicElements, "span" | "p">;
};

const defaultRenderAs = "span";

export const Measurement = ({
  value,
  unit,
  renderAs = defaultRenderAs,
}: MeasurementProps) => (
  <BaseEntry as={renderAs}>
    <Value value={value} /> <Unit unit={unit} />
  </BaseEntry>
);
