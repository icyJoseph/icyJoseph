import { generateTextLanding } from "lib/text-landing/generator";

export async function GET() {
  const body = await generateTextLanding(false);

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
