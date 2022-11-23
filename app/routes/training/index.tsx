import { Link, useLoaderData } from "@remix-run/react";
import { siteTitle } from "~/root";
import Hero from "~/shared/components/hero";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";

export const trainingSectionName = "Training Materials";

export function meta() {
  return {
    title: `${trainingSectionName} | ${siteTitle}`,
  };
}

export async function loader() {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/training-materials/?populate=*`,
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

  // Throw error if there is no data
  if (!data.data[0]) {
    throw new Error(
      `No ${trainingSectionName} data in Strapi instance.`
    );
  }

  if (process.env.NODE_ENV === "development") {
    for (const shot of data.data) {
      for (const shotPhoto of shot.attributes.Photo.data) {
        if (
          shotPhoto.attributes.formats.medium &&
          !shotPhoto.attributes.formats.medium.url.startsWith("http")
        ) {
          shotPhoto.attributes.formats.medium.url =
            process.env.STRAPI_URL_BASE +
            shotPhoto.attributes.formats.medium.url;
        }
      }
    }
  }

  return data.data;
}

export default function Training() {
  const data = useLoaderData();

  return (
    <div id="training-page-content">
      <Hero text={`${trainingSectionName}`} page="training" />

      <div
        id="training-info"
        className="flex min-h-[50vh] flex-col justify-evenly gap-x-10 gap-y-14 p-5 pt-20 pb-14 sm:py-20 md:px-24 lg:flex-row lg:max-xl:px-44 lg:max-lg:px-96"
      >
        {data.map((shot: any) => (
          <div className="flex flex-col gap-y-5" key={shot.id}>
            <Link
              to={shot.attributes.slug}
              className="flex flex-col items-center gap-y-5"
            >
              {/* <img
                src={
                  process.env.NODE_ENV === "development"
                    ? shot.attributes.Photo.data[0].attributes.formats
                        .medium.url
                    : shot.attributes.Photo.data[0].attributes.url
                }
                alt={
                  shot.attributes.Photo.data[0].attributes
                    .alternativeText
                }
                className="h-48 w-48 rounded-full"
              /> */}
              <h1 className="pt-8 text-center text-2xl font-bold sm:gap-y-0 sm:py-0">
                {shot.attributes.ShotName}
              </h1>
            </Link>
            <p>{shot.attributes.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
