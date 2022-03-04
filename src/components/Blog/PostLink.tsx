import type { ReactNode } from "react";
import Link from "next/link";

import { Section } from "design-system/Section";
import { Text } from "design-system/Text";

export type PostPreview = Pick<
  IcyJoseph.Post,
  "title" | "tags" | "slug" | "summary" | "publish_date"
>;

export const PostLink = ({
  post,
  children
}: {
  post: PostPreview;
  children?: ReactNode | ReactNode[];
}) => (
  <Link key={post.slug} href={`/blog/${post.slug}`}>
    <a>
      <Section as="article" mb={2} px={1}>
        <Text as="h3" $textColor="--yellow">
          {post.title}
        </Text>

        <div>
          <Text>{post.summary}</Text>
        </div>
      </Section>

      <>{children}</>
    </a>
  </Link>
);
