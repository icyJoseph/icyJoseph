import { Flex } from "components/Flex";
import { Section } from "components/Section";
import { Text } from "components/Text";

export const GitHub = () => {
  return (
    <Section my={3} px={2}>
      <header>
        <Text as="h2" color="--blue" fontSize="2rem">
          GitHub
        </Text>
      </header>
      <Flex as="main">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </Text>
      </Flex>
    </Section>
  );
};
