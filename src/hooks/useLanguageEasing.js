import { useEasing, easeOutQuad } from "use-easing";

export function useLanguageEasing({ code, blanks, comments, duration = 3 }) {
  const totalCode = code + blanks + comments;

  const { value } = useEasing({
    end: code,
    duration,
    easingFn: easeOutQuad,
    formatFn: (e) => parseInt(e)
  });

  const percentage = Math.floor((value / totalCode) * 100);

  return { value, percentage };
}
