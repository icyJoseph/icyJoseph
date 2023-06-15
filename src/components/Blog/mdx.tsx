import type { ComponentPropsWithoutRef } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

import type { CodeBlockComponent } from "components/Blog/CodeBlock";

const CodeBlock = dynamic(
  () => import("components/Blog/CodeBlock")
) as CodeBlockComponent;

export const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => {
    return <h1 {...props} className="text-2xl text-pale-yellow mt-8 mb-6" />;
  },

  h2: (props: ComponentPropsWithoutRef<"h2">) => {
    return <h2 {...props} className="text-xl text-pale-yellow mt-8 mb-6" />;
  },

  h3: (props: ComponentPropsWithoutRef<"h3">) => {
    return <h3 {...props} className="text-lg text-pale-yellow mt-8 mb-6" />;
  },

  h4: (props: ComponentPropsWithoutRef<"h4">) => {
    return <h4 {...props} className="text-base text-pale-yellow mt-8 mb-6" />;
  },

  h5: (props: ComponentPropsWithoutRef<"h5">) => {
    return <h5 {...props} className="text-base text-pale-yellow mt-8 mb-6" />;
  },

  h6: (props: ComponentPropsWithoutRef<"h6">) => {
    return <h6 {...props} className="text-base text-pale-yellow mt-8 mb-6" />;
  },

  p: (props: ComponentPropsWithoutRef<"p">) => {
    return (
      <p {...props} className="my-4 font-light [&>code]:text-pale-green" />
    );
  },

  a: (props: ComponentPropsWithoutRef<"a">) => {
    return (
      <span>
        {props.href ? (
          <Link
            href={props.href}
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-pale-blue font-medium" {...props} />
          </Link>
        ) : (
          <a {...props} className="text-pale-blue font-medium" />
        )}
      </span>
    );
  },

  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li {...props} className="my-2 font-light" />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="my-3 list-decimal list-inside" />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="my-3 list-disc list-inside" />
  ),
  code: CodeBlock,
};
