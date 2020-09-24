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

export const DevIcon = ({ language, wordmark = false, colored = false }) => (
  <i
    className={`devicon-${normalize(language)}-plain${
      wordmark ? "-wordmark" : ""
    }${colored ? " colored" : ""}`}
  ></i>
);
