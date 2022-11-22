import { Link, useLoaderData } from "@remix-run/react";
import { siteTitle } from "~/root";
import { checkStatus, checkEnvVars } from "~/utils/errorHandling";

export function meta() {
  return {
    title: `Tournaments | ${siteTitle}`,
  };
}

export async function loader() {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/tournaments?populate=*`,
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

  for (const tournament of data.data) {
    for (const tournamentPhoto of tournament.attributes.photos.data) {
      if (
        tournamentPhoto.attributes.formats.medium &&
        !tournamentPhoto.attributes.formats.medium.url.startsWith(
          "http"
        )
      ) {
        tournamentPhoto.attributes.formats.medium.url =
          process.env.STRAPI_URL_BASE +
          tournamentPhoto.attributes.formats.medium.url;
      }
    }
  }

  return data.data;
}

export default function Tournaments() {
  const tournaments = useLoaderData();

  return (
    <div
      id="tournaments-info"
      className="flex min-h-[50vh] flex-col justify-evenly gap-x-10 gap-y-5 divide-y divide-solid p-2 px-5 pb-14 sm:py-20 md:px-24 lg:flex-row lg:max-xl:px-44 lg:max-lg:px-96"
    >
      {tournaments.map((tournament: any) => {
        const tournamentData = tournament.attributes;
        const locationData =
          tournament.attributes.location.data.attributes;
        const photoData =
          tournament.attributes.photos.data[0].attributes;
        return (
          <div
            className="flex flex-col gap-y-5 pt-14 sm:px-28 sm:pt-0"
            key={tournament.id}
          >
            <Link
              to={tournamentData.slug}
              className="flex flex-col items-center gap-y-5"
            >
              <img
                src={
                  process.env.NODE_ENV === "development"
                    ? photoData.formats.medium.url
                    : photoData.url
                }
                alt={
                  tournamentData.photos.data[0].attributes
                    .alternativeText
                }
                className="h-48 w-48 rounded-full"
              />
              <h1 className="pt-8 text-center text-2xl font-bold sm:gap-y-0 sm:py-0">
                {tournamentData.title}
              </h1>
            </Link>
            <div
              id={`${tournamentData.slug}-metadata`}
              className="text-sm"
            >
              <p className="pt-5 font-bold">{locationData.name}</p>
              <p>
                {new Date(tournamentData.startTime).toLocaleDateString(
                  undefined,
                  {
                    dateStyle: "full",
                  }
                )}
              </p>
              <p>
                <time
                  dateTime={tournamentData.startTime}
                  id={`${tournamentData.slug}-start-time`}
                >
                  {new Date(
                    tournamentData.startTime
                  ).toLocaleTimeString(undefined, {
                    timeStyle: "short",
                  })}
                </time>
                <span> – </span>
                <time
                  dateTime={tournamentData.endTime}
                  id={`${tournamentData.slug}-end-time`}
                >
                  {new Date(tournamentData.endTime).toLocaleTimeString(
                    undefined,
                    {
                      timeStyle: "short",
                    }
                  )}
                </time>
              </p>
            </div>
            <p className=" line-clamp-3 ">
              {/* {truncateString(tournamentData.desc, 220)}{" "} */}
              {tournamentData.desc}{" "}
              <Link
                to={tournamentData.slug}
                className="font-bold hover:underline"
              >
                Read more »
              </Link>
            </p>
          </div>
        );
      })}
    </div>
  );
}
