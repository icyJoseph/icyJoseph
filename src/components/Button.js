import styled from "styled-components";
import { space } from "@styled-system/space";

const StyledButton = styled.button`
  ${space};
  ${space({ p: 2 })};
  font-size: ${({ fontSize = "1.6rem" }) => fontSize};
  font-weight: 400;

  width: 100%;
  position: relative;
  display: block;

  border: 0;
  text-transform: uppercase;
  background-color: var(--smokeyWhite);
  cursor: pointer;

  &::before,
  &::after {
    background-color: transparent;
    content: "";
    display: block;
    position: absolute;
    height: calc(50% - 0.4rem);
    width: 100%;
    border: 1px solid var(--softDark);
    left: 0;
  }

  &::before {
    border-bottom: 0;
    top: 0;
  }

  &::after {
    border-top: 0;
    bottom: 0;
  }
`;

StyledButton.Label = styled.div`
  /* LABEL  */
  position: relative;
  overflow: hidden;
  margin: 0;

  &:before {
    content: "";
    height: 100%;
    display: block;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    border: ${({ variant }) =>
      variant === "outlined" ? `1px solid var(--softDark)` : "none"};
    background-color: ${({ variant, theme }) =>
      variant === "outlined" ? "transparent" : theme.softDark};
  }
`;

StyledButton.HoverEffect = styled.span`
  /* Hover Effect */
  content: "";
  display: block;
  position: absolute;
  height: 100%;
  width: 120%;
  top: 0;
  left: -5%;
  z-index: 1;
  background-color: var(--lightBlue);
  transform: translateX(-100%) skew(-10deg);
  transition: transform 0.3s ease-out;

  ${StyledButton}:hover & {
    transform: translateX(0) skew(-10deg);
  }
`;

StyledButton.Text = styled.span`
  /* Label Text */
  position: relative;
  display: block;
  padding: 1.9rem 3rem;
  background-color: transparent;
  z-index: 1;
  color: ${({ variant, theme }) =>
    variant === "outlined" ? theme.softDark : theme.smokeyWhite};
  transition: color 0.2s ease-in;

  &:after {
    content: "";
    display: block;
    position: absolute;
    height: 0.6rem;
    width: 0.6rem;
    right: 0;
    bottom: 0;
    background-color: var(--white);
    transition: background-color 0.2s ease-in;
  }

  ${StyledButton}:hover & {
    color: ${({ variant, theme }) =>
      variant === "outlined" ? theme.smokeyWhite : theme.softDark};
  }

  ${StyledButton}:hover &:after {
    background-color: var(--softDark);
  }
`;

export const Button = ({ variant, text, ...rest }) => (
  <StyledButton variant={variant} {...rest}>
    <StyledButton.Label variant={variant}>
      <StyledButton.HoverEffect />
      <StyledButton.Text variant={variant}>{text}</StyledButton.Text>
    </StyledButton.Label>
  </StyledButton>
);
