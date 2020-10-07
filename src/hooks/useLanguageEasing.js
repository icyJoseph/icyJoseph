import { useEasing, easeInQuad } from "use-easing";

export function useLanguageEasing({ code, blanks, comments, duration = 3 }) {
  const totalCode = code + blanks + comments;

  const { value } = useEasing({
    end: code,
    duration,
    easingFn: easeInQuad,
    formatFn: (e) => parseInt(e)
  });

  const percentage = (value / totalCode) * 100;

  return { value, percentage };
}
