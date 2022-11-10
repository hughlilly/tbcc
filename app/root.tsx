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
          id="navigation"
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
            id="navlinks"
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
      {children}
      <footer>&copy; 2022 Telugu Badminton Club of Canterbury</footer>
    </>
  );
}
