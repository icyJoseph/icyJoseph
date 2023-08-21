import { type NextRequest, NextResponse } from "next/server";

import { gitHubContributions } from "lib/github/fetcher";

export const GET = async (req: NextRequest) => {
  const year = Number(req.nextUrl.searchParams.get("year"));

  if (isNaN(year))
    return NextResponse.json(
      { message: "Bad Request" },
      { status: 400, statusText: "Bad Request" }
    );

  try {
    const data = await gitHubContributions(year);

    return NextResponse.json(data);
  } catch (reason) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
};
