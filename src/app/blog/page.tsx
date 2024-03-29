import type { Metadata } from "next";

import { BlogIntro } from "components/Blog/Intro";
import { PostLink } from "components/Blog/PostLink";
import { getAllPosts } from "lib/posts/db";
import type { PostPreview } from "lib/posts/types";

type BlogProps = {
  posts: PostPreview[];
};

export const revalidate = 360;

const VERCEL_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const metadata: Metadata = {
  metadataBase: new URL(VERCEL_URL),
  title: "icyJoseph | Blog",
  description:
    "Here I publish my solutions to coding challenges, and things I learn on my day to day job.",
  openGraph: {
    url: `${VERCEL_URL}/blog`,
    title: "icyJoseph | Blog",
    siteName: "icyJoseph",
    description:
      "Here I publish my solutions to coding challenges, and things I learn on my day to day job.",
    images: [
      {
        url: `${VERCEL_URL}/og-image`,
        width: 960,
        height: 540,
        alt: "icyJoseph blog page",
        type: "image/png",
      },
    ],
  },
};

const getBlogData = async (): Promise<BlogProps> => {
  try {
    const posts = await getAllPosts();
    return {
      posts: posts
        .slice()
        // TODO: When using Node 20, switch to `toSorted`
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
    <>
      <section className="max-w-[75ch] mx-auto text-lg">
        <BlogIntro />

        <h2 className="font-sans text-2xl pt-20 mb-8">Posts</h2>

        {hasPosts ? (
          posts.map((post) => <PostLink key={post.slug} post={post} />)
        ) : (
          <p className="font-sans text-xl">Nothing has been published yet.</p>
        )}
      </section>
    </>
  );
};

export default Blog;
