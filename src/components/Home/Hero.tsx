import Link from "next/link";

import { getNavEntries } from "config/pages";

export async function HomeHero() {
  const landingLinks = (await getNavEntries())
    .filter((entry) => entry.href !== "/")
    .map((entry) => ({
      href: entry.href,
      title: entry.title,
      prefetch:
        entry.href === "/blog" || entry.href.startsWith("/contributions/")
          ? (true as const)
          : undefined,
    }));

  return (
    <header className="home-hero">
      <p className="home-hero__brand">icyJoseph</p>
      <h1 className="home-hero__title">Señor Developer</h1>
      <p className="home-hero__line">
        Ten years building for the web. Now on Next.js education at Vercel: how
        people learn it, and how agents use it.{" "}
        <Link href="/blog/who-am-i" prefetch className="home-hero__whoami">
          @whoami
        </Link>
      </p>

      <nav className="home-hero__links" aria-label="Primary">
        {landingLinks.map(({ href, title, prefetch }) => (
          <Link
            key={href}
            href={href}
            className="home-hero__link"
            prefetch={prefetch}
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
