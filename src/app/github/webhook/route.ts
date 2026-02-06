import crypto from "node:crypto";

import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

function verifySignature(payload: string, signature: string | null): boolean {
  if (!signature || !WEBHOOK_SECRET) return false;

  const expected = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");

  const trusted = Buffer.from(`sha256=${expected}`, "ascii");
  const untrusted = Buffer.from(signature, "ascii");

  return (
    trusted.length === untrusted.length &&
    crypto.timingSafeEqual(trusted, untrusted)
  );
}

// Events that affect landing page data
const RELEVANT_EVENTS = new Set([
  "push", // contribution counts change
  "star", // stargazer counts change
  "repository", // new/deleted/archived repos
  "public", // repo visibility changed
  "create", // new repo/branch/tag
]);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-hub-signature-256");

  if (!verifySignature(body, signature)) {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 401, statusText: "Unauthorized" }
    );
  }

  const event = request.headers.get("x-github-event");

  if (event === "ping") {
    return NextResponse.json({ pong: true });
  }

  if (!event || !RELEVANT_EVENTS.has(event)) {
    return NextResponse.json({ revalidated: false });
  }

  revalidateTag("github", "max");

  return NextResponse.json({ revalidated: true });
}
