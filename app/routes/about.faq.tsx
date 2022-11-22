import { useLoaderData } from "@remix-run/react";
import { siteTitle } from "~/root";
import Hero from "~/shared/components/hero";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";

const faqSectionName = "Frequently Asked Questions";

export function meta() {
  return {
    title: `FAQs | ${siteTitle}`,
  };
}

export async function loader() {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/about?populate[0]=faqs`,
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
  const faqs = data.data.attributes.faqs;

  // Throw error if there is no data
  if (!faqs) {
    throw new Error(`No ${faqSectionName} data in Strapi instance.`);
  }

  if (data.error) {
    // Did Strapi return an error object in its response?
    console.error("Error", data.error);
    throw new Response("Error getting data from Strapi", {
      status: 500,
    });
  }

  return faqs;
}

export default function ContactRoute() {
  const faqs = useLoaderData();
  return (
    <div id="faq-page-content">
      <Hero text={faqSectionName} page="faq" />
      <div
        id="about-info"
        className="flex min-h-[75vh] flex-col gap-y-14 p-5 pb-14 sm:py-20 sm:px-32"
      >
        <h1
          className="pt-8 text-center text-xl font-bold sm:gap-y-0 sm:py-0"
          id="faq-heading"
        >
          Frequently Asked Questions
        </h1>
        <ul className="mx-auto flex flex-col gap-y-8 text-sm sm:text-base lg:px-32">
          {faqs.map((faq: any) => (
            <li key={faq.id}>
              <p className="pb-1 font-bold">
                {faq.question
                  ? faq.question
                  : `(No text in question field for id ${faq.id}.)`}
              </p>
              <p>
                {faq.answer
                  ? faq.answer
                  : `(No text in answer field for id ${faq.id}.)`}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
