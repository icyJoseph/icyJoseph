import { memo } from "react";

import { ContributionEntry } from "components/GitHub/ContributionEntry";
import { Showcase } from "components/Showcase";
import chevron from "design-system/chevron.module.css";

const BackIcon = <i className={chevron.chevronLeft} aria-hidden="true" />;
const FwdIcon = <i className={chevron.chevronRight} aria-hidden="true" />;
const MemoContributionEntry = memo(ContributionEntry);

export const ContributionShowcase = ({
  year,
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
  return (
    <Showcase
      key={year} // reset carousel when year changes
      ariaLabel={`Repository contributions in ${year}`}
      Component={MemoContributionEntry}
      items={commitContributionsByRepository}
      backIcon={BackIcon}
      forwardIcon={FwdIcon}
    />
  );
};
