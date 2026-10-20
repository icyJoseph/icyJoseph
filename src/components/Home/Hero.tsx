import Link from "next/link";

import { entries } from "config/pages";

/** Destinations for the landing — topbar is hidden so the beam stays clear. */
const landingLinks = entries.filter((entry) => entry.href !== "/");

export function HomeHero() {
  return (
    <header className="home-hero">
      <p className="home-hero__brand">icyJoseph</p>
      <h1 className="home-hero__title">Señor Developer</h1>
      <p className="home-hero__line">
        Late light through the window. Still at the desk — shipping what others
        can see.
      </p>

      <nav className="home-hero__links" aria-label="Primary">
        {landingLinks.map(({ href, title }) => (
          <Link
            key={href}
            href={href}
            className="home-hero__link"
            prefetch={href === "/blog" ? true : undefined}
          >
            {title}
          </Link>
        ))}
        <a
          href="https://github.com/icyJoseph"
          className="home-hero__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
