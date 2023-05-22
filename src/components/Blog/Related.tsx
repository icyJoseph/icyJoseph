"use client";

import type { SearchResponse } from "meilisearch";
import useSWRImmutable from "swr/immutable";

import { PostLink } from "components/Blog/PostLink";

const useSearch = (tags: string[]) => {
  return useSWRImmutable<SearchResponse<IcyJoseph.Post>>(tags, (...ts) =>
    fetch(`/api/search?tags=${ts.join(",")}`).then((res) => res.json())
  );
};

export const Related = ({
  tags,
  slug,
}: Pick<IcyJoseph.Post, "slug" | "tags">) => {
  const { data } = useSearch(tags);

  if (!data) return null;

  const related = data.hits.filter((post) => post.slug !== slug);

  if (related.length === 0) return null;

  return (
    <>
      <h2 className="mb-6 text-2xl">Related Posts</h2>

      {related.map((post) => {
        return <PostLink key={post.slug} post={post} />;
      })}
    </>
  );
};
