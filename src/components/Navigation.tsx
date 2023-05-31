import Link from "next/link";

import { ActiveLink } from "components/ActiveLinks";
import { entries } from "config/pages";

export const Navigation = () => {
  return (
    <header className="px-4 py-5 w-full md:px-0 md:w-4/5 mx-auto max-w-7xl">
      <nav className="font-sans flex flex-col sm:flex-row py-3 my-0">
        <div className="flex-auto font-bold text-xl px-3 sm:px-0 uppercase">
          <Link href="/" className="hover:text-pale-yellow transition-colors">
            <span className="block">icyJoseph</span>
            <span className="block text-base font-semibold">
              Señor Developer
            </span>
          </Link>
        </div>

        <div className="hidden flex-auto mx-auto sm:flex" />

        <ul className="flex justify-evenly items-center mt-5 sm:mt-0 gap-12">
          {entries.map(({ title, href }) => (
            <li
              key={title}
              className="inline-flex flex-1 justify-center sm:justify-end"
            >
              <ActiveLink href={href} className="hover:text-pale-yellow">
                <span>{title}</span>
              </ActiveLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
