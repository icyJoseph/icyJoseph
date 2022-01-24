import { useEffect } from "react";

import { trunc } from "helpers";
import { useEasing } from "use-easing";
import { easeInQuad } from "use-easing/lib/easings";

const timeBase = 750;

type LanguageEasingProps = Omit<IcyJoseph.Tokei, "language" | "inaccurate"> & {
  duration?: number;
  order: number;
};

export function useLanguageEasing({
  code,
  blanks,
  comments,
  duration = 3,
  order
}: LanguageEasingProps) {
  const totalCode = code + blanks + comments;

  const { value, setTrigger } = useEasing<number>({
    end: code,
    duration,
    formatFn: (e) => trunc(e),
    easingFn: easeInQuad,
    autoStart: false
  });

  useEffect(() => {
    const timeFactor = (order + 1) * timeBase;
    const timer = window.setTimeout(() => setTrigger(true), timeFactor);

    return () => window.clearTimeout(timer);
  }, [setTrigger, order]);

  const percentage = (value / totalCode) * 100;

  return { value, percentage };
}
