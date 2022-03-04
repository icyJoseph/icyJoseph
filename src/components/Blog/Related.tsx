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

export const Related = ({ tags }: { tags: IcyJoseph.Post["tags"] }) => {
  const { data } = useSearch(tags);

  return (
    <>
      <Text
        as="h2"
        mb={2}
        $fontSize="2.25rem"
        px={1}
        $textDecoration="underline"
      >
        Related Posts
      </Text>

      {data?.hits.map((post) => {
        return <PostLink key={post.slug} post={post} />;
      })}
    </>
  );
};
