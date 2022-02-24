import type { ComponentPropsWithoutRef } from "react";
import type { GetServerSideProps } from "next";
import { MeiliSearch } from "meilisearch";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import { Prism } from "react-syntax-highlighter";

import { nord as prismTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Container } from "design-system/Container";
import { Text } from "design-system/Text";

type MDXPost = Omit<IcyJoseph.Post, "content"> & {
  // Content as MDX
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
};

const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => {
    return (
      <Text
        as="h1"
        {...props}
        $fontSize="2.25rem"
        $textColor="--yellow"
        mb={4}
        mt={3}
      />
    );
  },

  h2: (props: ComponentPropsWithoutRef<"h1">) => {
    return (
      <Text
        as="h2"
        {...props}
        $fontSize="2.15rem"
        $textColor="--yellow"
        mb={4}
        mt={3}
      />
    );
  },

  h3: (props: ComponentPropsWithoutRef<"h1">) => {
    return (
      <Text
        as="h3"
        {...props}
        $fontSize="2rem"
        $textColor="--yellow"
        mb={4}
        mt={3}
      />
    );
  },

  h4: (props: ComponentPropsWithoutRef<"h1">) => {
    return (
      <Text
        as="h1"
        {...props}
        $fontSize="1.9rem"
        $textColor="--yellow"
        mb={4}
        mt={3}
      />
    );
  },

  h5: (props: ComponentPropsWithoutRef<"h1">) => {
    return (
      <Text
        as="h2"
        {...props}
        $fontSize="1.8rem"
        $textColor="--yellow"
        mb={4}
        mt={3}
      />
    );
  },

  h6: (props: ComponentPropsWithoutRef<"h1">) => {
    return (
      <Text
        as="h3"
        {...props}
        $fontSize="1.75rem"
        $textColor="--yellow"
        mb={4}
        mt={3}
      />
    );
  },

  p: (props: ComponentPropsWithoutRef<"p">) => {
    return <Text {...props} mb={2} />;
  },

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
      <code className={className} {...props} />
    );
  }
};

export const BlogEntry = ({ slug, source, title, ...rest }: MDXPost) => {
  console.log(rest);

  return (
    <>
      <Container mt={4}>
        <Text as="header" $fontSize="2.5rem">
          {title}
        </Text>

        <MDXRemote {...source} components={components} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<MDXPost> = async (
  context
) => {
  const { params } = context;
  const { slug } = params || {};

  if (typeof slug !== "string") return { notFound: true };

  const client = new MeiliSearch({
    host: process.env.MEILISEARCH_URL,
    apiKey: process.env.MEILISEARCH_KEY
  });

  const index = await client.getIndex<IcyJoseph.Post>(
    process.env.MEILISEARCH_INDEX
  );

  try {
    const { content, ...rest } = await index.getDocument(slug);

    // assert content shape
    const source = await serialize(content || "");

    return { props: { ...rest, source } };
  } catch (e) {
    return { notFound: true };
  }
};

export default BlogEntry;
