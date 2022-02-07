import { DevNotice } from "components/Footer/DevNotice";
import { TechStack } from "components/Footer/TechStack";
import { FooterLinks } from "components/Footer/FooterLinks";

import { Flex } from "design-system/Flex";
import { PageFooter } from "design-system/Footer";
import { Text } from "design-system/Text";

export const Footer = () => {
  return (
    <PageFooter>
      <section>
        <Text as="h2" $fontSize="2rem">
          icyJoseph
        </Text>

        <DevNotice />

        <Flex justifyContent="space-between" gap="2rem">
          <TechStack />

          <FooterLinks />
        </Flex>

        <Text mx="auto" py={3} $textAlign="center">
          &#169; {new Date().getFullYear()} icyJoseph AB - Gothenburg, Sweden
        </Text>
      </section>
    </PageFooter>
  );
};
