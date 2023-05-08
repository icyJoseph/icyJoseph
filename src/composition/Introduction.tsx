import { type ReactNode, type FC, useId } from "react";

import classNames from "classnames";

import { type IconProps } from "components/Icons";

export const ParagraphWithIcon = ({
  className = "",
  Icon,
  children,
  reverse = false,
}: {
  className?: string;
  Icon: FC<IconProps>;
  children: ReactNode;
  reverse?: boolean;
}) => (
  <div
    className={classNames(
      "font-sans flex flex-col mx-auto my-12 md:my-10 gap-6",
      className,
      reverse ? "sm:flex-row-reverse" : "sm:flex-row"
    )}
  >
    <div className="flex justify-center items-center flex-1">
      <Icon size={32} />
    </div>

    <p className="flex-[2] font-light">{children}</p>
  </div>
);

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
