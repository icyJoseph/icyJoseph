import type { ReactNode } from "react";

import { BlogChrome } from "components/Blog/BlogChrome";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <BlogChrome>{children}</BlogChrome>;
}
