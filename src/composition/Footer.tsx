import { DevNotice } from "components/Footer/DevNotice";
import { FooterLinks } from "components/Footer/FooterLinks";
import { TechStack } from "components/Footer/TechStack";
import { Divider } from "design-system/Divider";
import { Flex } from "design-system/Flex";
import { PageFooter } from "design-system/Footer";
import { Text } from "design-system/Text";

export const Footer = () => {
  return (
    <PageFooter>
      <section>
        <Divider mb={5} mt={0} />

        <Text as="h2" $fontSize="2rem">
          icyJoseph
        </Text>

        <DevNotice />

        <Flex justifyContent="space-between" gap="2rem">
          <TechStack />

          <FooterLinks />
        </Flex>

        <Text mx="auto" pt={5} $textAlign="center">
          &#169; {new Date().getFullYear()} icyJoseph AB - Gothenburg, Sweden
        </Text>
      </section>
    </PageFooter>
  );
};
