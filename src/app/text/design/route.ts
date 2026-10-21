import { generateDesignSpecMarkdown } from "lib/design/spec";

export async function GET() {
  const body = generateDesignSpecMarkdown();

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
