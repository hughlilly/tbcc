import { useLoaderData, NavLink } from "@remix-run/react";
import { checkStatus, checkEnvVars } from "~/utils/errorHandling";
import { siteTitle } from "~/root";
import Hero from "~/shared/components/hero";
import { tournamentsSectionName } from "./index";

export function meta({ data }: any): { title: string } {
  return {
    title: `${data.attributes.title} | ${tournamentsSectionName} | ${siteTitle}`,
  };
}

export async function loader({ params }: any) {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/tournaments` +
      `?populate=*&filters[slug]=${params.tournamentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Handle HTTP response code < 200 or >= 300
  checkStatus(res);

  const data = await res.json();

  // Did Strapi return an error object in its response?
  if (data.error) {
    console.error("Error", data.error);
    throw new Response("Error getting data from Strapi", {
      status: 500,
    });
  }

  // Did Strapi return an empty list?
  if (!data.data || data.data.length === 0) {
    console.error(data);
    throw new Response("Not Found", { status: 404 });
  }

  const tournament = data.data[0];

  // For a tournament with no photos, replace API returned null with an empty array
  tournament.attributes.photos.data =
    tournament.attributes.photos.data ?? [];

  // Handle image URL being returned as just a path with no scheme and host.
  // When storing media on the filesystem (Strapi's default), media URLs are
  // returned as only a URL path. When storing media using Cloudinary, as we do
  // in production, media URLs are returned as full URLs.
  for (const photo of tournament.attributes.photos.data) {
    if (!photo.attributes.formats.medium.url.startsWith("http")) {
      photo.attributes.formats.medium.url =
        process.env.STRAPI_URL_BASE +
        photo.attributes.formats.medium.url;
    }
  }
  return tournament;
}

export default function TournamentsRoute() {
  const tournament = useLoaderData();

  return (
    <div className="flex flex-col">
      <Hero
        text={`${tournamentsSectionName}: ${tournament.attributes.title}`}
        page="tournaments"
      />
      <div
        className="flex flex-col py-10 sm:flex-row sm:py-0"
        key={tournament.id}
      >
        <div
          // See https://stackoverflow.com/a/70805360/10267529
          style={{
            backgroundImage: `url(${
              process.env.NODE_ENV === "development"
                ? tournament.attributes.photos.data[0].attributes
                    .formats.medium.url
                : tournament.attributes.photos.data[0].attributes.url
            })`,
          }}
          role="img"
          // See https://www.davidmacd.com/blog/alternate-text-for-css-background-images.html
          aria-label={`${tournament.attributes.photos.data[0].attributes.alternativeText}`}
          className="mx-auto h-44 w-44 rounded-full bg-cover bg-center bg-no-repeat sm:h-[55vh] sm:min-w-[50%] sm:rounded-none lg:min-w-[50%]"
        />
        <div className="flex flex-col justify-between sm:w-1/2 sm:p-10">
          <div className="flex flex-col gap-y-5">
            <h1 className="pt-8 text-center text-2xl font-bold sm:gap-y-0 sm:py-0">
              {tournament.attributes.title}
            </h1>
            <p>{tournament.attributes.desc}</p>
          </div>
          <NavLink
            to="../"
            className="text-center font-bold text-purple hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            ← Back to {tournamentsSectionName}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
