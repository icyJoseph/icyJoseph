import { Suspense, type ComponentPropsWithoutRef } from "react";

import { Code } from "bright";
import classNames from "classnames";

export const CodeBlock = ({
  inline,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) => {
  const match = /language-(\w+)/.exec(className || "");

  return !inline && match ? (
    <Suspense fallback={<code className="text-base">{children}</code>}>
      <Code
        lang={match[1]}
        {...props}
        className={classNames(className, "text-base")}
      >
        {String(children).replace(/\n$/, "")}
      </Code>
    </Suspense>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export type CodeBlockComponent = typeof CodeBlock;
export default CodeBlock;
