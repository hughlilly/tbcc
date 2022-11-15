import { Link, NavLink } from '@remix-run/react';
import { siteTitle } from '~/root';

export default function Header() {
  return (
    <header className="flex h-32 w-full">
      <nav
        id="main-navigation"
        className="flex w-full flex-row items-center justify-between p-5 font-bold md:px-16 lg:px-24 "
      >
        {/* See https://tailwindcss.com/docs/line-height#overriding-default-line-heights */}
        <Link
          id="wordmark"
          to="/"
          className="w-[14ch] text-sm leading-4 sm:text-lg  sm:leading-5 sm:max-md:w-[10ch]"
        >
          {siteTitle}
        </Link>
        <div
          id="main-navlinks"
          className="hidden flex-row justify-between gap-x-5 text-sm text-purple sm:flex"
        >
          <NavLink
            to="/about"
            className="hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            About
          </NavLink>
          <NavLink
            to="/tournaments"
            className="hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            Tournaments
          </NavLink>
          <NavLink
            to="/laws"
            className="hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            Badminton Laws
          </NavLink>
          <NavLink
            to="/training"
            className="hover:underline hover:decoration-2 hover:underline-offset-4 sm:max-md:hidden"
          >
            Training Materials
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
