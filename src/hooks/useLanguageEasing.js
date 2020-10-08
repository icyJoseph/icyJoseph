import { useEffect } from "react";
import { useEasing, easeInQuad } from "use-easing";

const timeBase = 400;

export function useLanguageEasing({
  code,
  blanks,
  comments,
  duration = 3,
  order
}) {
  const totalCode = code + blanks + comments;
  const timeFactor = (order + 1) * timeBase;

  const { value, setTrigger } = useEasing({
    end: code,
    duration,
    easingFn: easeInQuad,
    formatFn: (e) => parseInt(e),
    autoStart: false
  });

  useEffect(() => {
    let timer = setTimeout(() => setTrigger(true), timeFactor);
    return () => clearTimeout(timer);
  }, []);

  const percentage = (value / totalCode) * 100;

  return { value, percentage };
}
