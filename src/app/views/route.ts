import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.BLOG_VIEWS_URL,
  process.env.BLOG_VIEWS_API_KEY
);

const host =
  process.env.NODE_ENV === "production" ? "icyjoseph.dev" : "development";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const target = body?.slug;

  if (!target) {
    return NextResponse.json(
      { error: "Something is missing" },
      { status: 400, statusText: "Bad Request" }
    );
  }

  const result = await supabase.rpc("increment_views", {
    target,
    site: host,
  });

  if (result.error) {
    return NextResponse.json(
      {
        error: "The operation failed",
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }

  return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Something is missing" },
      { status: 400, statusText: "Bad Request" }
    );
  }

  const { data } = await supabase
    .from<string, { Row: IcyJoseph.PostView }>(process.env.BLOG_VIEWS_TABLE)
    .select("*")
    .eq("slug", slug)
    .eq("host", host)
    .single();

  return NextResponse.json(data?.views ?? 0);
}
