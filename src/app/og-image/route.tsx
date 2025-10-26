import { ImageResponse } from "next/og";

import { ProfileImage } from "app/og-image/components";

export const dynamic = "force-dynamic";

export async function GET() {
  return new ImageResponse(<ProfileImage />);
}
