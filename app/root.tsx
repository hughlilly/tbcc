import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
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

        {/*Enable live reload in development environment only, not production */}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

export function Layout({ children }: any) {
  return (
    <>
      <header>
        <nav>
          <div className="text-xl">
            <Link to="/">Telugu Badminton Club of Canterbury</Link>
          </div>
        </nav>
      </header>
      {children}
      <footer>&copy; 2022 Telugu Badminton Club of Canterbury</footer>
    </>
  );
}
