import { useRef, useCallback } from "react";

type onVisibleChange = (
  visible: boolean,
  observer?: IntersectionObserver
) => void;

const options: IntersectionObserverInit = { threshold: 1.0 };

export function useVisibleSubscription<
  Element extends HTMLElement = HTMLElement,
>() {
  const ref = useRef<Element>(null);

  const subscribe = useCallback(
    (onChange?: onVisibleChange, opts?: IntersectionObserverInit) => {
      const element = ref.current;

      if (!element) return;

      const observer = new IntersectionObserver(
        (entries, reference) => {
          const [entry] = entries;

          onChange?.(entry.isIntersecting, reference);
        },
        { ...options, ...opts }
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    },
    []
  );

  return [ref, subscribe] as const;
}
