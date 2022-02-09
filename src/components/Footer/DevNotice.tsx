import { Box } from "design-system/Box";
import { Text } from "design-system/Text";

export const DevNotice = () => {
  return (
    <Box as="section" py={3}>
      <Text as="h3" mb={3}>
        Señor Developer
      </Text>

      <Text $fontWeight={300} mb={2}>
        I am a software developer at{" "}
        <Text
          as="a"
          href="https://evolvetechnology.se"
          target="_blank"
          rel="noreferrer noopener"
          $textColor="--yellow"
          $textDecoration="underline"
          $fontWeight={500}
        >
          Evolve Technology Sweden AB
        </Text>
        .
      </Text>

      <Text $fontWeight={300} mb={2}>
        We believe great software will actually change the world!{" "}
      </Text>

      <Text mb={2}>
        <Text
          as="a"
          href="https://evolvetechnology.se/en/contact"
          target="_blank"
          rel="noreferrer noopener"
          $textColor="--yellow"
          $textDecoration="underline"
          $fontWeight={500}
        >
          Contact us!
        </Text>
      </Text>
    </Box>
  );
};
