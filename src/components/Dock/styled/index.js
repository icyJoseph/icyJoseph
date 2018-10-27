import styled from "styled-components";

export const DockWrap = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  @media (min-width: 1023px) {
    width: 60%;
  }
`;

export const IconWrap = styled.div`
  display: flex;
  min-width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
`;
