import type { ReactNode } from "react";

export const Search = ({ children }: { children: ReactNode | ReactNode[] }) => {
  // if search... render search result, otherwise render children
  return <>{children}</>;
};
