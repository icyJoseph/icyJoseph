import type { GetStaticPaths, GetStaticProps } from "next";
import { MeiliSearch } from "meilisearch";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import { components } from "components/Blog/mdx";

import { Container } from "design-system/Container";
import { Text } from "design-system/Text";
import { useRouter } from "next/router";
import { Related } from "components/Blog/Related";

type MDXPost = Omit<IcyJoseph.Post, "content"> & {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
};

/**
 * TODO: Using MDX Post tags, find similar posts
 */

export const BlogEntry = ({ slug, source, title, tags }: MDXPost) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container mt={4} px={1}>
        <Text as="header" $fontSize="2.5rem" $textDecoration="underline">
          {title}
        </Text>

        <MDXRemote {...source} components={components} />
      </Container>

      <Container mt={4} px={1}>
        <Related tags={tags} slug={slug} />
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new MeiliSearch({
    host: process.env.MEILISEARCH_URL,
    apiKey: process.env.MEILISEARCH_KEY
  });

  const index = await client.getIndex<IcyJoseph.Post>(
    process.env.MEILISEARCH_INDEX
  );

  const { hits } = await index.search<IcyJoseph.Post>("", {
    limit: 50,
    attributesToRetrieve: ["slug"],
    sort: ["publish_date:desc"]
  });

  const paths = hits.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<MDXPost> = async (context) => {
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

    return { props: { ...rest, source }, revalidate: 120 };
  } catch (e) {
    return { notFound: true, revalidate: 360 };
  }
};

export default BlogEntry;
