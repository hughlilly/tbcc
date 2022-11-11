import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/app.css";

export const siteTitle = "Telugu Badminton Club of Canterbury";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: siteTitle,
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>

      <body>
        <Layout>
          <Outlet />
        </Layout>

        <ScrollRestoration />
        <Scripts />

        <LiveReload />
      </body>
    </html>
  );
}

export function Layout({ children }: any) {
  return (
    <>
      <header>
        <nav
          id="main-navigation"
          className="flex justify-between sm:p-10 px-5 py-8 font-bold"
        >
          {/* See https://tailwindcss.com/docs/line-height#overriding-default-line-heights */}
          <Link
            id="wordmark"
            to="/"
            className="text-lg leading-5 sm:text-xl sm:leading-5 md:text-2xl md:leading-6 lg:text-[1.75rem] lg:leading-7 w-[14ch] sm:max-md:w-[10ch]"
          >
            {siteTitle}
          </Link>
          <div
            id="main-navlinks"
            className="hidden sm:flex flex-row items-center gap-5 text-purple text-sm"
          >
            <NavLink
              to="/about"
              className="hover:underline hover:underline-offset-4 hover:decoration-2"
            >
              About
            </NavLink>
            <NavLink
              to="/tournaments"
              className="hover:underline hover:underline-offset-4 hover:decoration-2"
            >
              Tournaments
            </NavLink>
            <NavLink
              to="/laws"
              className="hover:underline hover:underline-offset-4 hover:decoration-2"
            >
              Badminton Laws
            </NavLink>
            <NavLink
              to="/training"
              className="sm:max-md:hidden hover:underline hover:underline-offset-4 hover:decoration-2"
            >
              Training Materials
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:underline hover:underline-offset-4 hover:decoration-2"
            >
              Contact
            </NavLink>
          </div>
        </nav>
      </header>

      <div className="">{children}</div>

      <footer className="fixed bottom-0 left-0 w-full grid items-center p-10 md:px-40 lg:px-80 md:py-10 lg:py-20 bg-purple min-h-[200px]">
        <nav
          id="footer-navigation"
          className="flex flex-col sm:flex-row gap-y-12 sm:gap-y-0 justify-between text-white"
        >
          <div className="flex items-center justify-between">
            {/* See https://tailwindcss.com/docs/line-height#overriding-default-line-heights */}
            <span
              id="wordmark"
              className="text-footerWordmark text-xl leading-5 sm:text-[1.15rem] sm:leading-5 font-bold cursor-default sm:grid self-center sm:self-end w-[10ch]"
            >
              {siteTitle}
            </span>
            <div id="footer-icon" className="sm:hidden">
              <img
                src={"icons/badminton.png"}
                height={"40px"}
                width={"40px"}
                alt={"Badminton icon"}
              />
            </div>
          </div>
          <div
            id="footer-navlinks"
            className="flex flex-row justify-between self-auto sm:gap-x-10 text-sitemapLink text-sm font-[500]"
          >
            <div
              id="footer-navlinks-main"
              className="inline-flex flex-col self-end"
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
              className="inline-flex flex-col self-end"
            >
              <NavLink className="hover:text-white" to="/contact">
                Contact
              </NavLink>
              <NavLink className="hover:text-white" to="/privacy-policy">
                Privacy Policy
              </NavLink>
            </div>
          </div>
          <div id="footer-icon" className="hidden sm:grid self-center">
            <img
              src={"icons/badminton.png"}
              height={"40px"}
              width={"40px"}
              alt={"Badminton icon"}
            />
          </div>
        </nav>
      </footer>
    </>
  );
}
