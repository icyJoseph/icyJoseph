import { useId } from "react";

import classNames from "classnames";

import { ExternalLinkIcon } from "design-system/External";
import { IndicatorBar } from "design-system/IndicatorBar";
import { VisuallyHidden } from "design-system/VisuallyHidden";
import { ICY_JOSEPH } from "lib/github/constants";

const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;

const isLanguageEdge = (
  edge: IcyJoseph.LanguageEdge | null
): edge is IcyJoseph.LanguageEdge => Boolean(edge);

export type ContributionCardProps = {
  id: string;
  repository: Pick<
    IcyJoseph.Repository,
    "name" | "description" | "languages" | "homepageUrl" | "url" | "owner"
  >;
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
      className={classNames(
        "grid grid-rows-[1fr_1fr_auto]",
        "h-full w-full md:w-4/5 lg:w-2/3 mx-auto p-4",
        "font-sans",
        "bg-zinc-900 border border-zinc-700 rounded-lg"
      )}
      aria-labelledby={headingId}
    >
      <header>
        <div className="flex justify-between flex-nowrap">
          <p className="text-pale-orange">#{index + 1}</p>

          <aside
            className={classNames(
              "text-pale-blue capitalize",
              repository.owner.login === ICY_JOSEPH && "invisible"
            )}
          >
            {repository.owner.login}
          </aside>
        </div>

        <h3 id={headingId} className="font-medium text-xl pt-4">
          {repository.name}
        </h3>

        <p
          className={classNames(
            "pt-5 text-xl font-light",
            contributions.totalCount === 0 && "invisible"
          )}
        >
          +{contributions.totalCount} <span>commits</span>
        </p>
      </header>

      <section aria-label="Repository description" className="pt-5">
        <p className="font-light text-lg" style={{ overflowWrap: "anywhere" }}>
          {repoDescription}
        </p>
      </section>

      <footer className="pt-5">
        <h4
          className={classNames(
            "mb-4 text-base",
            languages.length === 0 && "invisible"
          )}
        >
          Languages
        </h4>

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
