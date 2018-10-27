import styled, { css } from "styled-components";
import { DockWrap } from "../../Dock/styled";

export const FeaturedWrap = styled(DockWrap)`
  width: 50%;
  margin-top: 20px;
`;

export const FeaturedApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 200px;
  margin: 5px;
`;

const base = css`
  display: flex;
  justify-content: center;
  color: white;
`;

export const ImageWrap = styled.div`
  ${base} margin: 2px;
`;

export const ContentWrap = styled.div`
  ${base};
`;

export const FeaturedLink = styled.a`
  text-decoration: none;
  color: white;
`;
