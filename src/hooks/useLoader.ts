import { useEffect, useRef } from "react";
import NProgress from "nprogress";

const createManager = () => {
  let current = 0;
  const subs: Set<symbol> = new Set();

  return {
    new() {
      const curr = current;
      current = current + 1;
      return Symbol(curr);
    },
    startLoader(sym: symbol) {
      if (subs.has(sym)) return;

      subs.add(sym);

      if (!NProgress.isStarted()) return NProgress.start();

      return;
    },
    endLoader(sym: symbol) {
      subs.delete(sym);

      if (NProgress.isStarted()) {
        if (subs.size === 0) NProgress.done();
        else NProgress.inc();
      }
    }
  };
};

const manager = createManager();

export const useLoader = <Data, Error>(data: Data, error: Error) => {
  const symbol = useRef(manager.new());

  const stale = !error && !data;

  useEffect(() => {
    if (error) manager.endLoader(symbol.current);
  }, [error]);

  useEffect(() => {
    if (stale) manager.startLoader(symbol.current);
    else manager.endLoader(symbol.current);
  }, [stale]);

  return null;
};
