import type { ComponentPropsWithoutRef } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

import { Ol, Ul } from "design-system/List";
import { Paragraph } from "design-system/Paragraph";
import { Text } from "design-system/Text";

const CodeBlock = dynamic(() => import("components/Blog/CodeBlock"));

export const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => {
    return (
      <Text
        as="h1"
        {...props}
        $fontSize="1.4rem"
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
        $fontSize="1.3rem"
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
        $fontSize="1.25rem"
        $textColor="--yellow"
        mt={4}
        mb={3}
      />
    );
  },

  h4: (props: ComponentPropsWithoutRef<"h4">) => {
    return (
      <Text
        as="h4"
        {...props}
        $fontSize="1.2rem"
        $textColor="--yellow"
        mt={4}
        mb={3}
      />
    );
  },

  h5: (props: ComponentPropsWithoutRef<"h5">) => {
    return (
      <Text
        as="h5"
        {...props}
        $fontSize="1.125rem"
        $textColor="--yellow"
        mt={4}
        mb={3}
      />
    );
  },

  h6: (props: ComponentPropsWithoutRef<"h6">) => {
    return (
      <Text
        as="h6"
        {...props}
        $fontSize="1rem"
        $textColor="--yellow"
        mt={5}
        mb={4}
      />
    );
  },

  p: (props: ComponentPropsWithoutRef<"p">) => {
    return <Paragraph {...props} className="my-2" />;
  },

  a: (props: ComponentPropsWithoutRef<"a">) => {
    return (
      <Text as="span">
        {props.href ? (
          <Link
            href={props.href}
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text
              as="span"
              $textColor="--lightBlue"
              $fontWeight={400}
              {...props}
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
  ol: (props: ComponentPropsWithoutRef<"ol">) => <Ol {...props} my={3} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <Ul {...props} my={3} />,
  code: CodeBlock,
};
