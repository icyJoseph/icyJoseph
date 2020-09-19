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
          <h1>icyJoseph</h1>
          <span>Señor Developer</span>
        </NavBar.Brand>
        <NavBar.Spacer />
        <NavBar.LinkList>
          {entries.map(({ title, symbol, ariaLabel, href }) => (
            <NavBar.LinkItem key={title}>
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
