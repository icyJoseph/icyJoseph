import { space, SpaceProps } from "@styled-system/space";
import styled from "styled-components";

type NormalizeIcon = (language: string) => string;

const normalize: NormalizeIcon = (language) => {
  const icon = language.toLowerCase();
  switch (icon) {
    case "html":
      return "html5";
    case "css":
      return "css3";
    case "shell":
      return "bash";
    default:
      return icon;
  }
};

type BaseDevIconOwnProps = {
  color: string;
  $fontSize?: string;
  className?: string;
  language: string;
};

const BaseDevIcon = ({ className, language }: BaseDevIconOwnProps) => (
  <i
    className={`devicon-${normalize(language)}-plain ${className} ${
      language === "CSS" ? "colored" : ""
    }`}
  />
);

export const DevIcon = styled(BaseDevIcon)<BaseDevIconOwnProps & SpaceProps>`
  ${space};
  display: inline-block;
  color: ${({ color }) => color};
  font-size: ${({ $fontSize = "1.6rem" }) => $fontSize};
  vertical-align: middle;
`;
