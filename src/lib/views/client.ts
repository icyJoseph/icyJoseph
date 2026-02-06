import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import { getAllPosts } from "lib/posts/db";

const supabase = createClient(
  process.env.BLOG_VIEWS_URL,
  process.env.BLOG_VIEWS_API_KEY
);

export const host =
  process.env.NODE_ENV === "production" ? "icyjoseph.dev" : "development";

const slugSchema = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[\w-]+$/);

/**
 * Validates and resolves a slug against real blog posts.
 * Returns the validated slug string, or null if invalid / not a real post.
 */
export async function validateSlug(
  value: unknown
): Promise<string | null> {
  const parsed = slugSchema.safeParse(value);
  if (!parsed.success) return null;

  const posts = await getAllPosts();
  const exists = posts.some((post) => post.slug === parsed.data);

  return exists ? parsed.data : null;
}

export async function incrementViews(slug: string): Promise<void> {
  await supabase.rpc("increment_views", {
    target: slug,
    site: host,
  });
}

export async function getViews(slug: string): Promise<number> {
  const { data } = await supabase
    .from<string, { Row: IcyJoseph.PostView }>(process.env.BLOG_VIEWS_TABLE)
    .select("*")
    .eq("slug", slug)
    .eq("host", host)
    .single();

  return data?.views ?? 0;
}
