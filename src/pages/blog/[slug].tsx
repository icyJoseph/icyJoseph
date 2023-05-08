"use client";

import { MeiliSearch } from "meilisearch";
import type { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { components } from "components/Blog/mdx";
import { Related } from "components/Blog/Related";
import { BackTo, BackToTop } from "design-system/BackToTop";
import { Container } from "design-system/Container";
import { Text } from "design-system/Text";
import { usePostViews } from "hooks/usePostViews";

type MDXPost = Omit<IcyJoseph.Post, "content"> & {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
};

const VERCEL_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const BlogEntry = ({ slug, source, summary, title, tags }: MDXPost) => {
  const router = useRouter();

  const views = usePostViews(slug);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NextSeo
        title={`icyJoseph | ${title}`}
        description={summary}
        openGraph={{
          url: VERCEL_URL,
          title: `icyJoseph | ${title}`,
          site_name: "icyJoseph",
          description: summary,
          images: [
            {
              url: `${VERCEL_URL}/waves_background.png`,
              width: 960,
              height: 540,
              alt: "icyJoseph wavy background",
              type: "image/png",
            },
          ],
        }}
      />

      <Container mt={4} px={1}>
        <Text as="header" $fontSize="1.6rem">
          {title}
        </Text>

        <MDXRemote {...source} components={components} />
      </Container>

      <Container mt={4} px={1}>
        <Text $textAlign="end">
          <Text as="span" $fontWeight={300} $fontSize="1.875rem">
            {views}
          </Text>{" "}
          <Text as="span" $fontWeight={300}>
            views
          </Text>
        </Text>
      </Container>

      <Container mt={4} px={1}>
        <Related tags={tags} slug={slug} />

        <BackToTop />

        <BackTo to="/blog" label="Back to Blog" />
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new MeiliSearch({
    host: process.env.MEILISEARCH_URL,
    apiKey: process.env.MEILISEARCH_KEY,
  });

  const index = await client.getIndex<IcyJoseph.Post>(
    process.env.MEILISEARCH_INDEX
  );

  const { hits } = await index.search<IcyJoseph.Post>("", {
    limit: 50,
    attributesToRetrieve: ["slug"],
    sort: ["publish_date:desc"],
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
      apiKey: process.env.MEILISEARCH_KEY,
    });

    const index = await client.getIndex<IcyJoseph.Post>(
      process.env.MEILISEARCH_INDEX
    );

    const { content, ...rest } = await index.getDocument(slug);

    // assert content shape
    const source = await serialize(content || "");

    return { props: { ...rest, source }, revalidate: 360 };
  } catch (e) {
    return { notFound: true, revalidate: 360 };
  }
};

export default BlogEntry;
