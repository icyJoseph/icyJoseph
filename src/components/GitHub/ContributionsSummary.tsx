import { memo } from "react";

import { Flex } from "design-system/Flex";
import { Text } from "design-system/Text";

type BaseContributionsSummaryProps = {
  totalRepositoryContributions: number;
  totalCommitContributions: number;
  restrictedContributionsCount: number;
  totalRepositoriesContributedTo: number;
};

export const ContributionsSummary = memo(function ContributionsSummary({
  totalRepositoryContributions,
  totalCommitContributions,
  restrictedContributionsCount,
  totalRepositoriesContributedTo
}: BaseContributionsSummaryProps) {
  return (
    <Flex flexDirection="column" alignItems="stretch" mt={3} mx="auto">
      {[
        {
          value: totalRepositoryContributions,
          label: "Newly created repositories",
          unit: "repos"
        },
        {
          value: totalRepositoriesContributedTo,
          label: "Repositories contributed to",
          unit: "repos"
        },
        {
          value: restrictedContributionsCount,
          label: "Private contributions",
          unit: "commits"
        },
        {
          value: totalCommitContributions,
          label: "Total contributions",
          unit: "commits"
        }
      ].map(({ value, label, unit }) => (
        <Flex
          key={label}
          mb={3}
          alignItems="flex-end"
          justifyContent="space-between"
          gap="2rem"
        >
          <Flex flex={1}>
            <Text $textAlign="start" $fontWeight={300}>
              {label}
            </Text>
          </Flex>

          <Flex flex={1} flexDirection="column" alignItems="flex-end">
            <Text $fontWeight={300} $fontSize="3rem">
              {value}
            </Text>{" "}
            <Text $fontWeight={300}>{unit}</Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
});
