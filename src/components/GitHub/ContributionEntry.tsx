import { useId } from "react";

import { ExternalLinkIcon } from "design-system/ExternalLinkIcon";
import { IndicatorBar } from "design-system/IndicatorBar";
import { VisuallyHidden } from "design-system/VisuallyHidden";

const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;

const isLanguageEdge = (
  edge: IcyJoseph.LanguageEdge | null
): edge is IcyJoseph.LanguageEdge => Boolean(edge);

type ContributionCardProps = {
  id: string;
  repository: IcyJoseph.Repository;
  index: number;
  contributions: { totalCount: number };
};

export const ContributionEntry = ({
  repository,
  index,
  contributions,
}: ContributionCardProps) => {
  const headingId = useId();

  const repoDescription = repository.description
    ? repository.description.replace(RE_EMOJI, "")
    : `${repository.name} has no description.`;

  const hasRepositoryLink = Boolean(repository.url);
  const hasHomepageLink = Boolean(repository.homepageUrl);

  const languages = repository.languages.edges.filter(isLanguageEdge);

  return (
    <article
      className="h-full grid grid-rows-[auto_1fr_auto] w-full md:w-4/5 lg:w-3/5 mx-auto font-sans"
      aria-labelledby={headingId}
    >
      <header>
        <p className="text-pale-orange text-xl">#{index + 1}</p>

        <h4 id={headingId} className="font-medium text-xl">
          {repository.name}
        </h4>

        <p className="pt-5 text-xl font-light">
          +{contributions.totalCount} <span>commits</span>
        </p>
      </header>

      <section aria-label="Repository description" className="pt-5">
        <p className="font-light text-lg" style={{ overflowWrap: "anywhere" }}>
          {repoDescription}
        </p>
      </section>

      <footer className="pt-5">
        <h5 className="mb-4 text-base">Languages</h5>

        <ul className="mb-4 flex flex-wrap gap-x-8 gap-y-4">
          {languages.map(({ node: { color, name } }) => (
            <li key={name}>
              <IndicatorBar
                color={color}
                aria-hidden="true"
                className="mr-2 align-middle"
              />

              <span className="font-light mb-1 text-lg">{name}</span>
            </li>
          ))}
        </ul>

        <nav className="pt-5">
          <ul className="flex flex-wrap gap-x-10">
            <li className="empty:hidden">
              {hasRepositoryLink && (
                <a
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span aria-hidden="true" className="text-base">
                    Code
                  </span>

                  <VisuallyHidden>
                    External link to {repository.name} Github repository
                  </VisuallyHidden>
                  <ExternalLinkIcon />
                </a>
              )}
            </li>

            <li className="empty:hidden">
              {hasHomepageLink && (
                <a
                  href={repository.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span aria-hidden="true" className="text-base">
                    Homepage
                  </span>

                  <VisuallyHidden>
                    External link to {repository.name} homepage
                  </VisuallyHidden>
                  <ExternalLinkIcon />
                </a>
              )}
            </li>
            {!hasHomepageLink && !hasRepositoryLink && (
              <li>
                <span aria-hidden="true" className="text-base">
                  &nbsp;
                </span>
                <VisuallyHidden>{repository.name} has no links</VisuallyHidden>
              </li>
            )}
          </ul>
        </nav>
      </footer>
    </article>
  );
};
