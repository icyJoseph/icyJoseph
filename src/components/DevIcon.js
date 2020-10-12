import styled from "styled-components";
import { space } from "@styled-system/space";

const normalize = (language) => {
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

const BaseDevIcon = ({ className, language }) => (
  <i
    className={`devicon-${normalize(language)}-plain ${className} ${
      language === "CSS" ? "colored" : ""
    }`}
  ></i>
);

export const DevIcon = styled(BaseDevIcon)`
  ${space};
  color: ${({ color }) => color};
  display: inline-block;
  font-size: ${({ fontSize = "1.6rem" }) => fontSize};
`;
