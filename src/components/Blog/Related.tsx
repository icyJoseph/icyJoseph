import React from "react";
import type { SearchResponse } from "meilisearch";
import useSWRImmutable from "swr/immutable";

import { PostLink } from "components/Blog/PostLink";
import { Text } from "design-system/Text";

const useSearch = (tags: string[]) => {
  return useSWRImmutable<SearchResponse<IcyJoseph.Post>>(tags, (...ts) =>
    fetch(`/api/search?tags=${ts.join(",")}`).then((res) => res.json())
  );
};

export const Related = ({
  tags,
  slug
}: Pick<IcyJoseph.Post, "slug" | "tags">) => {
  const { data } = useSearch(tags);

  if (!data) return null;

  const related = data.hits.filter((post) => post.slug !== slug);

  if (related.length === 0) return null;

  return (
    <>
      <Text as="h2" mb={2} $fontSize="2.25rem" $textColor="--yellow" px={1}>
        Related Posts
      </Text>

      {related.map((post) => {
        return <PostLink key={post.slug} post={post} />;
      })}
    </>
  );
};
