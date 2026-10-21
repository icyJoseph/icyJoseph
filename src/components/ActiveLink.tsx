"use client";

import type { ComponentPropsWithoutRef } from "react";

import classNames from "classnames";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type ActiveLinkProps = Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps> &
  LinkProps;

export const ActiveLink = (props: ActiveLinkProps) => {
  const pathname = usePathname();
  const href = typeof props.href === "string" ? props.href : "";
  const isActive =
    href === "/"
      ? pathname === "/"
      : href.startsWith("/contributions/")
        ? pathname === "/contributions" ||
          pathname.startsWith("/contributions/")
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
