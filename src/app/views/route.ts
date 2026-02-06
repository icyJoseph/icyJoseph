import { NextRequest, NextResponse } from "next/server";

import { getViews, incrementViews, validateSlug } from "lib/views/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const slug = await validateSlug(body?.slug);

    if (slug) await incrementViews(slug);
  } catch {
    // noop
  }

  return NextResponse.json({ ok: true });
}

export async function GET(request: NextRequest) {
  const slug = await validateSlug(request.nextUrl.searchParams.get("slug"));

  if (!slug) return NextResponse.json(0);

  const views = await getViews(slug);

  return NextResponse.json(views);
}
