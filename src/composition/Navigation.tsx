import Link from "next/link";

import { Container } from "design-system/Container";
import { Emoji } from "design-system/Emoji";
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
          {entries.map(({ title, symbol, ariaLabel, href }) => (
            <LinkItem key={title}>
              <Link href={href}>
                <a>
                  <span>{title}</span>
                  <Emoji
                    title={title}
                    symbol={symbol}
                    ariaLabel={ariaLabel}
                    ml={1}
                  />
                </a>
              </Link>
            </LinkItem>
          ))}
        </LinkList>
      </Nav>
    </Container>
  );
};
