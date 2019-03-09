import styled from "styled-components";
import { baseColors } from "../../theme";

export const RepoWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0.5em;

  > div:first-child {
    font-size: 18pt;
    color: ${baseColors.heading};
  }

  > div:nth-child(2) {
    font-size: 14pt;
    color: ${baseColors.subheading};
  }
`;
