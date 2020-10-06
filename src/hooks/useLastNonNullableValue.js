import { useEffect, useRef } from "react";

export const useLastNonNullableValue = (value) => {
  const ref = useRef(value);

  useEffect(() => {
    if (value) {
      ref.current = value;
    }
  }, [value]);

  return ref.current;
};
