import type { GetServerSideProps } from "next";
import { MeiliSearch } from "meilisearch";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import { components } from "components/Blog/mdx";

import { Container } from "design-system/Container";
import { Text } from "design-system/Text";

type MDXPost = Omit<IcyJoseph.Post, "content"> & {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
};

/**
 * TODO: Using MDX Post tags, find similar posts
 */

export const BlogEntry = ({ source, title }: MDXPost) => {
  return (
    <>
      <Container mt={4} px={1}>
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
  try {
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

    const { content, ...rest } = await index.getDocument(slug);

    // assert content shape
    const source = await serialize(content || "");

    return { props: { ...rest, source } };
  } catch (e) {
    return { notFound: true };
  }
};

export default BlogEntry;
