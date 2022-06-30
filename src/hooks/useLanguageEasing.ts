import { useEffect } from "react";

import { useEasing } from "use-easing";
import { easeInQuad } from "use-easing/lib/easings";

import { trunc } from "helpers";

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
  order,
}: LanguageEasingProps) {
  const totalCode = code + blanks + comments;

  const { value, setTrigger } = useEasing<number>({
    end: code,
    duration,
    formatFn: (e) => trunc(e),
    easingFn: easeInQuad,
    autoStart: false,
  });

  useEffect(() => {
    let timer: number;

    const handler = () => {
      const timeFactor = (order + 1) * timeBase;
      timer = window.setTimeout(() => setTrigger(true), timeFactor);

      window.removeEventListener("scroll", handler);
    };

    window.addEventListener("scroll", handler, { once: true });

    return () => {
      window.removeEventListener("scroll", handler);

      window.clearTimeout(timer);
    };
  }, [setTrigger, order]);

  const percentage = (value / totalCode) * 100;

  return { value, percentage };
}
