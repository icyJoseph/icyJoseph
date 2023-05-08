"use client";

import { usePostViews } from "hooks/usePostViews";

export const PostViews = ({ slug }: { slug: string }) => {
  const views = usePostViews(slug);

  return (
    <p className="text-end font-light">
      <span className="text-3xl">{views}</span> <span>views</span>
    </p>
  );
};
