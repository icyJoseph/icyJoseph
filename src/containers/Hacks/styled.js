import styled from "styled-components";
import { baseColors } from "../../theme";

export const ReposWrap = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 1em 0.5em;
  padding: 0.25em 0.5em;
  list-style: none;
  width: 33.33%;
`;

export const FilterWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const HacksWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 4em;
  width: 90%;
`;

export const PageSelectors = styled.div`
  margin: 0 auto;
  text-align: center;
`;

PageSelectors.Button = styled.button`
  color: ${({ selected }) => (selected ? baseColors.warning : baseColors.info)};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  font-weight: ${({ selected }) => (selected ? "bold" : "unset")};
  background: transparent;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "unset" : "pointer")};
  font-size: 1.5em;
  transition: opacity 1s ease;
`;

PageSelectors.Message = styled.span`
  display: block;
  color: ${baseColors.warning};
  font-weight: bold;
  text-align: center;
  margin: 0.25em;
`;
