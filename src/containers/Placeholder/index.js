import React from "react";
import styled from "styled-components";

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ situation }) => <Centered>{situation}</Centered>;
