import Link from "next/link";

import { entries } from "config/pages";

export const Navigation = () => {
  return (
    <header className="px-4 w-full md:px-0 md:w-4/5 mx-auto max-w-7xl">
      <nav className="font-sans flex flex-col sm:flex-row py-3 my-0">
        <div className="flex-auto font-bold text-xl px-3 sm:px-0 uppercase">
          <Link href="/" className="group focus:text-pale-blue">
            <span className="block hover:text-pale-green transition-colors">
              icyJoseph
            </span>
            <span className="block text-base font-semibold text-pale-green group-focus:text-pale-blue">
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
              <Link href={href}>
                <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
