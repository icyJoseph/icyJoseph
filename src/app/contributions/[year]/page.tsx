import { Suspense } from "react";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContributionsSection } from "components/GitHub/ContributionsSection";
import { BackTo, BackToTop } from "design-system/BackToTop";
import { formatCount } from "lib/format";
import {
  getContributionYears,
  getContributionsForYear,
} from "lib/github/year-detail";
import { getCurrentYear } from "lib/time/current-year";

type PageProps = {
  params: Promise<{ year: string }>;
};

export const generateStaticParams = async () => {
  const years = await getContributionYears();
  return years.map((year) => ({ year: String(year) }));
};

export const generateMetadata = async (
  props: PageProps,
): Promise<Metadata> => {
  const { year: yearParam } = await props.params;
  const year = Number(yearParam);

  if (!Number.isFinite(year)) {
    return { title: "icyJoseph | Contributions" };
  }

  return {
    title: `icyJoseph | Contributions ${year}`,
    description: `Public GitHub contributions for ${year}, with private totals from the API.`,
  };
};

function ContributionYearFallback() {
  return (
    <article className="contrib-year max-w-5xl mx-auto py-6">
      <p className="contrib-year__eyebrow">
        <Link href="/" className="contrib-year__mute">
          ← icyJoseph
        </Link>
        <span className="mx-3 opacity-35">·</span>
        contributions
      </p>
      <p className="contrib-year__signal opacity-50 mt-6">Loading year…</p>
    </article>
  );
}

async function ContributionYearDetail({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearParam } = await params;
  const year = Number(yearParam);

  if (!Number.isFinite(year)) notFound();

  const [detail, currentYear] = await Promise.all([
    getContributionsForYear(year),
    getCurrentYear(),
  ]);
  if (!detail) notFound();

  const isCurrent = year === currentYear;

  return (
    <article className="contrib-year max-w-5xl mx-auto py-6">
      <header className="contrib-year__header mb-10">
        <p className="contrib-year__eyebrow">
          <Link href="/" className="contrib-year__mute">
            ← icyJoseph
          </Link>
          <span className="mx-3 opacity-35">·</span>
          contributions
        </p>
        <h1 className="contrib-year__title">{year}</h1>
        <p className="contrib-year__signal">
          <span className="contrib-year__stat">{formatCount(detail.total)}</span>{" "}
          contributions
          {isCurrent ? (
            <span className="contrib-year__ytd"> year to date</span>
          ) : null}
          <span className="contrib-year__hint">
            {" "}
            · public {formatCount(detail.publicTotal)} · private{" "}
            {formatCount(detail.privateTotal)}
          </span>
        </p>
        <p className="contrib-year__rubric">
          Public repos listed below. Private count comes from the GitHub API —
          some org work never appears here, even as private, when the org hides
          it.
        </p>
      </header>

      <nav className="contrib-year__years" aria-label="Contribution years">
        {detail.years.map((y) => (
          <Link
            key={y}
            href={`/contributions/${y}`}
            className={
              y === year
                ? "contrib-year__chip contrib-year__chip--active"
                : "contrib-year__chip"
            }
            aria-current={y === year ? "page" : undefined}
            prefetch
          >
            {y}
          </Link>
        ))}
      </nav>

      <ContributionsSection
        key={year}
        data={detail.aggregated}
        privateContributions={detail.privateTotal}
        year={year}
      />

      <div className="flex flex-wrap justify-between gap-x-4 mt-12">
        <BackTo
          to="/"
          label="Back to home"
          linkClassName="!text-flare-wet blog-entry__nav-link"
        />
        <BackToTop linkClassName="!text-flare-wet blog-entry__nav-link" />
      </div>
    </article>
  );
}

export default function ContributionYearPage(props: PageProps) {
  return (
    <Suspense fallback={<ContributionYearFallback />}>
      <ContributionYearDetail params={props.params} />
    </Suspense>
  );
}
