import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

type NormalizeIcon = (language: string) => string;

const normalize: NormalizeIcon = (language) => {
  const icon = language.toLowerCase();
  switch (icon) {
    case "html":
      return "html5";
    case "css":
      return "css3";
    default:
      return icon;
  }
};

const BaseDevIcon = ({
  color: _,
  fontSize: __,
  className,
  language
}: {
  color: string;
  fontSize: string;
  className: string;
  language: string;
}) => (
  <i
    className={`devicon-${normalize(language)}-plain ${className} ${
      language === "CSS" ? "colored" : ""
    }`}
  />
);

export const DevIcon = styled(BaseDevIcon)<
  SpaceProps & { color: string; fontSize: string }
>`
  ${space};
  display: inline-block;
  color: ${({ color }) => color};
  font-size: ${({ fontSize = "1.6rem" }) => fontSize};
`;
