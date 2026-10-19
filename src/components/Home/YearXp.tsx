import Link from "next/link";

import type { YearContributionTotal } from "lib/github/year-totals";

type YearXpProps = {
  years: YearContributionTotal[];
  careerTotal: number;
};

export function YearXp({ years, careerTotal }: YearXpProps) {
  if (years.length === 0) return null;

  const peak = Math.max(...years.map((y) => y.total), 1);
  const currentYear = new Date().getFullYear();

  return (
    <div className="home-xp" aria-label="Contributions by year">
      <p className="home-xp__career">
        <span className="home-human__stat">
          {careerTotal.toLocaleString("en-SE")}
        </span>{" "}
        career contributions
      </p>
      <p className="home-xp__rubric">
        Public + private via the GitHub API. {currentYear} is year-to-date.
        Some org work never shows up here — even as private — when the org
        hides it. Tap a year to explore repos.
      </p>

      <ol className="home-xp__list">
        {years.map((entry) => {
          const fill = Math.max(4, Math.round((entry.total / peak) * 100));
          const isCurrent = entry.year === currentYear;
          return (
            <li key={entry.year} className="home-xp__row">
              <Link
                href={`/contributions/${entry.year}`}
                className="home-xp__link"
                title={`Explore ${entry.year} · public ${entry.public} · private ${entry.private}`}
              >
                <span className="home-xp__year">
                  {entry.year}
                  {isCurrent ? (
                    <span className="home-xp__ytd" title="Year to date">
                      {" "}
                      ytd
                    </span>
                  ) : null}
                </span>
                <div
                  className="home-xp__bar"
                  role="meter"
                  aria-valuenow={entry.total}
                  aria-valuemin={0}
                  aria-valuemax={peak}
                  aria-label={`${entry.year}: ${entry.total} contributions${isCurrent ? " year to date" : ""}`}
                >
                  <span
                    className="home-xp__fill"
                    style={{ width: `${fill}%` }}
                  />
                </div>
                <span className="home-xp__total">
                  {entry.total.toLocaleString("en-SE")}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
