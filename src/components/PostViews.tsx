"use client";

import useSWR from "swr";

export const PostViews = ({ slug }: { slug: string }) => {
  const { data } = useSWR<number>(`blog/${slug}`, () =>
    fetch(`/views?slug=${slug}`).then((res) => res.json())
  );

  return (
    <p className="text-end font-light">
      <span className="text-3xl">{data || ".."}</span> <span>views</span>
    </p>
  );
};
