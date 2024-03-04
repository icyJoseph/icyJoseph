"use client";

import { useEffect } from "react";

import { addView } from "actions/addView";
import { useVisibleSubscription } from "hooks/useVisibleSubscription";

export const CountView = ({ slug }: { slug: string }) => {
  const [ref, subscribe] = useVisibleSubscription<HTMLDivElement>();

  useEffect(() => {
    const cleanUp = subscribe((isVisible, observer) => {
      if (!isVisible) return;

      addView({ slug }).then(() => observer?.disconnect());
    });

    return () => {
      cleanUp?.();
    };
  }, [subscribe, slug]);

  return <div ref={ref} />;
};
