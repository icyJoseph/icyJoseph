import { ImageResponse } from "next/server";

import { ProfileImage } from "app/og-image/components";

export async function GET() {
  return new ImageResponse(<ProfileImage />);
}
