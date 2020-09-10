import { useState, useEffect } from "react";

export function useDebounce(query, delay) {
  const [state, setState] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      return setState(query);
    }, delay);
    return () => clearTimeout(timer);
  }, [query, delay]);

  return state;
}

export default useDebounce;
