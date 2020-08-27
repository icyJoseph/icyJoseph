import { Flex } from "components/Flex";
import { Section } from "components/Section";
import { Text } from "components/Text";

export const GitHub = ({ initial }) => {
  console.log(initial);
  return (
    <Section my={3} px={2}>
      <header>
        <Text as="h2" color="--blue" fontSize="2rem">
          GitHub
        </Text>
      </header>
      <Flex as="main">
        <Text>{initial.bio}</Text>
      </Flex>
    </Section>
  );
};
