import { assignInlineVars } from "@vanilla-extract/dynamic";
import { devIcon, devIconTheme } from "design-system/styles/DevIcon.css";
import { Sprinkles, sprinkles } from "design-system/styles/sprinkles.css";

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

type BaseDevIconOwnProps = Sprinkles & {
  color: string;
  fontSize?: string;
  className?: string;
  language: string;
};

export const DevIcon = ({
  color,
  fontSize,
  className,
  language,
  ...rest
}: BaseDevIconOwnProps) => {
  const baseCn = `devicon-${normalize(language)}-plain`;
  const coloredCn = `${language === "CSS" ? "colored" : ""}`;
  const vanillaCn = `${devIcon} ${sprinkles(rest)}`;

  const cn = `${baseCn} ${className} ${vanillaCn} ${coloredCn}`;

  return (
    <i
      className={cn}
      style={assignInlineVars(devIconTheme, {
        fontSize: fontSize || devIconTheme.fontSize,
        color: color
      })}
    />
  );
};
