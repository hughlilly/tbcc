import { Outlet } from "@remix-run/react";

export default function TournamentsRoute() {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
}
