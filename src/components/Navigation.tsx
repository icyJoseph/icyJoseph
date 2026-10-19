import Link from "next/link";

import { ActiveLink } from "components/ActiveLink";
import { entries } from "config/pages";

export const Navigation = () => {
  return (
    <header className="site-nav px-4 py-5 w-full md:px-0 md:w-4/5 mx-auto max-w-7xl">
      <nav
        className="site-nav__hud font-sans flex flex-col sm:flex-row py-3 my-0"
        aria-label="Primary"
      >
        <div className="flex-auto px-3 sm:px-0">
          <Link href="/" className="site-nav__brand group inline-block">
            <span className="site-nav__name block text-xl font-bold uppercase tracking-wide">
              icyJoseph
            </span>
            <span className="site-nav__tagline block text-base font-semibold">
              Señor Developer
            </span>
          </Link>
        </div>

        <div className="hidden flex-auto mx-auto sm:flex" />

        <ul className="site-nav__menu flex justify-evenly items-center mt-5 sm:mt-0 gap-3 sm:gap-4">
          {entries.map(({ title, href }, index) => {
            const slot = String(index + 1).padStart(2, "0");
            return (
              <li key={title} className="inline-flex">
                <ActiveLink
                  href={href}
                  className="site-nav__link"
                  data-slot={slot}
                >
                  <span className="site-nav__slot" aria-hidden>
                    {slot}
                  </span>
                  <span className="site-nav__link-label">{title}</span>
                </ActiveLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
