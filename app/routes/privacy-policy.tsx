import { useLoaderData } from "@remix-run/react";
import { siteTitle } from "~/root";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";

export function meta() {
  return {
    title: `Privacy Policy | ${siteTitle}`,
  };
}

export async function loader() {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/about?populate=privacyPolicy`,
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

  const privacyPolicyData = data.data.attributes.privacyPolicy;

  // Throw error if there is no data
  if (!privacyPolicyData) {
    throw new Error(`No pivacy policy data in Strapi instance.`);
  }

  return privacyPolicyData;
}

export default function PrivacyPolicyRoute() {
  const { heading, body } = useLoaderData();
  return (
    <div id="privacy-policy-page-content">
      <div
        id="privacy-info"
        className="flex min-h-screen flex-col gap-y-10 p-5 pb-14 sm:py-20 sm:px-48 lg:px-64"
      >
        <h1
          className="pt-8 text-center text-2xl font-bold sm:gap-y-0 sm:py-0"
          id="privacy-policy-heading"
        >
          {heading ? heading : "(No text in heading field.)"}
        </h1>
        <p
          id="about-body-text"
          className="whitespace-pre-wrap text-sm sm:text-base"
        >
          {body ? body : "(No text in body field.)"}
        </p>
      </div>
    </div>
  );
}
