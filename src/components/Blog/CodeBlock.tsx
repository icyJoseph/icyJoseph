"use client";

import type { ComponentPropsWithoutRef } from "react";

import classNames from "classnames";
import { PrismAsyncLight } from "react-syntax-highlighter";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import markup from "react-syntax-highlighter/dist/cjs/languages/prism/markup";
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import ts from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import prismTheme from "react-syntax-highlighter/dist/cjs/styles/prism/nord";

PrismAsyncLight.registerLanguage("css", css);
PrismAsyncLight.registerLanguage("markup", markup);
PrismAsyncLight.registerLanguage("js", js);
PrismAsyncLight.registerLanguage("ts", ts);
PrismAsyncLight.registerLanguage("jsx", jsx);
PrismAsyncLight.registerLanguage("tsx", tsx);
PrismAsyncLight.registerLanguage("rust", rust);

export const CodeBlock = ({
  inline,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) => {
  const match = /language-(\w+)/.exec(className || "");

  return !inline && match ? (
    <PrismAsyncLight
      style={prismTheme}
      language={match[1]}
      PreTag="div"
      {...props}
      className={classNames(className, "text-base")}
    >
      {String(children).replace(/\n$/, "")}
    </PrismAsyncLight>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export type CodeBlockComponent = typeof CodeBlock;
export default CodeBlock;
