import styled from "styled-components";
import { space } from "@styled-system/space";

export const Select = styled.select`
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
