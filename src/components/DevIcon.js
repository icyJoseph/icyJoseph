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

const BaseDevIcon = ({
  className,
  language,
  wordmark = false,
  colored = false
}) => (
  <i
    className={`devicon-${normalize(language)}-plain${
      wordmark ? "-wordmark" : ""
    }${colored ? " colored" : ""} ${className}`}
  ></i>
);

export const DevIcon = styled(BaseDevIcon)`
  ${space};
  display: inline-block;
  font-size: ${({ fontSize = "1.6rem" }) => fontSize};
`;
