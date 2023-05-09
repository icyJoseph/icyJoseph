import { MeiliSearch } from "meilisearch";
import type { Metadata } from "next";

import { BlogIntro } from "components/Blog/Intro";
import { PostLink, type PostPreview } from "components/Blog/PostLink";
import { Search } from "components/Blog/Search";

type BlogProps = {
  posts: PostPreview[];
};

const VERCEL_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const metadata: Metadata = {
  title: "icyJoseph | Blog",
  description:
    "Here I publish my solutions to coding challenges, and things I learn on my day to day job.",
  openGraph: {
    url: VERCEL_URL,
    title: "icyJoseph | Blog",
    siteName: "icyJoseph",
    description:
      "Here I publish my solutions to coding challenges, and things I learn on my day to day job.",
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

const getBlogData = async (): Promise<BlogProps> => {
  try {
    const client = new MeiliSearch({
      host: process.env.MEILISEARCH_URL,
      apiKey: process.env.MEILISEARCH_KEY,
    });

    const index = await client.getIndex<IcyJoseph.Post>(
      process.env.MEILISEARCH_INDEX
    );

    const { hits } = await index.search<IcyJoseph.Post>("", {
      limit: 50,
      attributesToRetrieve,
      sort: ["publish_date:desc"],
    });

    return { posts: hits };
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
      {/* <NextSeo
        title="icyJoseph | Blog"
        description="Here I publish my solutions to coding challenges, and things I learn on my day to day job."
        openGraph={blogPageOpenGraph}
      /> */}

      <section className="max-w-prose mx-auto">
        <BlogIntro />

        <h2 className="font-sans text-2xl pt-20 mb-8">Posts</h2>

        <Search>
          {hasPosts ? (
            posts.map((post) => <PostLink key={post.slug} post={post} />)
          ) : (
            <p className="font-sans text-xl">Nothing has been published yet.</p>
          )}
        </Search>
      </section>
    </>
  );
};

const attributesToRetrieve: Array<keyof PostPreview> = [
  "title",
  "tags",
  "slug",
  "summary",
  "publish_date",
];

export default Blog;
