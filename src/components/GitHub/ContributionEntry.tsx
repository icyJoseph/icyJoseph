import { useId } from "react";

import { ExternalLinkIcon } from "design-system/ExternalLinkIcon";
import { IndicatorBar } from "design-system/IndicatorBar";
import { Text } from "design-system/Text";
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
      className="h-full grid grid-rows-[auto_1fr_auto] w-full md:w-4/5 lg:w-3/5 mx-auto"
      aria-labelledby={headingId}
    >
      <header>
        <Text $textColor="--yellow">#{index + 1}</Text>

        <Text
          as="h4"
          id={headingId}
          className="font-semibold"
          $fontSize="1.25rem"
        >
          {repository.name}
        </Text>

        <Text className="pt-5" $fontWeight={300} $fontSize="1.25rem">
          +{contributions.totalCount} <span>commits</span>
        </Text>
      </header>

      <section aria-label="Repository description" className="pt-5">
        <Text
          $fontWeight={300}
          $fontSize="1.125rem"
          style={{ overflowWrap: "anywhere" }}
        >
          {repoDescription}
        </Text>
      </section>

      <footer className="pt-5">
        <Text className="mb-4">Languages</Text>

        <ul className="mb-4 flex flex-wrap gap-x-10 gap-y-4">
          {languages.map(({ node: { color, name } /* percentage */ }) => (
            <li key={name}>
              <IndicatorBar
                color={color}
                // percentage={percentage}
                aria-hidden="true"
                className="mr-2 align-middle"
              />

              <Text as="span" $fontWeight={300} mb={1}>
                {name}
              </Text>
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
                  <Text as="span" aria-hidden="true" $fontSize="1rem">
                    Code
                  </Text>

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
                  <Text as="span" aria-hidden="true" $fontSize="1rem">
                    Homepage
                  </Text>

                  <VisuallyHidden>
                    External link to {repository.name} homepage
                  </VisuallyHidden>
                  <ExternalLinkIcon />
                </a>
              )}
            </li>
            {!hasHomepageLink && !hasRepositoryLink && (
              <li>
                <span aria-hidden="true">&nbsp;</span>
                <VisuallyHidden>
                  <Text>{repository.name} has no links</Text>
                </VisuallyHidden>
              </li>
            )}
          </ul>
        </nav>
      </footer>
    </article>
  );
};
