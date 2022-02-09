import { BaseCard, Header, Section, CardProps } from "design-system/Card";

export const Card = (props: CardProps) => <BaseCard {...props} />;

Card.Header = Header;

Card.Section = Section;
