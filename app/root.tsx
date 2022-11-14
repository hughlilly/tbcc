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
  useCatch,
} from "@remix-run/react";
import { useEffect } from "react";

import styles from "./styles/tailwind.css";

export const siteTitle = "Telugu Badminton Club of Canterbury";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: siteTitle,
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function ErrorBoundary({ error }: any) {
  console.log(error);
  return (
    <Document>
      <Layout>
        <div
          id="error-message"
          className="flex flex-col justify-between py-32 min-h-[22rem]"
        >
          <h1 className="font-bold text-center">Error</h1>
          <p className="font-mono text-xs mx-auto">{error.message}</p>
        </div>
      </Layout>
    </Document>
  );
}

// See https://remix.run/docs/en/v1/guides/not-found#root-catch-boundary
export function CatchBoundary() {
  const caught = useCatch();
  useEffect(() => {
    document.title = `${
      caught.status
    } ${caught.statusText.toLocaleLowerCase()} | ${siteTitle}`;
  }, [caught]);
  return (
    <Document>
      <Layout>
        <div
          id="error-msg"
          className="flex flex-col justify-between min-h-[20rem] flex-wrap m-auto"
        >
          <div
            id="error-apology"
            className="flex flex-col gap-y-5 leading-5 text-md font-bold text-center"
          >
            <p className="max-w-[20rem]">
              We're sorry. The content you were looking for has been removed or
              is otherwise no longer available.
            </p>
            <p className="max-w-[20rem]">
              Try using the navigation menu above, or{" "}
              <Link to="/contact">contact us</Link> for help.
            </p>
          </div>
          <div
            id="technical-data"
            className="self-end text-right text-[0.65rem] text-[#595959] font-mono uppercase"
          >
            error {caught.status}: {caught.statusText} <br />
            {new Date().toUTCString()}
          </div>
        </div>
      </Layout>
    </Document>
  );
}

function Header() {
  return (
    <header className="flex w-full">
      <nav
        id="main-navigation"
        className="flex flex-row w-full justify-between px-3 md:px-32 py-3 md:py-10 font-bold"
      >
        {/* See https://tailwindcss.com/docs/line-height#overriding-default-line-heights */}
        <Link
          id="wordmark"
          to="/"
          className="text-sm leading-4 sm:text-lg sm:leading-5  w-[14ch] sm:max-md:w-[10ch]"
        >
          {siteTitle}
        </Link>
        <div
          id="main-navlinks"
          className="hidden sm:flex flex-row justify-between items-center gap-x-5 text-purple text-sm"
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
  );
}

function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row w-screen py-10 px-10 sm:px-20 md:px-40 lg:px-80 bg-purple">
      <nav
        id="footer-navigation"
        className="flex flex-col sm:flex-row sm:flex-wrap justify-between w-full gap-y-7 text-white"
      >
        <div id="footer-wordmark-icon" className="flex justify-between">
          <div
            id="wordmark"
            className="text-footerWordmark text-sm leading-[0.95rem] sm:text-[1.15rem] sm:leading-5 font-bold cursor-default w-[10ch] items-center"
          >
            {/* See https://tailwindcss.com/docs/line-height#overriding-default-line-heights */}
            {siteTitle}
          </div>
          <div id="footer-icon-mobile" className="sm:hidden self-center">
            <img
              src={"icons/badminton.png"}
              height={"40px"}
              width={"40px"}
              alt={"Badminton icon"}
              className=""
            />
          </div>
        </div>

        <div
          id="navlinks"
          className="flex justify-between sm:self-end gap-x-10"
        >
          <div
            id="footer-navlinks-main"
            className="flex flex-col gap-y-1 text-sitemapLink text-xs font-[500]"
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
            className="flex flex-col gap-y-[0.15rem] sm:gap-y-1 self-end text-sitemapLink text-xs font-[500]"
          >
            <NavLink className="hover:text-white" to="/contact">
              Contact
            </NavLink>
            <NavLink className="hover:text-white" to="/privacy-policy">
              Privacy Policy
            </NavLink>
          </div>
        </div>
        <div id="footer-icon-desktop" className="hidden sm:block self-end">
          <img
            src={"icons/badminton.png"}
            height={"40px"}
            width={"40px"}
            alt={"Badminton icon"}
          />
        </div>
      </nav>
    </footer>
  );
}

export function Layout({ children }: any) {
  return (
    <div id="layout" className="flex min-h-screen w-screen grow flex-col">
      <Header />
      <main className="flex flex-col grow container mx-auto">{children}</main>
      <Footer />
    </div>
  );
}

export function Document({ children }: any) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}
