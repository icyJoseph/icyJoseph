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

function YearEyebrow() {
  return (
    <p className="contrib-year__eyebrow">
      <Link href="/" className="contrib-year__mute">
        ← icyJoseph
      </Link>
      <span className="mx-3 opacity-35">·</span>
      contributions
    </p>
  );
}

function YearNav({ years, year }: { years: number[]; year: number }) {
  return (
    <nav className="contrib-year__years" aria-label="Contribution years">
      <p className="contrib-year__years-label">Years</p>
      <div className="contrib-year__years-track">
        {years.map((y) => (
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
      </div>
    </nav>
  );
}

function YearRubric() {
  return (
    <p className="contrib-year__rubric">
      Public repos listed below. Private count comes from the GitHub API — some
      org work never appears here, even as private, when the org hides it.
    </p>
  );
}

/** Fixed-height slot so the count line doesn’t shove the rubric/nav. */
function SignalFallback() {
  return (
    <p className="contrib-year__signal contrib-year__signal--slot" aria-hidden>
      <span className="contrib-year__skel contrib-year__skel--inline" />
    </p>
  );
}

/** Same card chrome as the real grid — no fake chip/rubric swap. */
function ExploreFallback({ year }: { year: number }) {
  return (
    <div className="contrib-explore" aria-busy aria-label="Loading">
      <h3 className="contrib-explore__title">Work in {year}</h3>
      <h4 className="contrib-explore__section-label">Highlights</h4>
      <ul className="contrib-explore__grid contrib-explore__grid--highlights">
        {Array.from({ length: 2 }, (_, i) => (
          <li key={i}>
            <div className="contrib-card contrib-card--highlight contrib-card--skel" />
          </li>
        ))}
      </ul>
      <h4 className="contrib-explore__section-label">More from this year</h4>
      <ul className="contrib-explore__grid contrib-explore__grid--tiles">
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i}>
            <div className="contrib-card contrib-card--skel" />
          </li>
        ))}
      </ul>
    </div>
  );
}

async function YearSignal({ year }: { year: number }) {
  const [detail, currentYear] = await Promise.all([
    getContributionsForYear(year),
    getCurrentYear(),
  ]);
  if (!detail) notFound();

  const isCurrent = year === currentYear;

  return (
    <p className="contrib-year__signal contrib-year__signal--slot">
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
  );
}

async function YearExplore({ year }: { year: number }) {
  const detail = await getContributionsForYear(year);
  if (!detail) notFound();

  return (
    <ContributionsSection
      key={year}
      data={detail.aggregated}
      year={year}
    />
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

  const [years, calendarYear] = await Promise.all([
    getContributionYears(),
    getCurrentYear(),
  ]);
  if (!years.includes(year) && year !== calendarYear) notFound();

  const navYearList = years.includes(calendarYear)
    ? years
    : [calendarYear, ...years];

  return (
    <article className="contrib-year max-w-5xl mx-auto py-6">
      <header className="contrib-year__header mb-10">
        <YearEyebrow />
        <h1 className="contrib-year__title">{year}</h1>
        <Suspense fallback={<SignalFallback />}>
          <YearSignal year={year} />
        </Suspense>
        <YearRubric />
      </header>

      <YearNav years={navYearList} year={year} />

      <Suspense fallback={<ExploreFallback year={year} />}>
        <YearExplore year={year} />
      </Suspense>

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

/** Params only — keep tiny; real chrome waits for years list (cached). */
function ContributionYearFallback() {
  return (
    <article className="contrib-year max-w-5xl mx-auto py-6">
      <header className="contrib-year__header mb-10">
        <YearEyebrow />
        <div
          className="contrib-year__skel contrib-year__skel--title"
          aria-hidden
        />
        <SignalFallback />
        <YearRubric />
      </header>
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
