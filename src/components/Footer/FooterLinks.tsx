import Link from "next/link";

import { Flex } from "design-system/Flex";
import { Text } from "design-system/Text";

import { entries } from "config/pages";

const externalLinks = [
  {
    href: "https://github.com/icyJoseph",
    title: "GitHub"
  },
  {
    href: "https://www.linkedin.com/in/icyjoseph",
    title: "LinkedIn"
  },
  {
    href: "https://dev.to/icyjoseph",
    title: "dev.to"
  },
  {
    href: "https://medium.com/@icjoseph",
    title: "Medium"
  }
];

export const FooterLinks = () => (
  <Flex as="nav" flex={1} flexDirection="column" alignItems="end">
    <Text as="h3">Hot Links</Text>

    <ul>
      {entries.map(({ href, title }) => (
        <Text key={href} as="li" my={2} $fontWeight={300} $textAlign="end">
          <Link href={href}>
            <a>{title}</a>
          </Link>
        </Text>
      ))}

      {externalLinks.map(({ href, title }) => (
        <Text key={href} as="li" my={2} $fontWeight={300} $textAlign="end">
          <a href={href} target="_blank" rel="noreferrer noopener">
            {title}
          </a>
        </Text>
      ))}
    </ul>
  </Flex>
);
