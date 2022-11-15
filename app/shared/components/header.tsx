import { Link, NavLink } from '@remix-run/react';
import { useState } from 'react';
import { siteTitle } from '~/root';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="flex flex-col">
      <div id="menu-top" className="flex h-20 w-full flex-col sm:h-32 sm:flex-row">
        <nav
          id="main-navigation"
          className="flex w-full items-center justify-between p-6 font-bold md:px-16 lg:px-24"
        >
          {/* See https://tailwindcss.com/docs/line-height#overriding-default-line-heights */}
          <Link
            id="wordmark"
            to="/"
            className="w-[14ch] text-sm leading-4 sm:text-lg sm:leading-5 sm:max-md:w-[10ch]"
          >
            {siteTitle}
          </Link>
          <section
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
          </section>
          <div
            id="hamburger-icon"
            className={`${isNavOpen ? 'hidden' : 'block'} space-y-1 pr-1 sm:hidden`}
            onClick={() => setIsNavOpen((state) => !state)}
          >
            <span className="block h-0.5 w-5 bg-neutral-800"></span>
            <span className="block h-0.5 w-5 bg-neutral-800"></span>
            <span className="block h-0.5 w-5 bg-neutral-800"></span>
          </div>
          <div
            id="cross-icon"
            className={`${isNavOpen ? 'flex' : 'hidden'} sm:hidden`}
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              className="h-8 w-7 fill-neutral-800"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </nav>
      </div>
      <section
        id="mobile-menu"
        className={`h-[calc(100vh-5rem)] flex-col items-center justify-around border-t-[1px] border-t-neutral-300 p-10 py-20 text-sm font-bold text-purple sm:hidden 
          ${isNavOpen ? 'flex' : 'hidden'} `}
      >
        <NavLink to="/about">About</NavLink>
        <NavLink to="/tournaments">Tournaments</NavLink>
        <NavLink to="/laws">Badminton Laws</NavLink>
        <NavLink to="/training">Training Materials</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </section>
    </header>
  );
}
