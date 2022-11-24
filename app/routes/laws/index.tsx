import { Link, useLoaderData } from "@remix-run/react";
import { siteTitle } from "~/root";
import Hero from "~/shared/components/hero";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";

export const lawsSectionName = "Badminton Laws";

export function meta() {
  return {
    title: `${lawsSectionName} | ${siteTitle}`,
  };
}

export async function loader() {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/laws/?populate=*`,
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
    throw new Error(`No ${lawsSectionName} data in Strapi instance.`);
  }

  // For each law/rule, set up photo URL
  for (const law of data.data) {
    // Only one photo on this content type
    if (
      law.attributes.Photo.data.attributes.formats.medium &&
      !law.attributes.Photo.data.attributes.formats.medium.url.startsWith(
        "http"
      )
    ) {
      law.attributes.Photo.data.attributes.formats.medium.url =
        process.env.STRAPI_URL_BASE +
        law.attributes.Photo.data.attributes.formats.medium.url;
    }
  }
  return data.data;
}

export default function Laws() {
  const data = useLoaderData();

  return (
    <div id="laws-page-content">
      <Hero text={`${lawsSectionName}`} page="laws" />
      <div
        id="laws-info"
        className="flex min-h-[50vh] flex-col justify-evenly gap-x-10 gap-y-14 p-5 pt-20 pb-14 sm:py-20 md:px-24 lg:flex-row lg:max-xl:px-44 lg:max-lg:px-96"
      >
        {data.map((law: any) => (
          <div className="flex flex-col gap-y-5" key={law.id}>
            <Link
              to={law.attributes.slug}
              className="flex flex-col items-center gap-y-5"
            >
              <img
                src={
                  law.attributes.Photo.data.attributes.formats.medium
                    ? law.attributes.Photo.data.attributes.formats
                        .medium.url
                    : law.attributes.Photo.data.attributes.url
                }
                alt={
                  law.attributes.Photo.data.attributes.alternativeText
                }
                className="h-48 w-48 rounded-full object-cover"
              />
              <h1 className="pt-8 text-center text-2xl font-bold sm:gap-y-0 sm:py-0">
                {law.attributes.LawName}
              </h1>
            </Link>
            <p>{law.attributes.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
