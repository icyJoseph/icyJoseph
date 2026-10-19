import { ExternalLinkIcon } from "design-system/External";
import { IndicatorBar } from "design-system/IndicatorBar";
import { VisuallyHidden } from "design-system/VisuallyHidden";
import { ICY_JOSEPH } from "lib/github/constants";
import type { AggregatedContribution } from "lib/github/utils";

const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;

const isLanguageEdge = (
  edge: IcyJoseph.LanguageEdge | null
): edge is IcyJoseph.LanguageEdge => Boolean(edge);

type EnrichedContribution = AggregatedContribution & {
  formattedYearBreakdown: string;
};

type ContributionEntryProps = {
  item: EnrichedContribution;
  index?: number;
  total?: number;
};

export const ContributionEntry = ({
  item,
  index,
  total,
}: ContributionEntryProps) => {
  const repo = item.repository;
  const isOwned = repo.owner.login === ICY_JOSEPH;
  const languages = repo.languages.edges.filter(isLanguageEdge);
  const hasRepositoryLink = Boolean(repo.url);
  const hasHomepageLink = Boolean(repo.homepageUrl);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          {typeof index === "number" && typeof total === "number" && (
            <span className="text-xs font-light text-leaf/70">
              {index + 1}/{total}
            </span>
          )}
          <h4 className="text-lg font-medium text-paper-warm overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            {hasRepositoryLink ? (
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-warm hover:text-flare-wet transition-colors"
              >
                {repo.name}
              </a>
            ) : (
              repo.name
            )}
          </h4>
        </div>

        {!isOwned && (
          <p className="text-[0.7rem] text-flare-wet capitalize mt-0.5">
            {repo.owner.login}
          </p>
        )}

        {typeof repo.stargazerCount === "number" && repo.stargazerCount > 0 && (
          <p className="text-[0.7rem] font-light text-paper-cool mt-0.5">
            ★ {repo.stargazerCount.toLocaleString()} stars
          </p>
        )}

        {repo.description && (
          <p className="text-sm font-light text-leaf mt-1.5">
            {repo.description.replace(RE_EMOJI, "")}
          </p>
        )}

        {languages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1.5">
            {languages.slice(0, 3).map(({ node: { name, color } }) => (
              <span key={name} className="text-xs flex items-center gap-1">
                <IndicatorBar
                  color={color}
                  aria-hidden="true"
                  className="w-2 h-2"
                />
                {name}
              </span>
            ))}
            {languages.length > 3 && (
              <span className="text-xs text-leaf">
                +{languages.length - 3} more
              </span>
            )}
          </div>
        )}

        {item.totalContributions > 0 && (
          <p className="text-xs font-light text-flare mt-2">
            {item.totalContributions} commits{" "}
            {item.formattedYearBreakdown && (
              <span className="text-[0.7rem] text-leaf">
                ({item.formattedYearBreakdown})
              </span>
            )}
          </p>
        )}
      </div>

      <div className="flex gap-4 text-xs items-center">
        {hasHomepageLink && (
          <a
            href={repo.homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-flare-wet hover:text-flare-glow flex items-center gap-1"
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
            className="text-flare-wet hover:text-flare-glow flex items-center gap-1"
          >
            <span aria-hidden="true">Code</span>
            <VisuallyHidden>
              External link to {repo.name} Github repository
            </VisuallyHidden>
            <ExternalLinkIcon />
          </a>
        )}
        {!hasHomepageLink && !hasRepositoryLink && (
          <span aria-hidden="true" className="text-flare-wet">
            &nbsp;
          </span>
        )}
        {!hasHomepageLink && !hasRepositoryLink && (
          <VisuallyHidden>{repo.name} has no links</VisuallyHidden>
        )}
      </div>
    </div>
  );
};
