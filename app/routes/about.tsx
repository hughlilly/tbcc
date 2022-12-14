import { Link, useLoaderData } from "@remix-run/react";
import { siteTitle } from "~/root";
import Hero from "~/shared/components/hero";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";

const aboutPageTitle = "About Us";

export function meta() {
  return {
    title: `${aboutPageTitle} | ${siteTitle}`,
  };
}

export async function loader() {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/about?populate=main`,
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

  return data.data.attributes.main;
}

export default function AboutRoute() {
  const { heading, body } = useLoaderData();
  return (
    <div id="about-page-content">
      <Hero text={aboutPageTitle} page="about" />
      <div
        id="about-info"
        className="flex min-h-screen flex-col gap-y-14 p-5 pb-14 sm:py-20 sm:px-32"
      >
        <h1
          className="pt-8 text-center text-2xl font-bold sm:gap-y-0 sm:py-0"
          id="about-heading"
        >
          {heading}
        </h1>
        <p
          id="about-body-text"
          className="whitespace-pre-wrap text-sm sm:text-base"
        >
          {body}
        </p>
        <Link
          to="faq"
          className="self-center font-bold text-purple hover:underline hover:decoration-2 hover:underline-offset-4"
        >
          Frequently Asked Questions
        </Link>
      </div>
    </div>
  );
}
