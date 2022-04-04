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
            <a>
              <h1>icyJoseph</h1>
            </a>
          </Link>
          <span>Señor Developer</span>
        </Brand>

        <Spacer />

        <LinkList>
          {entries.map(({ title, href }) => (
            <LinkItem key={title}>
              <Link href={href}>
                <a>
                  <span>{title}</span>
                </a>
              </Link>
            </LinkItem>
          ))}
        </LinkList>
      </Nav>
    </Container>
  );
};
