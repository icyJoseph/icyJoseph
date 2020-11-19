import styled, { css } from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

const cellMixin = css<{ desktop: boolean }>`
  overflow: visible;

  ${space({ p: "1.5rem 0.75rem 1.5rem 0" })};
  border-bottom: 1px solid var(--softDark);

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

  &:empty:first-child,
  &:empty:last-child {
    ${space({ p: "1.5rem 0.75rem" })};
    border-bottom: none;
  }
`;

export const Th = styled.th`
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

export const Table = styled.table<SpaceProps>`
  ${space};
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
`;

export const Td = styled.td`
  text-align: center;

  ${cellMixin};
`;

export const Tdate = styled(Td)`
  font-size: 1.15rem;
  width: 120px;

  @media (min-width: 768px) {
    font-size: inherit;
    width: 200px;
  }
`;

export const Tr = styled.tr`
  &:last-child > td {
    border-bottom: none;
  }
`;

export const Details = styled.details`
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

export const LegendList = styled.ul<SpaceProps>`
  ${space};
  background: var(--softDark);
  width: 100%;
  opacity: 0.9;
`;

export const LegendItem = styled.li`
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
