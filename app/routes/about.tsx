import { Link, useLoaderData } from "@remix-run/react";
import { siteTitle } from "~/root";
import Hero from "~/shared/components/hero";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";

export function meta() {
  return {
    title: `About Us | ${siteTitle}`,
  };
}

export async function loader() {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/about?populate=*`,
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

  return data.data;
}

export default function ContactRoute() {
  const data = useLoaderData();
  return (
    <div id="about-page-content">
      <Hero text="About Us" page="about" />
      <div
        id="about-info"
        className="flex min-h-screen flex-col gap-y-10 p-5 pb-14 sm:py-20 sm:px-32"
      >
        <h1
          className="pt-8 text-center text-2xl font-bold sm:gap-y-0 sm:py-0"
          id="about-heading"
        >
          {data.attributes.main.heading}
        </h1>
        <p
          id="about-body-text"
          className="whitespace-pre-wrap text-sm sm:text-base"
        >
          {data.attributes.main.body}
        </p>
        <Link
          to="faq"
          className="text-center font-bold text-purple hover:underline hover:decoration-2 hover:underline-offset-4 sm:py-5"
        >
          Frequently Asked Questions
        </Link>
      </div>
    </div>
  );
}
