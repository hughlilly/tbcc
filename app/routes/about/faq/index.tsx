import { useLoaderData } from "@remix-run/react";
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
  const faqs = data.attributes.faqs;
  return (
    <div id="faq-page-content">
      <Hero text="Frequently Asked Questions" page="faq" />
      <div
        id="about-info"
        className="flex min-h-[75vh] flex-col gap-y-10 p-5 pb-14 sm:py-20 sm:px-32"
      >
        <h1
          className="pt-8 text-center text-xl font-bold sm:gap-y-0 sm:py-0"
          id="faq-heading"
        >
          Frequently Asked Questions
        </h1>
        <ul className="mx-auto text-sm sm:text-base lg:px-32">
          {faqs.map((faq: any) => (
            <li key={faq.id}>
              <p className="pb-2 font-bold">{faq.question}</p>
              <p>{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
