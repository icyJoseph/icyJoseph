import React, { createContext, useContext, useEffect, useState } from "react";

const OnlineCtx = createContext();

export function useOnline() {
  const value = useContext(OnlineCtx);
  return value;
}

export function Online({ children }) {
  const { onLine } = window.navigator;
  const [online, setOnline] = useState(onLine);

  useEffect(() => {
    const isOnline = () => setOnline(true);
    const isOffline = () => setOnline(false);
    window.addEventListener("online", isOnline);
    window.addEventListener("offline", isOffline);

    return () => {
      window.removeEventListener("online", isOnline);
      window.removeEventListener("offline", isOffline);
    };
  }, []);

  // TODO: remove placeholder to inject context instead
  return <OnlineCtx.Provider value={online}>{children}</OnlineCtx.Provider>;
}

export default Online;
