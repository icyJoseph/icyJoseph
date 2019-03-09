import React, { useLayoutEffect, useState } from "react";
import Fallback from "../Fallback";

export function Online({ children }) {
  const { onLine } = window.navigator;
  const [online, setOnline] = useState(onLine);

  const isOnline = () => setOnline(true);
  const isOffline = () => setOnline(false);

  useLayoutEffect(() => {
    window.addEventListener("online", isOnline);
    window.addEventListener("offline", isOffline);
    return () => {
      window.removeEventListener("online", isOnline);
      window.removeEventListener("offline", isOffline);
    };
  }, []);

  return online ? children : <Fallback />;
}

export default Online;
