"use client";

import type { ComponentPropsWithoutRef } from "react";

import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export const ActiveLink = (
  props: ComponentPropsWithoutRef<"a"> & { href: LinkProps["href"] }
) => {
  const pathname = usePathname();
  const isActive = props.href === pathname;
  return (
    <Link
      {...props}
      className={classNames(
        props.className,
        "transition-colors",
        isActive && "text-pale-orange underline"
      )}
    />
  );
};
