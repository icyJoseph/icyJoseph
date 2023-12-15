"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { addView } from "actions/addView";
import { useVisibleSubscription } from "hooks/useVisibleSubscription";

export const CountView = ({ slug }: { slug: string }) => {
  const [fuse, setFuse] = useState(false);
  const [ref, subscribe] = useVisibleSubscription<HTMLDivElement>();

  const router = useRouter();
  useEffect(() => {
    if (fuse) return;

    const unsub = subscribe((isVisible) => {
      if (!isVisible) return;

      addView({ slug }).then(() => setFuse(true));
    });

    return () => {
      unsub?.();
    };
  }, [subscribe, slug, fuse, router]);

  return <div ref={ref} />;
};
