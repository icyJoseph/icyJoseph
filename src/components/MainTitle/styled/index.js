import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  min-height: 90px;
  padding: 0 20px;
`;
