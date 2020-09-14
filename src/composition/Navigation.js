import Link from "next/link";

import { Emoji } from "components/Emoji";
import { NavBar } from "components/NavBar";

export const entries = [
  {
    symbol: "🏠",
    href: "/",
    ariaLabel: "Navigate Home",
    title: "Home"
  },
  {
    symbol: "📰",
    href: "/posts",
    ariaLabel: "Navigate to Posts",
    title: "Posts"
  },
  {
    symbol: "👨🏽‍💻",
    href: "/contact",
    ariaLabel: "Navigate to contact info",
    title: "Contact"
  }
];

export const Navigation = () => {
  return (
    <header>
      <NavBar>
        <NavBar.Brand>
          <hgroup>
            <h1>icyJoseph</h1>
            <h6>Señor Developer</h6>
          </hgroup>
        </NavBar.Brand>
        <NavBar.Spacer />
        <NavBar.LinkList>
          {entries.map(({ title, symbol, ariaLabel, href }) => (
            <NavBar.LinkItem key={title} tabIndex="1">
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
            </NavBar.LinkItem>
          ))}
        </NavBar.LinkList>
      </NavBar>
    </header>
  );
};
