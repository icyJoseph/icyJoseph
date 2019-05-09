import React, { useEffect, useState } from "react";
import Placeholder from "../Placeholder";

export function Online({ children }) {
  const { onLine } = window.navigator;
  const [online, setOnline] = useState(onLine);

  const isOnline = () => setOnline(true);
  const isOffline = () => setOnline(false);

  useEffect(() => {
    window.addEventListener("online", isOnline);
    window.addEventListener("offline", isOffline);
    return () => {
      window.removeEventListener("online", isOnline);
      window.removeEventListener("offline", isOffline);
    };
  }, []);

  return online ? children : <Placeholder situation="Offline" />;
}

export default Online;
