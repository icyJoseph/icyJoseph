import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";
import { ComponentPropsWithoutRef } from "react";

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
    variant === "outlined" ? "var(--smokeyWhite)" : "var(--lightYellow)"};

  &:hover {
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

  &:disabled {
    cursor: not-allowed;
  }

  &:disabled:active {
    pointer-events: none;
  }

  &:focus,
  &:focus-visible {
    outline-color: var(--blue);
    outline-offset: 4px;
    outline-width: 2px;
    outline-style: solid;
  }
`;

const Label = styled.span<ButtonLabelProps>`
  /* LABEL  */
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
    border: 1px solid var(--smokeyWhite);
    background-color: ${({ variant }) =>
      variant === "outlined" ? "transparent" : "var(--softDark)"};
  }
`;

const HoverEffect = styled.span`
  /* Hover Effect */
  content: "";
  display: block;
  position: absolute;
  height: 100%;
  width: 120%;
  top: 0;
  left: -5%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
  transform: translateX(-100%) skew(-10deg);
  transition: transform 0.3s ease-out;

  ${BaseButton}:hover & {
    transform: translateX(0) skew(-10deg);
  }
`;

const Text = styled.span`
  /* Label Text */
  font-family: "Fira Code", monospace;
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
    background-color: var(--white);
    transition: background-color 0.2s ease-in;
  }

  &[data-disabled="true"] {
    opacity: 0.5;
  }

  ${BaseButton}:hover &:after {
    background-color: var(--softDark);
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
  <BaseButton disabled={disabled} variant={variant} {...rest}>
    <Label variant={variant}>
      {!disabled && <HoverEffect />}
      <Text data-disabled={disabled}>{children}</Text>
    </Label>
  </BaseButton>
);
