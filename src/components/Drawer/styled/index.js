import styled from "styled-components";
import { Sidebar } from "semantic-ui-react";

export const SideBarWrapper = styled(Sidebar).attrs({
  style: ({ background = "#FFFFF0" }) => ({
    background
  })
})`
  height: calc(100vh - 100px) !important;
`;
