import { Flex } from "design-system/Flex";
import { Text } from "design-system/Text";

const techStack = [
  "GitHub's GraphQL API",
  "CodeWars' REST API",
  "Fitbit's API",
  "Tokei",
  "React",
  "NodeJS",
  "Next.js",
  "Recursive Font Face"
];

export const TechStack = () => (
  <Flex flex={1} flexDirection="column">
    <Text as="h3">Tech Stack</Text>

    <ul>
      {techStack.map((entry) => (
        <Text key={entry} as="li" my={2} $fontWeight={300}>
          {entry}
        </Text>
      ))}
    </ul>
  </Flex>
);
