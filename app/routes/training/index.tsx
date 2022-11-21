import { Link, useLoaderData } from "@remix-run/react";
import { siteTitle } from "~/root";
import Hero from "~/shared/components/hero";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";

const pageTitle = `Training Materials`;

export function meta() {
  return {
    title: `${pageTitle} | ${siteTitle}`,
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
  console.log(data.data);

  // Did Strapi return an error object in its response?
  if (data.error) {
    console.error("Error", data.error);
    throw new Response("Error getting data from Strapi", {
      status: 500,
    });
  }

  //   for (const shotPhoto of data.data.attributes.Photo.data) {
  //     if (
  //       !shotPhoto.attributes.formats.thumbnail.url.startsWith("http")
  //     ) {
  //       shotPhoto.attributes.formats.thumbnail.url =
  //         process.env.STRAPI_URL_BASE +
  //         shotPhoto.attributes.formats.thumbnail.url;
  //     }
  //     if (
  //       shotPhoto.attributes.formats.small &&
  //       !shotPhoto.attributes.formats.small.url.startsWith("http")
  //     ) {
  //       shotPhoto.attributes.formats.small.url =
  //         process.env.STRAPI_URL_BASE +
  //         shotPhoto.attributes.formats.small.url;
  //     }
  //     if (
  //       shotPhoto.attributes.formats.medium &&
  //       !shotPhoto.attributes.formats.medium.url.startsWith("http")
  //     ) {
  //       shotPhoto.attributes.formats.medium.url =
  //         process.env.STRAPI_URL_BASE +
  //         shotPhoto.attributes.formats.medium.url;
  //     }
  //     if (
  //       shotPhoto.attributes.formats.large &&
  //       !shotPhoto.attributes.formats.large.url.startsWith("http")
  //     ) {
  //       shotPhoto.attributes.formats.large.url =
  //         process.env.STRAPI_URL_BASE +
  //         shotPhoto.attributes.formats.large.url;
  //     }
  //   }

  return data.data;
}

export default function TrainingRoute() {
  const data = useLoaderData();
  return (
    <div id="training-page-content">
      <Hero text={`${pageTitle}`} page="training" />
      <div
        id="training-info"
        className="flex min-h-[50vh] flex-col gap-x-10 gap-y-14 p-5 pb-14 sm:py-20 md:px-24 lg:flex-row lg:max-xl:px-44 lg:max-lg:px-96"
      >
        {data.map((shot: any) => (
          <Link
            to={shot.attributes.slug}
            className="flex flex-col gap-y-5"
            key={shot.id}
          >
            {/* <img
              src={
                process.env.NODE_ENV === "development"
                  ? shot.attributes.Photo.data[0].attributes.formats
                      .medium.url
                  : shot.attributes.Photo.data[0].attributes.url
              }
              alt={
                shot.attributes.Photo.data[0].attributes.alternativeText
              }
            /> */}
            <h1 className="pt-8 text-center text-2xl font-bold sm:gap-y-0 sm:py-0">
              {shot.attributes.ShotName}
            </h1>
            <p> {shot.attributes.Description} </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
