import type { SearchResponse } from "meilisearch";
import React, { ReactNode, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { PostLink } from "./PostLink";

const useSearch = (query: string | null) => {
  return useSWRImmutable<SearchResponse<IcyJoseph.Post>>(query, (q) =>
    fetch(`/api/search?q=${encodeURIComponent(q)}`).then((res) => res.json())
  );
};

export const Search = ({
  children
}: {
  children?: ReactNode | ReactNode[];
}) => {
  const [text /*, setText*/] = useState("");

  const query = text.length > 2 ? text : "";

  const { data } = useSearch(query);

  return (
    <>
      {query ? (
        <div>
          {data?.hits.map((post) => {
            return (
              <PostLink key={post.slug} post={post}>
                <em>...{post._formatted?.content}...</em>
              </PostLink>
            );
          })}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
