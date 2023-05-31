"use client";

import { useEffect, useState } from "react";

import { useVisibleSubscription } from "hooks/useVisibleSubscription";

const postView = ({ slug }: { slug: string }, signal: AbortSignal) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  return window.fetch("/views", {
    method: "POST",
    body: JSON.stringify({ slug }),
    headers,
    signal,
  });
};

export const CountView = ({ slug }: { slug: string }) => {
  const [fuse, setFuse] = useState(false);
  const [ref, subscribe] = useVisibleSubscription<HTMLDivElement>();

  useEffect(() => {
    if (fuse) return;
    const controller = new AbortController();
    const unsub = subscribe(() => {
      postView({ slug }, controller.signal).then(() => setFuse(true));
    });

    return () => {
      controller.abort();
      unsub?.();
    };
  }, [subscribe, slug, fuse]);

  return <div ref={ref} />;
};
