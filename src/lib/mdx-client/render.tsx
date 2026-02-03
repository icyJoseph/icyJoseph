import type { ComponentType } from "react";

import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

type MDXComponents = Record<string, ComponentType<Record<string, unknown>>>;

interface MDXContentProps {
  source: string;
  components?: MDXComponents;
}

export async function MDXContent({ source, components }: MDXContentProps) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return <Content components={components} />;
}
