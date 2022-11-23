import { useLoaderData, NavLink } from "@remix-run/react";
import { checkStatus, checkEnvVars } from "~/utils/errorHandling";
import { siteTitle } from "~/root";
import Hero from "~/shared/components/hero";
import { IntlDate } from "~/providers/IntlDate";
import { Time } from "~/providers/Time";
import { tournamentsSectionName } from "./index";

export function meta({ data }: any): { title: string } {
  return {
    // title: `${data.attributes.title} | ${tournamentsSectionName} | ${siteTitle}`,
    title: `${tournamentsSectionName} | ${siteTitle}`,
  };
}

export async function loader({ params }: any) {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/tournaments` +
      `?populate[0]=location.image&populate[1]=photos&filters[slug]=${params.tournamentId}`,
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

  for (const photo of tournament.attributes.photos.data) {
    if (
      photo.attributes.formats.medium &&
      !photo.attributes.formats.medium.url.startsWith("http")
    ) {
      photo.attributes.formats.medium.url =
        process.env.STRAPI_URL_BASE +
        photo.attributes.formats.medium.url;
    }
  }

  if (
    tournament.attributes.location.data.attributes.image.data.attributes
      .formats.medium &&
    !tournament.attributes.location.data.attributes.image.data.attributes.formats.medium.url.startsWith(
      "http"
    )
  ) {
    tournament.attributes.location.data.attributes.image.data.attributes.formats.medium.url =
      process.env.STRAPI_URL_BASE +
      tournament.attributes.location.data.attributes.image.data
        .attributes.formats.medium.url;
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
        key={tournament.attributes.id}
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
          className="mx-auto h-44 w-44 rounded-full bg-cover bg-center sm:h-auto sm:min-w-[50%] sm:rounded-none"
        />
        <div className="flex flex-col justify-between p-5 sm:w-1/2 sm:p-10">
          <div className="flex flex-col gap-y-5">
            <h1 className="pt-5 text-center text-2xl font-bold sm:gap-y-0">
              {tournament.attributes.title}
            </h1>
            <p className="sm:pt-6">{tournament.attributes.desc}</p>
          </div>
          <div className="m-4 mt-16 flex flex-col rounded-md border sm:mt-0 sm:h-auto sm:flex-row lg:my-10">
            <div className="mx-auto sm:w-1/2 sm:pl-5">
              <div
                id={`${tournament.attributes.slug}-metadata`}
                className="flex h-32 flex-col justify-center"
              >
                <div className="font-bold">
                  {tournament.attributes.location.data.attributes.name}
                </div>
                <IntlDate
                  date={new Date(tournament.attributes.startTime)}
                />
                <div>
                  <Time
                    date={new Date(tournament.attributes.startTime)}
                  />
                  <span> – </span>
                  <Time
                    date={new Date(tournament.attributes.endTime)}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundImage: `url(${
                  process.env.NODE_ENV === "development"
                    ? tournament.attributes.location.data.attributes
                        .image.data.attributes.formats.medium.url
                    : tournament.attributes.location.data.attributes
                        .image.data.attributes.url
                })`,
              }}
              role="img"
              aria-label={`${tournament.attributes.location.data.attributes.image.data.attributes.alternativeText}`}
              className="h-32 bg-cover bg-center sm:h-auto sm:w-1/2"
            ></div>
          </div>
          <NavLink
            to="../"
            className="pt-10 text-center font-bold text-purple hover:underline hover:decoration-2 hover:underline-offset-4 sm:pt-0"
          >
            ← Back to {tournamentsSectionName}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
