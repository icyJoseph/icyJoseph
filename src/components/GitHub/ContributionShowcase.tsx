"use client";

import { memo, useId } from "react";

import { ContributionEntry } from "components/GitHub/ContributionEntry";
import { Showcase } from "components/Showcase";
import chevron from "design-system/chevron.module.css";

const BackIcon = <i className={chevron.chevronLeft} aria-hidden="true" />;
const FwdIcon = <i className={chevron.chevronRight} aria-hidden="true" />;
const MemoContributionEntry = memo(ContributionEntry);

export const ContributionShowcase = ({
  //   year,
  commitContributionsByRepository,
}: {
  year: number;
  commitContributionsByRepository: {
    id: string;
    index: number;
    repository: IcyJoseph.Repository;
    contributions: {
      totalCount: number;
    };
  }[];
}) => {
  const headingId = useId();

  return (
    <>
      <h3 id={headingId} className="text-2xl mb-10 text-center">
        Repositories
      </h3>

      <Showcase
        labelledBy={headingId}
        Component={MemoContributionEntry}
        items={commitContributionsByRepository}
        backIcon={BackIcon}
        forwardIcon={FwdIcon}
      />
    </>
  );
};
