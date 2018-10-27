import styled from "styled-components";

export const Background = styled.div.attrs({
  style: ({ background, desktop }) => ({
    background: desktop && `url(${background}) 100% 100% / cover`
  })
})`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: -1;
`;

export const Mask = styled.div.attrs({
  style: ({ desktop, tint = 0.3 }) => ({
    backgroundColor: desktop && `rgba(0,0,0,${tint})`
  })
})`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: -1;
`;

export const Container = styled.div`
  position: absolute;
  top: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 20px;
  @media (max-width: 1023px) {
    padding-bottom: 50px;
  }
`;
