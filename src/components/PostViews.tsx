import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.BLOG_VIEWS_URL,
  process.env.BLOG_VIEWS_API_KEY,
  {
    global: {
      fetch(input, init) {
        return globalThis.fetch(input, { ...init, cache: "no-store" });
      },
    },
  }
);

const host =
  process.env.NODE_ENV === "production" ? "icyjoseph.dev" : "development";

export const PostViews = async ({ slug }: { slug: string }) => {
  if (!slug) notFound();

  const { data } = await supabase
    .from<string, { Row: IcyJoseph.PostView }>(process.env.BLOG_VIEWS_TABLE)
    .select("*")
    .eq("slug", slug)
    .eq("host", host)
    .single();

  return (
    <p className="text-end font-light">
      <span className="text-3xl">{data?.views ?? "-"}</span> <span>views</span>
    </p>
  );
};
