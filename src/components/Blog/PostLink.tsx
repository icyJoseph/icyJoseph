import type { ReactNode } from "react";

import Link from "next/link";

import { Text } from "design-system/Text";

export type PostPreview = Pick<
  IcyJoseph.Post,
  "title" | "tags" | "slug" | "summary" | "publish_date"
>;

export const PostLink = ({
  post,
  children,
}: {
  post: PostPreview;
  children?: ReactNode | ReactNode[];
}) => (
  <Link key={post.slug} href={`/blog/${post.slug}`}>
    <article className="mb-8 px-1">
      <Text as="h3" $textColor="--yellow">
        {post.title}
      </Text>

      <p className="font-sans text-2xl max-w-prose font-light">
        {post.summary}
      </p>
    </article>

    <>{children}</>
  </Link>
);
