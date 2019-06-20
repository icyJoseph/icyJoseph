import { useState, useEffect } from "react";

function useDebounce(query, delay) {
  const [state, setState] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      return setState(query);
    }, 250);
    return () => clearTimeout(timer);
  }, [query, delay]);

  return state;
}

export default useDebounce;
