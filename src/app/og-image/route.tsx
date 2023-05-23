import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

import { BlogPostImage, ProfileImage } from "app/og-image/components";
import { getPostBySlug } from "posts/lib";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const slug = searchParams.get("slug");
    console.log("Processing slug", { slug });

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
    const message = reason instanceof Error ? reason.message : reason;

    console.log(message);
    // if we fail, still just show an image
    // consider returning a 404
    return new ImageResponse(<ProfileImage />);
  }
}
