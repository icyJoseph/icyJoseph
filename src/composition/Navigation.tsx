import Link from "next/link";

import { Container } from "design-system/Container";
import {
  Nav,
  Brand,
  Spacer,
  LinkList,
  LinkItem
} from "design-system/Navigation";

import { entries } from "config/pages";

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
