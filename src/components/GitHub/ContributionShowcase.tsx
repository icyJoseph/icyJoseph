"use client";
import { useState, useMemo, memo } from "react";

import { ContributionEntry } from "components/GitHub/ContributionEntry";
import { Showcase } from "components/Showcase";
import { ToggleSwitch } from "components/ToggleSwitch";
import chevron from "design-system/chevron.module.css";
import type { Contribution } from "components/GitHub/YearlyContribution";

const BackIcon = <i className={chevron.chevronLeft} aria-hidden="true" />;
const FwdIcon = <i className={chevron.chevronRight} aria-hidden="true" />;
const MemoContributionEntry = memo(ContributionEntry);

type ContributionShowcaseProps = {
  external?: Contribution[];
  owned: Contribution[];
  year: number;
};

export const ContributionShowcase = ({
  external,
  owned,
  year,
}: ContributionShowcaseProps) => {
  const [externalFirst, setExternalFirst] = useState(true);

  const hasExternalContributions = Boolean(external && external?.length !== 0);

  const commitContributionsByRepositoryWithId = useMemo(() => {
    const items = externalFirst
      ? [...(external ?? []), ...owned]
      : [...owned, ...(external ?? [])];

    return items.map((item, index) => ({
      index,
      id: item.repository.id,
      ...item,
    }));
  }, [external, owned, externalFirst]);

  return (
    <>
      <div className="my-4">
        <ToggleSwitch
          label="Sort external first"
          checked={hasExternalContributions && externalFirst}
          disabled={!hasExternalContributions}
          onChange={(event) => setExternalFirst(event.target.checked)}
        />
      </div>

      <Showcase
        key={externalFirst ? `${year}-external-first` : `${year}-normal`} // reset carousel when year changes or sorting
        ariaLabel={`Repository contributions in ${year}`}
        Component={MemoContributionEntry}
        items={commitContributionsByRepositoryWithId}
        backIcon={BackIcon}
        forwardIcon={FwdIcon}
      />
    </>
  );
};
