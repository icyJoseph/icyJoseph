"use server";
import { createClient } from "@supabase/supabase-js";

export const addView = async ({ slug }: { slug: string }) => {
  const supabase = createClient(
    process.env.BLOG_VIEWS_URL,
    process.env.BLOG_VIEWS_API_KEY
  );

  const host =
    process.env.NODE_ENV === "production" ? "icyjoseph.dev" : "development";

  await supabase.rpc("increment_views", {
    target: slug,
    site: host,
  });
};
