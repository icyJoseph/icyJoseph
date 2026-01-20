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
};

export const ContributionEntry = ({ item }: ContributionEntryProps) => {
  const repo = item.repository;
  const isOwned = repo.owner.login === ICY_JOSEPH;
  const languages = repo.languages.edges.filter(isLanguageEdge);
  const hasRepositoryLink = Boolean(repo.url);
  const hasHomepageLink = Boolean(repo.homepageUrl);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex-1">
        <h4 className="text-lg font-medium text-smoke-white">{repo.name}</h4>

        {!isOwned && (
          <p className="text-xs text-pale-blue capitalize mt-0.5">
            {repo.owner.login}
          </p>
        )}

        {item.totalContributions > 0 && (
          <p className="text-xs font-light text-pale-red mt-1">
            {item.totalContributions} commits{" "}
            {item.formattedYearBreakdown && (
              <span className="text-[0.7rem] text-pale-orange">
                ({item.formattedYearBreakdown})
              </span>
            )}
          </p>
        )}

        {typeof repo.stargazerCount === "number" && repo.stargazerCount > 0 && (
          <p className="text-[0.7rem] font-light text-smoke-white/70 mt-0.5">
            ★ {repo.stargazerCount.toLocaleString()} stars
          </p>
        )}

        {repo.description && (
          <p className="text-sm font-light text-pale-orange mt-1">
            {repo.description.replace(RE_EMOJI, "")}
          </p>
        )}

        {languages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
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
              <span className="text-xs text-pale-orange">
                +{languages.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3 text-sm">
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
        {!hasHomepageLink && !hasRepositoryLink && (
          <span aria-hidden="true" className="text-pale-blue">
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
