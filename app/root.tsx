import type { MetaFunction } from '@remix-run/node';
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
} from '@remix-run/react';
import { useEffect } from 'react';

import styles from './styles/tailwind.css';

export const siteTitle = 'Telugu Badminton Club of Canterbury';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: siteTitle,
  viewport: 'width=device-width,initial-scale=1',
});

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export function ErrorBoundary({ error }: any) {
  useEffect(() => {
    document.title = `Error | ${siteTitle}`;
  }, []);
  return (
    <Document>
      <Layout>
        <div
          role="alert"
          id="error-message"
          className="container flex min-h-[22rem] flex-col justify-between py-32"
        >
          <h1 className="text-center font-bold">Error</h1>
          <p className="mx-auto font-mono text-xs">{error.message}</p>
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
          className="m-auto flex min-h-[20rem] flex-col justify-between"
        >
          <div
            id="error-apology"
            className="flex flex-col gap-y-5 text-center font-bold leading-5"
          >
            <p className="max-w-[20rem]">
              We're sorry. The content you were looking for has been removed or is
              otherwise no longer available.
            </p>
            <p className="max-w-[20rem]">
              Try using the navigation menu above, or{' '}
              <Link to="/contact">contact us</Link> for help.
            </p>
          </div>
          <div
            id="technical-data"
            className="self-end text-right font-mono text-[0.65rem] uppercase text-[#595959]"
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

function Footer() {
  return (
    <footer className="flex w-screen flex-col bg-purple py-10 px-10 sm:flex-row sm:px-20 md:px-40 lg:px-80">
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
          <div id="footer-icon-mobile" className="self-center sm:hidden">
            <img
              src={'icons/badminton.png'}
              height={'40px'}
              width={'40px'}
              alt={'Badminton icon'}
              className=""
            />
          </div>
        </div>

        <div id="navlinks" className="flex justify-between gap-x-10 sm:self-end">
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
        <div id="footer-icon-desktop" className="hidden self-end sm:block">
          <img
            src={'icons/badminton.png'}
            height={'40px'}
            width={'40px'}
            alt={'Badminton icon'}
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
      <main className="flex grow flex-col">{children}</main>
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
