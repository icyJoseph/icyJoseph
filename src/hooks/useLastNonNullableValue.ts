import { useEffect, useRef } from "react";

export const useLastNonNullableValue = <T>(value: T): T => {
  const ref = useRef(value);

  useEffect(() => {
    if (value) {
      ref.current = value;
    }
  }, [value]);

  return ref.current;
};
