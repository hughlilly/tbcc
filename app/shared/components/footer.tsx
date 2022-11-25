import { NavLink } from "@remix-run/react";
import { siteTitle } from "~/root";

export default function Footer() {
  return (
    <footer className="flex w-screen flex-col bg-purple p-10 sm:flex-row sm:px-20 md:px-40 lg:px-80">
      <nav
        id="footer-navigation"
        className="flex w-full flex-col justify-between gap-y-7 text-white sm:flex-row sm:flex-wrap"
      >
        <div id="footer-wordmark-icon" className="flex justify-between">
          <div
            id="wordmark"
            className="w-[10ch] cursor-default items-center text-sm font-bold leading-[0.95rem] text-footerWordmark sm:text-[1.15rem] sm:leading-5"
          >
            {/* See https://tailwindcss.com/docs/line-height#overriding-default-line-heights */}
            {siteTitle}
          </div>
          <div
            id="footer-icon-mobile"
            className="self-center sm:hidden"
          >
            <img
              src="/badminton.png"
              height="40px"
              width="40px"
              alt="Badminton icon"
              className=""
            />
          </div>
        </div>

        <div
          id="navlinks"
          className="flex justify-start gap-x-6 sm:justify-between sm:gap-x-10 sm:self-end"
        >
          <div
            id="footer-navlinks-main"
            className="flex flex-col gap-y-1 text-xs font-[500] text-sitemapLink"
          >
            <NavLink className="hover:text-white" to="/about">
              About
            </NavLink>
            <NavLink className="hover:text-white" to="/tournaments">
              Tournaments
            </NavLink>
            <NavLink className="hover:text-white" to="/laws">
              Badminton Laws
            </NavLink>
            <NavLink className="hover:text-white" to="/training">
              Training Materials
            </NavLink>
          </div>
          <div
            id="footer-navlinks-extra"
            className="flex flex-col gap-y-[0.15rem] self-end text-xs font-[500] text-sitemapLink sm:gap-y-1"
          >
            <NavLink className="hover:text-white" to="/contact">
              Contact
            </NavLink>
            <NavLink className="hover:text-white" to="/privacy-policy">
              Privacy Policy
            </NavLink>
          </div>
        </div>
        <div
          id="footer-icon-desktop"
          className="hidden self-end sm:block"
        >
          <img
            src="/badminton.png"
            height="40px"
            width="40px"
            alt="Badminton icon"
          />
        </div>
      </nav>
    </footer>
  );
}
