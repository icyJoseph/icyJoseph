import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";
import { cacheLife, cacheTag } from "next/cache";

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

    const posts = postsContent.flatMap((content) => {
      const { data, content: body } = matter(content);
      const result = postPreviewSchema.safeParse({ ...data, content: body });
      return result.success ? [result.data] : [];
    });

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
