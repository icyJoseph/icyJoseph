import { space, SpaceProps } from "@styled-system/space";
import styled, { css } from "styled-components";

const cellMixin = css`
  overflow: visible;

  ${space({ p: "0.75rem 0.375rem 0.75rem 0" })};

  @media (min-width: 768px) {
    ${space({ p: "1.5rem 0.75rem 1.5rem 0" })};
  }

  &:empty:first-child,
  &:empty:last-child {
    ${space({ p: "1.5rem 0.75rem" })};
  }
`;

export const Table = styled.table<SpaceProps>`
  ${space};
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &:last-child {
    border-bottom: none;
  }
`;

export const Th = styled.th`
  text-align: center;

  ${cellMixin};
`;

export const Td = styled.td`
  text-align: right;
  vertical-align: center;

  ${cellMixin};
`;
