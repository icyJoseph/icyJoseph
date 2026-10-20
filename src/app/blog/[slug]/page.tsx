import { Suspense } from "react";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CountView } from "components/Blog/CountView";
import { FlarePlate } from "components/Blog/FlarePlate";
import { components } from "components/Blog/mdx";
import { ReadingTime } from "components/Blog/ReadingTime";
import { PostViews } from "components/PostViews";
import { BackTo, BackToTop } from "design-system/BackToTop";
import { MDXContent } from "lib/mdx-client/render";
import { flareSeedFrom } from "lib/og/seed";
import { getAllPosts, getPostBySlug } from "lib/posts/db";
import type { Post } from "lib/posts/types";
import { siteOrigin } from "lib/site-url";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  const origin = siteOrigin();

  if (!post) {
    return {
      metadataBase: new URL(origin),
      title: "icyJoseph | Not found",
      description: "The resource you were looking for does not exist",
    };
  }

  return {
    metadataBase: new URL(origin),
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
  };
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
  slug: string,
): Promise<Post & { content: string; publish_date: number }> => {
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  if (typeof post.content !== "string") {
    console.log(new Error(`${slug} has no content`));
    notFound();
  }
  if (typeof post.publish_date !== "number") {
    console.log(new Error(`${slug} has no publish date`));
    notFound();
  }

  return {
    ...post,
    content: post.content,
    publish_date: post.publish_date,
  };
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
    publish_date,
    authors,
  } = await getPostData(params.slug);

  const [mainAuthor] = authors;
  const seed = flareSeedFrom(slug, title);

  return (
    <article className="blog-entry">
      <header className="blog-entry__header">
        <p className="blog-entry__eyebrow">
          <Link href="/blog" prefetch className="blog-entry__mute">
            ← Blog
          </Link>
          <span className="mx-3 opacity-35">·</span>
          notes
        </p>
        <h1 className="blog-entry__title">{title}</h1>
        <p className="blog-entry__meta">
          <span>{mainAuthor}</span>
          <span aria-hidden className="blog-entry__dot">
            ·
          </span>
          <span>
            <PublishDate publish_date={publish_date} />
          </span>
          <span aria-hidden className="blog-entry__dot">
            ·
          </span>
          <ReadingTime content={content} />
        </p>
        <FlarePlate
          seed={seed}
          fallbackSrc={`/og-image/${slug}`}
          className="blog-entry__plate"
          imageClassName="blog-entry__plate-image"
          canvasClassName="blog-entry__plate-canvas"
          sizes="(max-width: 672px) 100vw, 672px"
        />
      </header>

      <div className="blog-entry__prose">
        <MDXContent source={content} components={components} />
      </div>

      <CountView slug={slug} />

      <footer className="blog-entry__foot">
        <p className="blog-entry__views">
          <Suspense fallback="··">
            <PostViews slug={slug} />
          </Suspense>
        </p>

        <div className="blog-entry__nav">
          <BackTo
            to="/blog"
            label="Back to blog"
            className="!mt-0 !text-start"
            linkClassName="blog-entry__nav-link"
          />
          <BackToTop
            className="!mt-0"
            linkClassName="blog-entry__nav-link"
          />
        </div>
      </footer>
    </article>
  );
};

export default BlogEntry;
