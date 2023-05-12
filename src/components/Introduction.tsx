import type { ReactNode } from "react";

export const Introduction = ({ children }: { children: ReactNode }) => {
  return (
    <section className="font-sans flex flex-col justify-center items-center pt-20 pb-28">
      {children}
    </section>
  );
};
