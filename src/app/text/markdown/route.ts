import { generateTextLanding } from "lib/text-landing/generator";

export async function GET() {
  const body = await generateTextLanding(true);

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
