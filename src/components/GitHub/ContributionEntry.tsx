import { Box } from "design-system/Box";
import { DevIcon } from "design-system/DevIcon";
import { ExternalLinkIcon } from "design-system/ExternalLinkIcon";
import { Flex } from "design-system/Flex";
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
  const repoDescription = repository.description
    ? repository.description.replace(RE_EMOJI, "")
    : `${repository.name} has no description.`;

  const hasRepositoryLink = Boolean(repository.url);

  const languagePercentages = repository.languages.edges
    .filter(isLanguageEdge)
    .map((lang) => ({
      ...lang,
      percentage: Math.round(
        (100 * lang.size) / repository.languages.totalSize
      ),
    }))
    .filter((lang) => lang.percentage > 0);

  return (
    <Flex
      as="article"
      py={3}
      mx="auto"
      flexDirection="column"
      gap="1.5rem"
      flexWrap="nowrap"
    >
      <header>
        <Text $textColor="--yellow">#{index + 1}</Text>

        <Text as="h4" $fontWeight={300} $fontSize="2rem">
          {repository.name}
        </Text>
        <Text>{repository.owner.login}</Text>
      </header>

      <Text $fontWeight={300} $fontSize="2rem">
        +{contributions.totalCount}{" "}
        <Text as="span" $fontWeight={300}>
          commits
        </Text>
      </Text>

      <Box className="flex-1 basis-32">
        <Text
          $fontWeight={300}
          $fontSize="1.8rem"
          style={{ overflowWrap: "anywhere" }}
        >
          {repoDescription}
        </Text>
      </Box>

      {hasRepositoryLink && (
        <a href={repository.url} target="_blank" rel="noopener noreferrer">
          <Text as="span" aria-hidden="true">
            Repository
          </Text>

          <VisuallyHidden>
            External link to {repository.name} Github repository
          </VisuallyHidden>
          <ExternalLinkIcon />
        </a>
      )}

      <Flex as="footer" mt={3} flexDirection="column" flex={1}>
        {languagePercentages.map(({ node: { color, name }, percentage }) => (
          <Flex
            key={name}
            flexDirection="column"
            flex={1}
            justifyContent="flex-end"
            $width="50%"
          >
            <Text $fontWeight={300} mb={1}>
              <DevIcon color={color} language={name} mr={1} $fontSize="2rem" />

              <span>{name}</span>
            </Text>

            <IndicatorBar color={color} percentage={percentage} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
