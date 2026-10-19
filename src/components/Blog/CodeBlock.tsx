import { type ComponentPropsWithoutRef } from "react";

import { Code } from "bright";
import classNames from "classnames";

import { flareTheme } from "design-system/flare-theme";

export const CodeBlock = async ({
  inline,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) => {
  "use cache";

  const match = /language-(\w+)/.exec(className || "");

  return !inline && match ? (
    <Code
      lang={match[1]}
      {...props}
      theme={flareTheme}
      className={classNames(className, "text-base")}
    >
      {String(children).replace(/\n$/, "")}
    </Code>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export type CodeBlockComponent = typeof CodeBlock;
export default CodeBlock;
