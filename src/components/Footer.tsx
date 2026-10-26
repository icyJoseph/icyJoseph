import { cacheLife } from "next/cache";
import Link from "next/link";

import { getNavEntries } from "config/pages";

const techStack = [
  "Next.js",
  "React",
  "WebGPU",
  "GitHub GraphQL API",
  "Fitbit API",
  "Tailwind CSS",
  "MDX",
  "Recursive",
];

const externalLinks = [
  { href: "https://github.com/icyJoseph", title: "GitHub" },
  { href: "https://www.linkedin.com/in/icyjoseph", title: "LinkedIn" },
  { href: "https://dev.to/icyjoseph", title: "dev.to" },
  { href: "https://medium.com/@icjoseph", title: "Medium" },
];

async function FooterCopy() {
  "use cache";
  cacheLife("max");
  return (
    <p className="site-footer__copy">
      © {new Date().getFullYear()}{" "}
      <span className="site-footer__copy-name">icyJoseph</span> — Stockholm,
      Sweden
    </p>
  );
}

export const Footer = async () => {
  const [entries, copy] = await Promise.all([getNavEntries(), FooterCopy()]);

  return (
    <footer className="site-footer">
      <div className="site-footer__rule" aria-hidden />

      <h2 className="site-footer__brand">
        icyJoseph
        <span className="site-footer__tagline block">Señor Developer</span>
      </h2>

      <div className="site-footer__columns">
        <div className="site-footer__col">
          <h3 className="site-footer__heading">Tech Stack</h3>
          <ul className="site-footer__list">
            {techStack.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </div>

        <nav className="site-footer__col site-footer__col--end" aria-label="Footer">
          <h3 className="site-footer__heading">Links</h3>
          <ul className="site-footer__list">
            {entries.map(({ href, title }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="site-footer__link"
                  prefetch={
                    href === "/blog" || href.startsWith("/contributions/")
                      ? true
                      : undefined
                  }
                >
                  {title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/design" className="site-footer__link">
                Design system
              </Link>
            </li>
            {externalLinks.map(({ href, title }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="site-footer__link"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {copy}
    </footer>
  );
};
