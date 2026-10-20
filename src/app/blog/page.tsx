import type { Metadata } from "next";
import { cacheLife } from "next/cache";

import { BlogIntro } from "components/Blog/Intro";
import { PostLink } from "components/Blog/PostLink";
import { getAllPosts } from "lib/posts/db";
import type { PostPreview } from "lib/posts/types";
import { siteOrigin } from "lib/site-url";

type BlogProps = {
  posts: PostPreview[];
};

const origin = siteOrigin();

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: "icyJoseph | Blog",
  description:
    "Notes from the desk — App Router, challenges, and the craft of shipping UI.",
  openGraph: {
    url: `${origin}/blog`,
    title: "icyJoseph | Blog",
    siteName: "icyJoseph",
    description:
      "Notes from the desk — App Router, challenges, and the craft of shipping UI.",
    images: [
      {
        url: `${origin}/og-image`,
        width: 960,
        height: 540,
        alt: "icyJoseph blog page",
        type: "image/png",
      },
    ],
  },
};

const getBlogData = async (): Promise<BlogProps> => {
  "use cache";
  cacheLife("max");

  try {
    const posts = await getAllPosts();
    return {
      posts: posts
        .slice()
        .sort((lhs, rhs) => rhs.publish_date - lhs.publish_date),
    };
  } catch (e) {
    console.log("Error while building Blog landing page", e);

    return { posts: [] };
  }
};

const Blog = async () => {
  const { posts } = await getBlogData();

  const hasPosts = posts.length > 0;

  return (
    <section className="blog-index">
      <BlogIntro />

      <h2 className="blog-index__section-title">Posts</h2>

      {hasPosts ? (
        <div className="blog-index__grid">
          {posts.map((post) => (
            <PostLink key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="blog-index__empty">Nothing has been published yet.</p>
      )}
    </section>
  );
};

export default Blog;
