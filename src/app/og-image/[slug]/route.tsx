import { ImageResponse } from "next/server";

import { BlogPostImage, ProfileImage } from "app/og-image/components";
import { getAllPosts, getPostBySlug } from "lib/posts/db";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      // not a blog post
      return new ImageResponse(<ProfileImage />);
    }

    const post = await getPostBySlug(slug);

    return new ImageResponse(
      (
        <BlogPostImage
          title={post.title}
          summary={post.summary}
          tags={post.tags}
          publishDate={post.publish_date}
        />
      )
    );
  } catch (reason) {
    return new ImageResponse(<ProfileImage />);
  }
}
