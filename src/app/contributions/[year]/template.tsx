import type { ReactNode } from "react";

/** Remount year segment on param change so client list state resets cleanly. */
export default function ContributionYearTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
