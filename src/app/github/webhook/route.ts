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

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-hub-signature-256");

  if (!verifySignature(body, signature)) {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 401, statusText: "Unauthorized" }
    );
  }

  revalidateTag("github", "max");

  return NextResponse.json({ revalidated: true });
}
