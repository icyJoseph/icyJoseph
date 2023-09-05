"use client";

import { useState, useDeferredValue, type ChangeEventHandler } from "react";

import classNames from "classnames";

import { ContributionShowcase } from "components/GitHub/ContributionShowcase";
import { Select } from "components/Select";

type YearlyContributionProps = {
  initial: IcyJoseph.GitHub["contributionsCollection"];
  currentYear: number;
};

export const YearlyContribution = ({
  currentYear,
  initial,
}: YearlyContributionProps) => {
  const [selectedYear, setSelectedYear] = useState(
    initial.contributionYears[0]
  );

  const handleSelectYear: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const deferredYear = useDeferredValue(selectedYear);

  const isPending = selectedYear !== deferredYear;

  return (
    <div
      className={classNames(
        "w-full transition-opacity",
        isPending ? "opacity-50" : "opacity-100"
      )}
    >
      <div className={classNames("mt-8", "text-2xl")}>
        <Select
          label={
            <span className="text-2xl" aria-hidden="true">
              Repositories in
            </span>
          }
          className="bg-soft-black underline font-[monospace]"
          value={selectedYear}
          onChange={handleSelectYear}
          aria-label={`Navigate through repository contributions by year. Showing ${selectedYear}`}
        >
          {initial.contributionYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </div>

      <ContributionShowcase
        currentYear={currentYear}
        selectedYear={deferredYear}
        initial={initial}
      />
    </div>
  );
};

export default YearlyContribution;
