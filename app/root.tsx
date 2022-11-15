import type { MetaFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react';
import { useEffect } from 'react';

import styles from './styles/tailwind.css';
import Header from './shared/components/header';
import Footer from './shared/components/footer';

export const siteTitle = 'Telugu Badminton Club of Canterbury';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: siteTitle,
  viewport: 'width=device-width,initial-scale=1',
});

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
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

export function Layout({ children }: any) {
  return (
    <div id="layout" className="flex min-h-screen w-screen grow flex-col">
      <Header />
      <main className="flex grow flex-col">{children}</main>
      <Footer />
    </div>
  );
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
          className="container flex min-h-[75vh] flex-col justify-around py-24 px-5 sm:py-36"
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
          className="m-auto mt-20 mb-5 flex min-h-[20rem] flex-col justify-between sm:m-auto"
        >
          <div
            id="error-apology"
            className="flex flex-col gap-y-5 p-10 text-center text-sm font-bold leading-[1.10rem] sm:px-28 md:px-48 lg:px-96"
          >
            <p>
              We're sorry. The content you were looking for has been removed or is
              otherwise no longer available.
            </p>
            <p>
              Try using the navigation menu above, or{' '}
              <Link to="/contact" className="text-blue-600">
                contact us
              </Link>{' '}
              for help.
            </p>
          </div>
          <div
            id="technical-data"
            className="self-end pr-5 text-right font-mono text-[0.5rem] uppercase text-[#595959] sm:pr-8 sm:pb-5 sm:text-[0.65rem]"
          >
            error {caught.status}: {caught.statusText} <br />
            {new Date().toUTCString()}
          </div>
        </div>
      </Layout>
    </Document>
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
