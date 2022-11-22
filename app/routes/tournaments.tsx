import { Outlet } from "@remix-run/react";
import Hero from "~/shared/components/hero";

export const tournamentsSectionName = "Tournaments";

export default function TournamentsRoute() {
  return (
    <div id="laws-page-content">
      <Hero text={`${tournamentsSectionName}`} page="tournaments" />
      <Outlet />
    </div>
  );
}
