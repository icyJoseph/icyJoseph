import classNames from "classnames";

type BackgroundProps = { readingMode?: boolean };

export const Background = ({ readingMode, ...props }: BackgroundProps) => (
  <div
    {...props}
    className={classNames(
      readingMode && "translate-y-1/4",
      "fixed -z-10 top-0 w-screen h-screen",
      "bg-scroll bg-cover bg-no-repeat",
      "bg-[url('/waves.min.svg')]",
      "transition-transform will-change-auto",
      "isolate"
    )}
  />
);
