import { useEffect } from "react";
import { useEasing } from "use-easing";
import { easeInQuad } from "use-easing/lib/easings";

const timeBase = 400;

type LanguageEasingProps = {
  code: number;
  blanks: number;
  comments: number;
  duration: number;
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
  const timeFactor = (order + 1) * timeBase;

  const { value, setTrigger } = useEasing<number>({
    end: code,
    duration,
    formatFn: (e) => Math.trunc(e),
    easingFn: easeInQuad,
    autoStart: false
  });

  useEffect(() => {
    const timer = setTimeout(() => setTrigger(true), timeFactor);
    return () => clearTimeout(timer);
  }, []);

  const percentage = (value / totalCode) * 100;

  return { value, percentage };
}
