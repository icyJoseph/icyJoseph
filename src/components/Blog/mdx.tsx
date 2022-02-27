import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { Prism } from "react-syntax-highlighter";
import { nord as prismTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Text } from "design-system/Text";
import { Ol, Ul } from "design-system/List";
import { Paragraph } from "design-system/Paragraph";

export const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => {
    return (
      <Text
        as="h1"
        {...props}
        $fontSize="2.25rem"
        $textColor="--yellow"
        mt={4}
        mb={3}
      />
    );
  },

  h2: (props: ComponentPropsWithoutRef<"h2">) => {
    return (
      <Text
        as="h2"
        {...props}
        $fontSize="2.15rem"
        $textColor="--yellow"
        mt={4}
        mb={3}
      />
    );
  },

  h3: (props: ComponentPropsWithoutRef<"h3">) => {
    return (
      <Text
        as="h3"
        {...props}
        $fontSize="2rem"
        $textColor="--yellow"
        mt={4}
        mb={3}
      />
    );
  },

  h4: (props: ComponentPropsWithoutRef<"h4">) => {
    return (
      <Text
        as="h1"
        {...props}
        $fontSize="1.9rem"
        $textColor="--yellow"
        mt={4}
        mb={3}
      />
    );
  },

  h5: (props: ComponentPropsWithoutRef<"h5">) => {
    return (
      <Text
        as="h2"
        {...props}
        $fontSize="1.8rem"
        $textColor="--yellow"
        mt={4}
        mb={3}
      />
    );
  },

  h6: (props: ComponentPropsWithoutRef<"h6">) => {
    return (
      <Text
        as="h3"
        {...props}
        $fontSize="1.75rem"
        $textColor="--yellow"
        mt={4}
        mb={3}
      />
    );
  },

  p: (props: ComponentPropsWithoutRef<"p">) => {
    return <Paragraph {...props} mb={2} />;
  },

  a: (props: ComponentPropsWithoutRef<"a">) => {
    return (
      <Text as="span">
        {props.href ? (
          <Link href={props.href} passHref>
            <Text
              as="a"
              $textColor="--lightBlue"
              $fontWeight={400}
              {...props}
              target="_blank"
              rel="noopener noreferrer"
            />
          </Link>
        ) : (
          <Text as="a" $textColor="--lightBlue" {...props} />
        )}
      </Text>
    );
  },

  li: (props: ComponentPropsWithoutRef<"li">) => (
    <Paragraph as="li" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => <Ol {...props} my={2} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <Ul {...props} my={2} />,

  code({
    inline,
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) {
    const match = /language-(\w+)/.exec(className || "");

    return !inline && match ? (
      <Prism style={prismTheme} language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, "")}
      </Prism>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
};
