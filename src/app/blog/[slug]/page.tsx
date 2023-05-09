import { MeiliSearch } from "meilisearch";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

import { components } from "components/Blog/mdx";
import { Related } from "components/Blog/Related";
import { PostViews } from "components/PostViews";
import { BackTo, BackToTop } from "design-system/BackToTop";

export const revalidate = 360;

const VERCEL_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  try {
    const slug = params.slug;

    const client = new MeiliSearch({
      host: process.env.MEILISEARCH_URL,
      apiKey: process.env.MEILISEARCH_KEY,
    });

    const index = await client.getIndex<IcyJoseph.Post>(
      process.env.MEILISEARCH_INDEX
    );

    const post = await index.getDocument(slug);

    return {
      title: `icyJoseph | ${post.title}`,
      description: post.summary,
      openGraph: {
        url: VERCEL_URL,
        title: `icyJoseph | ${post.title}`,
        siteName: "icyJoseph",
        description: post.summary,
        images: [
          {
            url: `${VERCEL_URL}/waves_background.png`,
            width: 960,
            height: 540,
            alt: "icyJoseph wavy background",
            type: "image/png",
          },
        ],
      },
    };
  } catch (e) {
    return {
      title: "icyJoseph | Not found",
      description: "The resource you were looking for does not exist",
    };
  }
};

const getPostData = async (slug: string): Promise<IcyJoseph.Post> => {
  try {
    const client = new MeiliSearch({
      host: process.env.MEILISEARCH_URL,
      apiKey: process.env.MEILISEARCH_KEY,
    });

    const index = await client.getIndex<IcyJoseph.Post>(
      process.env.MEILISEARCH_INDEX
    );

    const post = await index.getDocument(slug);

    return post;
  } catch (e) {
    notFound();
  }
};

const BlogEntry = async ({ params }: { params: Record<string, string> }) => {
  const { slug, content, title, tags } = await getPostData(params.slug);

  return (
    <section className="max-w-[75ch] mx-auto py-5 text-lg">
      <header className="text-3xl">{title}</header>
      {/* @ts-expect-error MDX Async Component */}
      <MDXRemote source={content} components={components} />

      <div className="py-4" />

      <PostViews slug={slug} />

      <div className="py-4" />

      <Related tags={tags} slug={slug} />

      <BackToTop />

      <BackTo to="/blog" label="Back to Blog" />
    </section>
  );
};

export default BlogEntry;
