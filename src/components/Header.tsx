import { SectionHeader } from "design-system/Section";
import { Text } from "design-system/Text";

export const Header = ({ name, title }: { name: string; title: string }) => (
  <SectionHeader id={name} mb={3}>
    <Text as="h2" $fontSize="1.875rem">
      <a href={`#${name}`}>
        <code>{title}</code>
      </a>
    </Text>
  </SectionHeader>
);
