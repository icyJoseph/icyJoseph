import { type ReactNode, useId } from "react";

export const Introduction = ({ children }: { children: ReactNode }) => {
  const h1HeadingId = useId();

  return (
    <section
      className="font-sans flex flex-col justify-center items-center pt-20 pb-28"
      aria-labelledby={h1HeadingId}
    >
      <h1 id={h1HeadingId} className="text-center text-4xl font-light my-8">
        Joseph <span className="sr-only">Software Developer</span>
      </h1>

      {children}
    </section>
  );
};
