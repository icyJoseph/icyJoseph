import { ExternalLinkIcon } from "design-system/External";
import { IndicatorBar } from "design-system/IndicatorBar";
import { VisuallyHidden } from "design-system/VisuallyHidden";
import { formatCount } from "lib/format";
import { ICY_JOSEPH } from "lib/github/constants";
import type { AggregatedContribution } from "lib/github/utils";

const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;

const isLanguageEdge = (
  edge: IcyJoseph.LanguageEdge | null,
): edge is IcyJoseph.LanguageEdge => Boolean(edge);

type EnrichedContribution = AggregatedContribution & {
  formattedYearBreakdown: string;
};

type ContributionEntryProps = {
  item: EnrichedContribution;
  /** Featured highlight vs denser tile — same content, different hierarchy. */
  variant?: "highlight" | "tile";
  /** When set, show that year's commit count (page already names the year). */
  year?: number;
};

export const ContributionEntry = ({
  item,
  variant = "tile",
  year,
}: ContributionEntryProps) => {
  const repo = item.repository;
  const isOwned = repo.owner.login === ICY_JOSEPH;
  const languages = repo.languages.edges.filter(isLanguageEdge);
  const hasRepositoryLink = Boolean(repo.url);
  const hasHomepageLink = Boolean(repo.homepageUrl);
  const description = repo.description?.replace(RE_EMOJI, "").trim() ?? "";

  const commitsForYear =
    year != null ? item.contributionsByYear[year] : undefined;
  const commitLabel =
    commitsForYear != null && commitsForYear > 0
      ? `${formatCount(commitsForYear)} commits`
      : item.totalContributions > 0
        ? `${formatCount(item.totalContributions)} commits`
        : null;

  const rootClass =
    variant === "highlight"
      ? "contrib-card contrib-card--highlight"
      : "contrib-card";

  return (
    <article className={rootClass}>
      <div className="contrib-card__top">
        {!isOwned ? (
          <p className="contrib-card__owner">{repo.owner.login}</p>
        ) : null}

        <h4 className="contrib-card__name">
          {hasRepositoryLink ? (
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contrib-card__name-link"
            >
              {repo.name}
            </a>
          ) : (
            repo.name
          )}
        </h4>

        <p className="contrib-card__meta">
          {typeof repo.stargazerCount === "number" &&
          repo.stargazerCount > 0 ? (
            <span>★ {formatCount(repo.stargazerCount)}</span>
          ) : null}
          {typeof repo.stargazerCount === "number" &&
          repo.stargazerCount > 0 &&
          commitLabel ? (
            <span aria-hidden className="contrib-card__dot">
              ·
            </span>
          ) : null}
          {commitLabel ? <span>{commitLabel}</span> : null}
        </p>
      </div>

      <p
        className={
          description
            ? "contrib-card__desc"
            : "contrib-card__desc contrib-card__desc--empty"
        }
      >
        {description || "\u00a0"}
      </p>

      <div className="contrib-card__foot">
        {languages.length > 0 ? (
          <ul className="contrib-card__langs">
            {languages.slice(0, 2).map(({ node: { name, color } }) => (
              <li key={name} className="contrib-card__lang">
                <IndicatorBar
                  color={color}
                  aria-hidden
                  className="contrib-card__swatch"
                />
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <span className="contrib-card__langs-empty" />
        )}

        <div className="contrib-card__links">
          {hasHomepageLink ? (
            <a
              href={repo.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contrib-card__link"
            >
              <span aria-hidden>Home</span>
              <VisuallyHidden>
                External link to {repo.name} homepage
              </VisuallyHidden>
              <ExternalLinkIcon />
            </a>
          ) : null}
          {hasRepositoryLink ? (
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contrib-card__link"
            >
              <span aria-hidden>Code</span>
              <VisuallyHidden>
                External link to {repo.name} Github repository
              </VisuallyHidden>
              <ExternalLinkIcon />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};
