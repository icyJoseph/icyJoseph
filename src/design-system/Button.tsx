import { ComponentPropsWithoutRef } from "react";

import { space, SpaceProps } from "@styled-system/space";
import styled from "styled-components";

import { theme } from "design-system/Global/theme";

type ButtonVariants = "primary" | "outlined";

type ButtonLabelProps = {
  variant: ButtonVariants;
};

type BaseButtonProps = {
  variant?: ButtonVariants;
  fontSize?: string;
} & SpaceProps;

const BaseButton = styled.button<BaseButtonProps>`
  ${space};
  isolation: isolate;
  z-index: 0;

  ${space({ p: 2 })};
  font-size: ${({ fontSize = "1.6rem" }) => fontSize};
  font-weight: 400;

  position: relative;
  display: block;

  border: 0;
  text-transform: uppercase;
  background-color: transparent;
  cursor: pointer;

  color: ${({ variant }) =>
    variant === "outlined" ? theme.smokeyWhite : theme.lightYellow};

  color: ${({ variant }) =>
    variant === "outlined" ? "var(--smokeyWhite)" : "var(--lightYellow)"};

  &:hover {
    color: ${({ variant }) =>
      variant === "outlined" ? theme.white : theme.yellow};

    color: ${({ variant }) =>
      variant === "outlined" ? "var(--white)" : "var(--yellow)"};
  }

  &::before,
  &::after {
    background-color: transparent;
    content: "";
    display: block;
    position: absolute;
    height: calc(50% - 0.4rem);
    width: 100%;
    border: 1px solid ${theme.smokeyWhite};
    border: 1px solid var(--smokeyWhite);
    left: 0;
  }

  &::before {
    border-bottom: none;
    top: 0;
  }

  &::after {
    border-top: none;
    bottom: 0;
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
  }

  &[aria-disabled="true"]:active {
    pointer-events: none;
  }

  transition: transform 0.2s ease-in-out;

  &[aria-disabled="false"]:active {
    transform: translateY(1px);
  }
`;

const Label = styled.span<ButtonLabelProps>`
  /* LABEL  */
  isolation: isolate;
  display: block;
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
    z-index: 0;

    border: 1px solid ${theme.smokeyWhite};
    border: 1px solid var(--smokeyWhite);

    ${BaseButton}:focus &,
  ${BaseButton}:focus-visible & {
      border: 1px solid var(--lightBlue);
    }

    background-color: ${({ variant }) =>
      variant === "outlined" ? "transparent" : theme.softDark};
    background-color: ${({ variant }) =>
      variant === "outlined" ? "transparent" : "var(--softDark)"};
  }
`;

const HoverEffect = styled.span`
  /* Hover Effect */
  display: block;
  position: absolute;
  height: 100%;
  width: 120%;
  top: 0;
  left: -5%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;

  ${BaseButton}:hover & {
    transform: translateX(0);
  }
`;

const Text = styled.span`
  /* Label Text */
  font-family: var(--font-family);
  position: relative;
  display: block;
  padding: 1.9rem 3rem;
  background-color: transparent;
  z-index: 1;
  color: inherit;

  opacity: 1;
  transition: color 0.2s ease-in, opacity 0.2s ease-in;

  &:after {
    content: "";
    display: block;
    position: absolute;
    height: 0.6rem;
    width: 0.6rem;
    right: 0;
    bottom: 0;

    background-color: ${theme.white};
    background-color: var(--white);

    transition: background-color 0.2s ease-in;
  }

  &[data-disabled="true"] {
    opacity: 0.5;
  }

  ${BaseButton}[aria-disabled="false"]:hover &:after {
    background-color: ${theme.softDark};
    background-color: var(--softDark);
  }

  ${BaseButton}:focus &:after,
  ${BaseButton}:focus-visible &:after {
    background-color: var(--lightBlue);
  }
`;

type ButtonOwnProps = { variant?: ButtonVariants } & BaseButtonProps;

export type ButtonProps = ButtonOwnProps & ComponentPropsWithoutRef<"button">;

export const Button = ({
  variant = "primary",
  disabled = false,
  children,
  ...rest
}: ButtonProps) => (
  <BaseButton aria-disabled={disabled} variant={variant} {...rest}>
    <Label variant={variant}>
      {!disabled && <HoverEffect />}
      <Text data-disabled={disabled}>{children}</Text>
    </Label>
  </BaseButton>
);
