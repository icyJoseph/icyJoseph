import { createClient } from "@supabase/supabase-js";

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

const Views = ({ count }: { count?: number | undefined }) => (
  <>
    <span>{count ?? "-"}</span> <span>views</span>
  </>
);

export const PostViews = async ({ slug }: { slug: string }) => {
  if (!slug) return <Views />;

  const { data } = await supabase
    .from<string, { Row: IcyJoseph.PostView }>(process.env.BLOG_VIEWS_TABLE)
    .select("*")
    .eq("slug", slug)
    .eq("host", host)
    .single();

  return <Views count={data?.views} />;
};
