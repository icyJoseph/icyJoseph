"use server";

import { incrementViews, validateSlug } from "lib/views/client";

export const addView = async ({ slug }: { slug: string }) => {
  const validated = await validateSlug(slug);

  if (!validated) return;

  await incrementViews(validated);
};
