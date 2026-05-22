import { Suspense } from "react";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CountView } from "components/Blog/CountView";
import { components } from "components/Blog/mdx";
import { ReadingTime } from "components/Blog/ReadingTime";
import { PostViews } from "components/PostViews";
import { BackTo, BackToTop } from "design-system/BackToTop";
import style from "design-system/separated.module.css";
import { MDXContent } from "lib/mdx-client/render";
import { getAllPosts, getPostBySlug } from "lib/posts/db";
import type { Post } from "lib/posts/types";

const VERCEL_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const slug = params.slug;
  const post = await getPostBySlug(slug);


  if (!post) {
    return {
      metadataBase: new URL(VERCEL_URL),
      title: "icyJoseph | Not found",
      description: "The resource you were looking for does not exist",
    };
  }


  return {
    metadataBase: new URL(VERCEL_URL),
    title: `icyJoseph | ${post.title}`,
    description: post.summary,
    openGraph: {
      url: `/blog/${slug}`,
      title: `icyJoseph | ${post.title}`,
      siteName: "icyJoseph",
      description: post.summary,
      images: [
        {
          url: `/og-image/${slug}`,
          width: 960,
          height: 540,
          alt: `Blog post: ${post.title}`,
          type: "image/png",
        },
      ],
    },
  }
};

export const generateStaticParams = async () => {
  const posts = await getAllPosts();

  return posts.map(({ slug }) => ({ slug }));
};

const intl = new Intl.DateTimeFormat("en-SE", {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
});

const getPostData = async (
  slug: string
): Promise<Post & { content: string; publish_date: number }> => {
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  if (typeof post.content !== "string") {
    console.log(new Error(`${slug} has no content`))

    notFound();
  }
  if (typeof post.publish_date !== "number") {

    console.log(new Error(`${slug} has no publish date`))
    notFound();
  }

  return {
    ...post,
    content: post.content,
    publish_date: post.publish_date,
  }
};

function PublishDate({ publish_date }: { publish_date: number }) {
  return intl.format(new Date(publish_date * 1000));
}

const BlogEntry = async (props: PageProps<"/blog/[slug]">) => {
  const params = await props.params;

  const {
    slug,
    content,
    title,
    // tags,
    publish_date,
    authors,
  } = await getPostData(params.slug);

  const [mainAuthor] = authors;

  return (
    <section className="max-w-[75ch] mx-auto py-5 text-lg">
      <header className="text-3xl">{title}</header>

      <aside className="mt-8 font-light text-base text-end">
        <span className={`${style.separated} inline-block`}>{mainAuthor}</span>

        <span className={`${style.separated} inline-block`}>
          <PublishDate publish_date={publish_date} />
        </span>
        <span className={`${style.separated} inline-block`}>
          {intl.format(new Date(publish_date * 1000))}
        </span>

        <ReadingTime content={content} />
      </aside>

      <div className="min-h-screen">
        <MDXContent source={content} components={components} />
      </div>

      <CountView slug={slug} />

      <div className="py-4" />

      <p className="text-end font-light text-3xl">
        <Suspense fallback="..">
          <PostViews slug={slug} />
        </Suspense>
      </p>

      <div className="flex flex-wrap justify-between gap-x-4">
        <BackTo to="/blog" label="Back to blog" />

        <BackToTop />
      </div>
    </section>
  );
};

export default BlogEntry;
