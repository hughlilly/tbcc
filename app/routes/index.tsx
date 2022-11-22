import { Link, useLoaderData } from "@remix-run/react";
import { siteTitle } from "~/root";
import Hero from "~/shared/components/hero";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";

export async function loader() {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/home-section?populate%5Bsection%5D%5Bpopulate%5D=*`,
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
    throw new Error(`No Home Sections data in Strapi instance.`);
  }

  for (const section of data.data.attributes.section) {
    if (
      !section.image.data.attributes.formats.thumbnail.url.startsWith(
        "http"
      )
    ) {
      section.image.data.attributes.formats.thumbnail.url =
        process.env.STRAPI_URL_BASE +
        section.image.data.attributes.formats.thumbnail.url;
    }
    if (
      section.image.data.attributes.formats.small &&
      !section.image.data.attributes.formats.small.url.startsWith(
        "http"
      )
    ) {
      section.image.data.attributes.formats.small.url =
        process.env.STRAPI_URL_BASE +
        section.image.data.attributes.formats.small.url;
    }
    if (
      section.image.data.attributes.formats.medium &&
      !section.image.data.attributes.formats.medium.url.startsWith(
        "http"
      )
    ) {
      section.image.data.attributes.formats.medium.url =
        process.env.STRAPI_URL_BASE +
        section.image.data.attributes.formats.medium.url;
    }
    if (
      section.image.data.attributes.formats.large &&
      !section.image.data.attributes.formats.large.url.startsWith(
        "http"
      )
    ) {
      section.image.data.attributes.formats.large.url =
        process.env.STRAPI_URL_BASE +
        section.image.data.attributes.formats.large.url;
    }
  }

  return data.data;
}

export default function Index() {
  const data = useLoaderData();
  const sections = data.attributes.section;

  return (
    <div id="homepage-content">
      <Hero page="home" text={siteTitle} />
      <div
        id="homepage-sections"
        className="flex flex-col gap-y-12 py-10 sm:gap-y-0 sm:py-0"
      >
        {sections.map((section: any, index: number) => {
          // Determine if current section is an even or odd one
          const even = index % 2 == 0;
          return (
            <article
              id={`cta-${section.path}`}
              key={section.id}
              // If an even section, put img container first on sm+ viewports; if odd, put last
              className={`
              ${even ? "sm:flex-row" : "sm:flex-row-reverse"} 
              flex h-auto flex-col-reverse  
              `}
            >
              <Link
                to={section.path}
                className="flex flex-col gap-y-2 px-10 sm:w-1/2 sm:gap-y-5 sm:self-center sm:py-5 lg:py-24"
              >
                <h1 className="text-center text-xl font-bold sm:items-center sm:text-left sm:text-2xl">
                  {section.sectionName}
                </h1>
                <p className="text-sm sm:pr-10 lg:text-lg lg:leading-6 xl:text-xl">
                  {section.sectionText}
                </p>
              </Link>
              <div
                // See https://stackoverflow.com/a/70805360/10267529
                style={{
                  backgroundImage: `url(${
                    process.env.NODE_ENV === "development"
                      ? section.image.data.attributes.formats.large.url
                      : section.image.data.attributes.url
                  })`,
                }}
                role="img"
                // See https://www.davidmacd.com/blog/alternate-text-for-css-background-images.html
                aria-label={`${section.image.data.attributes.alternativeText}`}
                className="mx-auto h-44 w-44 rounded-full bg-cover bg-center bg-no-repeat sm:h-[55vh] sm:min-w-[50%] sm:rounded-none lg:min-w-[50%]"
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}
