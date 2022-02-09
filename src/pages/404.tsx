import { Container } from "design-system/Container";
import { Flex } from "design-system/Flex";
import { Text } from "design-system/Text";

export const NotFound = () => {
  return (
    <Container>
      <Flex
        py="15%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text as="h1" $fontSize="3rem">
          404 Not found
        </Text>
      </Flex>
    </Container>
  );
};

export default NotFound;
