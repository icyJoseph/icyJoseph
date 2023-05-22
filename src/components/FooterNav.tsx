import Link from "next/link";

import { entries } from "config/pages";

const externalLinks = [
  {
    href: "https://github.com/icyJoseph",
    title: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/icyjoseph",
    title: "LinkedIn",
  },
  {
    href: "https://dev.to/icyjoseph",
    title: "dev.to",
  },
  {
    href: "https://medium.com/@icjoseph",
    title: "Medium",
  },
];

export const FooterLinks = () => (
  <nav className="flex flex-1 flex-col items-end">
    <h3 className="text-xl text-pale-yellow">Hot Links</h3>

    <ul>
      {entries.map(({ href, title }) => (
        <li key={href} className="my-3 font-light text-end">
          <Link href={href}>{title}</Link>
        </li>
      ))}

      {externalLinks.map(({ href, title }) => (
        <li key={href} className="my-3 font-light text-end">
          <a href={href} target="_blank" rel="noreferrer noopener">
            {title}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
