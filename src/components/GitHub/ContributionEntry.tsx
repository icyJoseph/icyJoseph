import { ExternalLinkIcon } from "design-system/External";
import { IndicatorBar } from "design-system/IndicatorBar";
import { VisuallyHidden } from "design-system/VisuallyHidden";
import { ICY_JOSEPH } from "lib/github/constants";
import {
  mostRecentContributionYear,
  type AggregatedContribution,
} from "lib/github/utils";

const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;

const isLanguageEdge = (
  edge: IcyJoseph.LanguageEdge | null
): edge is IcyJoseph.LanguageEdge => Boolean(edge);

type EnrichedContribution = AggregatedContribution & {
  formattedYearBreakdown: string;
};

type ContributionEntryProps = {
  item: EnrichedContribution;
};

export const ContributionEntry = ({ item }: ContributionEntryProps) => {
  const repo = item.repository;
  const isOwned = repo.owner.login === ICY_JOSEPH;
  const languages = repo.languages.edges.filter(isLanguageEdge);
  const hasRepositoryLink = Boolean(repo.url);
  const hasHomepageLink = Boolean(repo.homepageUrl);
  const stars = repo.stargazerCount ?? 0;
  const latestYear = mostRecentContributionYear(item.contributionsByYear);
  const yearCount = Object.keys(item.contributionsByYear).length;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3 min-w-0">
        <h4 className="text-lg font-medium text-smoke-white min-w-0 break-words">
          {hasRepositoryLink ? (
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke-white hover:text-pale-yellow transition-colors"
            >
              {repo.name}
            </a>
          ) : (
            repo.name
          )}
        </h4>

        {stars > 0 && (
          <p className="shrink-0 text-sm tabular-nums text-pale-yellow">
            <span aria-hidden="true">★ </span>
            {stars.toLocaleString()}
            <VisuallyHidden> stars</VisuallyHidden>
          </p>
        )}
      </div>

      {!isOwned && (
        <p className="text-xs text-pale-blue capitalize">{repo.owner.login}</p>
      )}

      {repo.description && (
        <p className="text-sm font-light text-pale-orange">
          {repo.description.replace(RE_EMOJI, "")}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        {item.totalContributions > 0 && (
          <p className="font-light text-pale-red">
            {yearCount > 1 && item.formattedYearBreakdown ? (
              <>
                {item.totalContributions.toLocaleString()}{" "}
                {item.totalContributions === 1 ? "commit" : "commits"}
                <span className="text-pale-orange">
                  {" "}
                  ({item.formattedYearBreakdown})
                </span>
              </>
            ) : (
              <>
                {latestYear > 0 && (
                  <span className="text-pale-orange">{latestYear}</span>
                )}
                {latestYear > 0 && " · "}
                {item.totalContributions.toLocaleString()}{" "}
                {item.totalContributions === 1 ? "commit" : "commits"}
              </>
            )}
          </p>
        )}

        {languages.slice(0, 3).map(({ node: { name, color } }) => (
          <span key={name} className="flex items-center gap-1 text-pale-orange">
            <IndicatorBar
              color={color}
              aria-hidden="true"
              className="w-2 h-2"
            />
            {name}
          </span>
        ))}
        {languages.length > 3 && (
          <span className="text-pale-orange">+{languages.length - 3}</span>
        )}

        {hasHomepageLink && (
          <a
            href={repo.homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pale-blue hover:text-pale-yellow flex items-center gap-1"
          >
            <span aria-hidden="true">Homepage</span>
            <VisuallyHidden>
              External link to {repo.name} homepage
            </VisuallyHidden>
            <ExternalLinkIcon />
          </a>
        )}

        {hasRepositoryLink && (
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pale-blue hover:text-pale-yellow flex items-center gap-1"
          >
            <span aria-hidden="true">Code</span>
            <VisuallyHidden>
              External link to {repo.name} Github repository
            </VisuallyHidden>
            <ExternalLinkIcon />
          </a>
        )}
      </div>
    </div>
  );
};
