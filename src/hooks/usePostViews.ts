import { useEffect, useState } from "react";

import { isRecord, visits } from "count-api";

export const usePostViews = (slug: string) => {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    visits(slug, controller.signal)
      .then(({ json }) => {
        if (isRecord(json)) {
          const { value } = json;

          if (typeof value !== "number") return;

          setViews(Number(value));
        }
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        console.warn("Error while getting post views");
      });

    return () => {
      controller.abort();
    };
  }, [slug]);

  return views;
};
