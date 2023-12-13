"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useVisibleSubscription } from "hooks/useVisibleSubscription";

const postView = async ({ slug }: { slug: string }, signal: AbortSignal) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  await fetch("/views", {
    method: "POST",
    body: JSON.stringify({ slug }),
    headers,
    signal,
  }).then((res) => res.json());
};

export const CountView = ({ slug }: { slug: string }) => {
  const [fuse, setFuse] = useState(false);
  const [ref, subscribe] = useVisibleSubscription<HTMLDivElement>();

  const router = useRouter();
  useEffect(() => {
    if (fuse) return;
    const controller = new AbortController();
    const unsub = subscribe((isVisible) => {
      if (!isVisible) return;

      postView({ slug }, controller.signal)
        .then(() => setFuse(true))
        .then(() => {
          router.refresh();
        });
    });

    return () => {
      controller.abort();
      unsub?.();
    };
  }, [subscribe, slug, fuse, router]);

  return <div ref={ref} />;
};
