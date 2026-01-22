import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isCliUserAgent(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();

  // Common non-browser / CLI / programmatic clients
  if (ua.includes("curl")) return true;
  if (ua.includes("wget")) return true;
  if (ua.includes("httpie")) return true;
  if (ua.includes("httpie-go")) return true;
  if (ua.includes("go-http-client")) return true;

  return false;
}

function isBrowserUserAgent(userAgent: string): boolean {
  // Broad heuristic: real browsers usually identify with Mozilla and one of these engines
  return /mozilla|chrome|safari|firefox|edg\//i.test(userAgent);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userAgent = request.headers.get("user-agent") ?? "";
  const accept = request.headers.get("accept") ?? "";

  const wantsPlainText = accept.includes("text/plain");
  const wantsMarkdown = accept.includes("text/markdown");
  const cliUA = isCliUserAgent(userAgent);
  const browserUA = isBrowserUserAgent(userAgent);

  // Root: route obvious CLI clients and text-preferring callers to text landing.
  if (pathname === "/") {
    if ((cliUA || wantsPlainText || wantsMarkdown) && !browserUA) {
      const url = request.nextUrl.clone();
      url.pathname = wantsMarkdown ? "/text/markdown" : "/text";
      return NextResponse.rewrite(url);
    }
  }

  // Blog posts: serve markdown variant when specifically requested.
  if (pathname.startsWith("/blog/") && wantsMarkdown && !browserUA) {
    const url = request.nextUrl.clone();
    const slug = pathname.replace(/^\/blog\//, "");
    url.pathname = `/text/blog/${slug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/blog/:path*"],
};

