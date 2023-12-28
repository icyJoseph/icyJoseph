import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";
import type { SafeParseSuccess } from "zod";

import { postSchema, postPreviewSchema } from "./parser";
import type { Post, PostPreview } from "./types";

export const getAllPosts = async (): Promise<PostPreview[]> => {
  try {
    // with extension
    const slugs = await fs.readdir(path.resolve(process.cwd(), "./posts"));

    const postsContent = await Promise.all(
      slugs.map<Promise<string>>((slug) =>
        fs.readFile(path.resolve(process.cwd(), "./posts", slug), "utf-8")
      )
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

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const postsContent = await fs.readFile(
    path.resolve(process.cwd(), "./posts", `${slug}.md`),
    "utf-8"
  );

  const { content, data } = matter(postsContent);
  const post = postSchema.parse({ ...data, content });
  return post;
};
