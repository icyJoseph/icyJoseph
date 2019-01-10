import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;

  > div:first-child {
    width: 100%;
  }

  > div > div:last-child {
    margin-bottom: 80px;
  }

  @media (max-width: 599px) {
    > div > div:first-child {
      margin-top: 10%;
    }
  }
`;
