import { useEffect, useRef } from "react";

export const useLastNonNullableValue = <T>(value: T, fallback: T): T => {
  const ref = useRef(value || fallback);

  useEffect(() => {
    if (value) {
      ref.current = value;
    }
  }, [value]);

  return ref.current;
};
