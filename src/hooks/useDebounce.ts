import { useState, useEffect } from "react";

export function useDebounce<Value>(value: Value, delay = 500) {
  const [state, setState] = useState<Value>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      return setState(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return state;
}

export default useDebounce;
