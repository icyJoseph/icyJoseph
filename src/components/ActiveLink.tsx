"use client";

import type { ComponentPropsWithoutRef } from "react";

import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export const ActiveLink = (
  props: ComponentPropsWithoutRef<"a"> & { href: LinkProps["href"] },
) => {
  const pathname = usePathname();
  const href = typeof props.href === "string" ? props.href : "";
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      {...props}
      aria-current={isActive ? "page" : undefined}
      className={classNames(
        props.className,
        "transition-colors",
        isActive && "site-nav__link--active",
      )}
    />
  );
};
