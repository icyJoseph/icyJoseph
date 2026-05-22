import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";
import { cacheLife, cacheTag } from "next/cache";
import type { SafeParseSuccess } from "zod";

import { postSchema, postPreviewSchema } from "./parser";
import type { Post, PostPreview } from "./types";

async function importPost(slug: string): Promise<string> {
  const mod = await import(`../../../posts/${slug}`);
  return mod.default;
}

export const getAllPosts = async (): Promise<PostPreview[]> => {
  "use cache";
  cacheTag("all-posts");
  try {
    const slugs = await fs.readdir(path.resolve(process.cwd(), "./posts"));

    const postsContent = await Promise.all(
      slugs.map<Promise<string>>((slug) => importPost(slug)),
    );

    const posts = postsContent
      .map((content) => matter(content))
      .map(({ data, content }) => ({ ...data, content }))
      .map((post) => postPreviewSchema.safeParse(post))
      .filter((result): result is SafeParseSuccess<Post> => result.success)
      .map(({ data }) => data);

    return posts;
  } catch (e) {
    console.log("Error while building Blog landing page", e);

    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  "use cache";

  cacheTag(slug);

  try {
    const postsContent = await importPost(`${slug}.md`);

    const { content, data } = matter(postsContent);
    const post = postSchema.parse({ ...data, content });

    cacheLife("weeks");
    return post;
  } catch (e) {
    console.log("Error while getting post by slug", e);

    cacheLife("hours");
    return null;
  }
};
