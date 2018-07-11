import styled from "styled-components";
import { Sidebar } from "semantic-ui-react";

export const Pushable = styled(Sidebar.Pushable)`
  height: 100vh;
  border: none;
  box-shadow: none;
  margin-top: 0px;
  border-radius: 0;
  background-image: ${props => `url(${props.background})`};
  background-size: 100% 100%;
`;
