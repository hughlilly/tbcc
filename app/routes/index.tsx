import { Link, useLoaderData } from '@remix-run/react';
import Cards from '~/shared/components/cards';
import Hero from '~/shared/components/hero';
import { checkEnvVars, checkStatus } from '~/utils/errorHandling';

export async function loader() {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/home-section?populate%5Bsection%5D%5Bpopulate%5D=*`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  // Handle HTTP response code < 200 or >= 300
  checkStatus(res);

  const data = await res.json();

  // Did Strapi return an error object in its response?
  if (data.error) {
    console.error('Error', data.error);
    throw new Response('Error getting data from Strapi', { status: 500 });
  }

  for (const section of data.data.attributes.section) {
    if (!section.image.data.attributes.formats.thumbnail.url.startsWith('http')) {
      section.image.data.attributes.formats.thumbnail.url =
        process.env.STRAPI_URL_BASE + section.image.data.attributes.formats.thumbnail.url;
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
        {sections.map((section: any) => {
          //@todo: logic for even/odd
          return (
            <article
              id={`cta-${section.path}`}
              key={section.id}
              className="flex flex-col-reverse gap-y-5 px-7 sm:flex-row sm:gap-y-0 sm:p-2"
            >
              <Link to={section.path} className="flex flex-col gap-y-2 text-sm sm:w-1/2">
                <h1 className="text-center text-2xl font-bold sm:text-left">
                  {section.sectionName}
                </h1>
                <p>{section.sectionText}</p>
              </Link>
              <img
                src={section.image.data.attributes.formats.thumbnail.url}
                alt={section.image.data.attributes.alternativeText}
                className="mx-auto h-56 w-56 rounded-full sm:mx-0 sm:h-96 sm:w-96 sm:rounded-none"
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}
