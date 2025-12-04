"use client";

import type { ChangeEvent } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Select } from "components/Select";

export const YearSelectLabel = (
  <span className="text-2xl" aria-hidden="true">
    Repositories in
  </span>
);

export const YearSelect = ({
  contributionYears,
}: {
  contributionYears: number[];
}) => {
  const router = useRouter();

  const year = useSearchParams().get("year") ?? contributionYears[0];

  return (
    <Select
      label={YearSelectLabel}
      className="bg-soft-black underline font-[monospace]"
      value={year}
      onChange={handleYearChange}
      aria-label={`Navigate through repository contributions by year.`}
    >
      {contributionYears.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </Select>
  );

  function handleYearChange(event: ChangeEvent<HTMLSelectElement>) {
    const search = new URLSearchParams(window.location.search);

    const year = Number(event.target.value);

    if (year !== contributionYears[0]) {
      search.set("year", `${Number(event.target.value)}`);
    } else {
      search.delete("year");
    }

    const url = new URL(window.location.pathname, window.location.origin);
    url.search = search.toString();

    const destination = url.toString().replace(window.location.origin, "");

    router.push(destination, { scroll: false });
  }
};
