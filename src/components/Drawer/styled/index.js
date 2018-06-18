import styled from "styled-components";
import { Sidebar } from "semantic-ui-react";

export const SideBarWrapper = styled(Sidebar)`
  height: calc(100vh - 100px) !important;
  background: ${props => props.background || "#FFFFF0"};
`;
