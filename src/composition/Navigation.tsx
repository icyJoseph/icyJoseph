import Link from "next/link";

import { entries } from "config/pages";
import { Container } from "design-system/Container";
import {
  Nav,
  Brand,
  Spacer,
  LinkList,
  LinkItem,
} from "design-system/Navigation";

export const Navigation = () => {
  return (
    <Container as="header">
      <Nav>
        <Brand>
          <Link href="/">
            <h1>icyJoseph</h1>
          </Link>
          <span>Señor Developer</span>
        </Brand>

        <Spacer />

        <LinkList>
          {entries.map(({ title, href }) => (
            <LinkItem key={title}>
              <Link href={href}>
                <span>{title}</span>
              </Link>
            </LinkItem>
          ))}
        </LinkList>
      </Nav>
    </Container>
  );
};
