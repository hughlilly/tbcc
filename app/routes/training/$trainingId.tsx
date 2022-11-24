import { NavLink, useLoaderData } from "@remix-run/react";
import { checkStatus, checkEnvVars } from "~/utils/errorHandling";
import { siteTitle } from "~/root";
import Hero from "~/shared/components/hero";
import { trainingSectionName } from "./index";

export function meta({ data }: any): { title: string } {
  return {
    title: `${data.attributes.ShotName} | ${trainingSectionName} | ${siteTitle}`,
  };
}

export async function loader({ params }: any) {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/training-materials` +
      `?populate=*&filters[slug]=${params.trainingId}`,
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

  const shot = data.data[0];

  for (const photo of shot.attributes.Photo.data) {
    if (
      photo.attributes.formats.medium &&
      !photo.attributes.formats.medium.url.startsWith("http")
    ) {
      photo.attributes.formats.medium.url =
        process.env.STRAPI_URL_BASE +
        photo.attributes.formats.medium.url;
    }
  }

  return shot;
}

export default function TrainingRoute() {
  const shot = useLoaderData();

  return (
    <div className="flex flex-col">
      <Hero
        text={`${trainingSectionName}:\n${shot.attributes.ShotName}`}
        page="training"
      />
      <div
        className="flex flex-col py-10 sm:flex-row sm:py-0"
        key={shot.id}
      >
        <div
          // See https://stackoverflow.com/a/70805360/10267529
          style={{
            backgroundImage: `url(${
              shot.attributes.Photo.data[0].attributes.formats.medium
                ? shot.attributes.Photo.data[0].attributes.formats
                    .medium.url
                : shot.attributes.Photo.data[0].attributes.url
            })`,
          }}
          role="img"
          // See https://www.davidmacd.com/blog/alternate-text-for-css-background-images.html
          aria-label={`${shot.attributes.Photo.data[0].attributes.alternativeText}`}
          className="mx-auto h-44 w-44 rounded-full bg-cover bg-center bg-no-repeat sm:h-[55vh] sm:min-w-[50%] sm:rounded-none lg:min-w-[50%]"
        />
        <div className="flex flex-col justify-between p-5 sm:w-1/2 sm:p-10">
          <div className="flex flex-col gap-y-5">
            <h1 className="pt-5 text-center text-2xl font-bold sm:gap-y-0">
              {shot.attributes.ShotName}
            </h1>
            <p>{shot.attributes.Description}</p>
          </div>
          <NavLink
            to="../"
            className="pt-10 text-center font-bold text-purple hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            ← Back to {trainingSectionName}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
