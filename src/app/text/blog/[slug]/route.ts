import { getAllPosts, getPostBySlug } from "lib/posts/db";

const intl = new Intl.DateTimeFormat("en-SE", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const post = await getPostBySlug(slug);

  if (!post || typeof post.content !== "string") {
    return new Response("Post not found", { status: 404 });
  }

  const title = post.title ?? slug;
  const authors = Array.isArray(post.authors) ? post.authors : [];
  const mainAuthor = authors[0] ?? "icyJoseph";
  const publishDate =
    typeof post.publish_date === "number"
      ? intl.format(new Date(post.publish_date * 1000))
      : "";

  const lines: string[] = [];

  lines.push(`# ${title}`);
  lines.push("");
  if (publishDate || mainAuthor) {
    const metaBits: string[] = [];
    if (mainAuthor) metaBits.push(mainAuthor);
    if (publishDate) metaBits.push(publishDate);
    lines.push(`_by ${metaBits.join(" · ")}_`);
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push(post.content);

  const body = lines.join("\n");

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}

