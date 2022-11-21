import { Link, useLoaderData } from "@remix-run/react";
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
      <Hero />
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
              // gap-y-8 sm:gap-y-0 sm:p-2 sm:px-7
            >
              <Link
                to={section.path}
                className="flex flex-col gap-y-2 px-10 sm:w-1/2 sm:gap-y-5 sm:self-center sm:py-24"
              >
                <h1 className="text-center text-2xl font-bold sm:items-center sm:text-left">
                  {section.sectionName}
                </h1>
                <p className="leading-5 sm:pr-10 sm:text-lg sm:leading-6">
                  {section.sectionText}
                </p>
              </Link>
              <div
                // See https://stackoverflow.com/a/70805360/10267529
                style={{
                  backgroundImage: `url(${section.image.data.attributes.formats.large.url})`,
                }}
                role="img"
                // See https://www.davidmacd.com/blog/alternate-text-for-css-background-images.html
                aria-label={`${section.image.data.attributes.alternativeText}`}
                // className="bg-cover bg-center bg-no-repeat"
                className="mx-auto h-44 w-44 rounded-full bg-cover bg-center bg-no-repeat sm:h-[45vh] sm:min-w-[50%] sm:rounded-none"
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}
