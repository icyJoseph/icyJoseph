import Link from "next/link";

import { entries } from "config/pages";

export const Navigation = () => {
  return (
    <header className="font-[sans-serif] max-w-[85ch] mx-auto">
      <nav className="font-sans flex flex-col sm:flex-row py-3 my-0">
        <div className="font-bold text-xl px-3 sm:px-0 uppercase">
          <Link href="/">
            <p>icyJoseph</p>
            <span className="block text-base font-semibold">
              Señor Developer
            </span>
          </Link>
        </div>

        <div className="hidden flex-auto mx-auto sm:flex" />

        <ul className="flex flex-auto justify-evenly items-center mt-5 sm:mt-0">
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
