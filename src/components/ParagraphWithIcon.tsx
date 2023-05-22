import { type ReactNode, type FC } from "react";

import classNames from "classnames";

import { type IconProps } from "design-system/Icons";

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
      "font-sans flex flex-col mx-auto my-12 md:my-10 gap-6 text-lg",
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
