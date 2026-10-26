import Link from "next/link";

import { ActiveLink } from "components/ActiveLink";
import { getNavEntries } from "config/pages";

export const Navigation = async () => {
  const entries = await getNavEntries();

  return (
    <header className="site-nav px-4 py-5 w-full md:px-0 md:w-4/5 mx-auto max-w-7xl">
      <nav
        className="site-nav__hud font-sans flex flex-col items-start py-3 my-0 gap-2"
        aria-label="Primary"
      >
        <Link href="/" className="site-nav__brand group inline-block">
          <span className="site-nav__name block text-xl font-bold uppercase tracking-wide">
            icyJoseph
          </span>
        </Link>

        <ul className="site-nav__menu flex flex-wrap items-center gap-3 sm:gap-4">
          {entries.map(({ title, href }) => (
            <li key={title} className="inline-flex">
              <ActiveLink
                href={href}
                className="site-nav__link"
                prefetch={
                  href === "/blog" || href.startsWith("/contributions/")
                    ? true
                    : undefined
                }
              >
                <span className="site-nav__link-label">{title}</span>
              </ActiveLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
