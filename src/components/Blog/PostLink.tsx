import type { ReactNode } from "react";

import Link from "next/link";

import type { PostPreview } from "lib/posts/types";

export const PostLink = ({
  post,
  children,
}: {
  post: PostPreview;
  children?: ReactNode | ReactNode[];
}) => (
  <article className="mb-8 px-1 relative">
    <Link
      key={post.slug}
      href={`/blog/${post.slug}`}
      className="hover:underline decoration-pale-yellow after:absolute after:content-[''] after:top-0 after:left-0 after:bottom-0 after:right-0 after:inset-0"
    >
      <h3 className="text-pale-yellow text-xl">{post.title}</h3>
    </Link>

    <p className="font-sans text-lg max-w-prose font-light">{post.summary}</p>

    <>{children}</>
  </article>
);
