import type { ReactNode } from "react";

import Link from "next/link";

import type { PostPreview } from "lib/posts/db";

export const PostLink = ({
  post,
  children,
}: {
  post: PostPreview;
  children?: ReactNode | ReactNode[];
}) => (
  <Link key={post.slug} href={`/blog/${post.slug}`}>
    <article className="mb-8 px-1">
      <h3 className="text-pale-yellow text-xl">{post.title}</h3>

      <p className="font-sans text-lg max-w-prose font-light">{post.summary}</p>
    </article>

    <>{children}</>
  </Link>
);
