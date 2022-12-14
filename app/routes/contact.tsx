import { siteTitle } from "~/root";
import type { ActionFunction } from "@remix-run/node";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import { useActionData, Form, useTransition } from "@remix-run/react";

export function meta() {
  return {
    title: `Contact Us | ${siteTitle}`,
  };
}

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  // Validate email address field
  const validateEmail = (email: any) => {
    if (!email) {
      return "Please fill out this field";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address";
    }
  };

  // Validate first and last names
  const validateFirstName = (firstname: any) => {
    if (!firstname) return "Please enter a first name";
  };
  const validateLastName = (lastname: any) => {
    if (!lastname) return "Please enter a last name";
  };

  const validation = {
    firstname: validateFirstName(formData.get("firstname")),
    lastname: validateLastName(formData.get("lastname")),
    email: validateEmail(formData.get("email")),
  };

  // If any data is invalid, return such
  if (Object.values(validation).some(Boolean)) return { validation };

  // Else, continue to making an API call, or not, depending on environment

  // Strapi needs firstName and lastName in camel case
  // Otherwise would have just sent `Object.fromEntries(await request.formData())`
  // see https://blog.logrocket.com/how-to-validate-forms-remix/

  const dataForStrapi = {
    firstName: formData.get("firstname"),
    lastName: formData.get("lastname"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    message: formData.get("message"),
    subscriber: formData.get("newsletter") ? true : false,
  };

  // Don't make an API call in production — the `messages` endpoint
  //  is not exposed via the API key for security reasons — we'd need a Captcha to verify non-bot status
  if (process.env.NODE_ENV === "development") {
    checkEnvVars();

    // POST to the `/messages` endpoint, and send the restructured data.
    const res = await fetch(
      `${process.env.STRAPI_URL_BASE}/api/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: dataForStrapi,
        }),
      }
    );

    // Handle HTTP response code < 200 or >= 300
    checkStatus(res);

    // Return Strapi's response
    const strapiResponse = await res.json();
    return strapiResponse;
  }

  return dataForStrapi;
};

export default function ContactRoute() {
  return (
    // See https://remix.run/docs/en/v1/guides/data-writes

    <div
      id="contact-page-content"
      className="flex min-h-[100vh] flex-col divide-y divide-solid lg:flex-row lg:divide-none"
    >
      <ContactForm />
      <Map />
    </div>
  );
}

function ContactForm() {
  const actionData = useActionData();

  // If there is a data key, it's from Strapi; if a message, it was the user's input
  const state: "success" | "error" | "idle" =
    actionData?.data || actionData?.message
      ? "success"
      : actionData?.validation
      ? "error"
      : "idle";

  const submittedData = actionData?.data
    ? actionData?.data?.attributes
    : actionData;
  return (
    <div
      id="form-content"
      className="flex px-4 pt-5 pb-10 text-sm sm:mx-auto"
    >
      {state !== "success" ? (
        <ContactFormForm actionData={actionData} />
      ) : (
        <SuccessMessage submittedData={submittedData} />
      )}
    </div>
  );
}

function ContactFormForm({ actionData }: any) {
  const transition = useTransition();

  return (
    <Form
      method="post"
      autoComplete="on"
      aria-describedby="contact-form-desc"
      className="flex flex-col justify-center gap-y-10 pt-10 lg:mx-auto lg:max-w-[50vw] lg:pt-0"
    >
      <fieldset
        disabled={transition.state === "submitting"}
        className="flex flex-col gap-y-4"
      >
        <legend className="mb-5 text-center text-2xl font-bold">
          Contact Us
        </legend>
        <p
          id="contact-form-desc"
          className="mb-5 text-center md:text-base"
        >
          Use this form to contact us to ask about membership.
        </p>
        <div id="firstname-field">
          <label htmlFor="firstname" className="mb-1 block">
            First name (required)
          </label>
          <input
            className="block w-full appearance-none border border-gray-200 py-3 px-4"
            id="firstname"
            name="firstname"
            type="text"
            placeholder="First name"
            // See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values
            // and https://www.w3.org/TR/WCAG21/#input-purposes
            autoComplete="given-name"
          />
          {actionData?.validation?.firstname ? (
            <span className="pl-2 text-xs italic text-red-500">
              {actionData.validation.firstname}
            </span>
          ) : (
            ""
          )}
        </div>

        <div id="lastname-field">
          <label htmlFor="lastname" className="mb-1 block">
            Last name (required)
          </label>
          <input
            className="block w-full appearance-none border border-gray-200 py-3 px-4"
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Last name"
            autoComplete="family-name"
          />
          {actionData?.validation?.lastname ? (
            <p className="pt-1 pl-2 text-xs italic text-red-500">
              {actionData.validation.lastname}
            </p>
          ) : (
            ""
          )}
        </div>
        <div id="phone-number-field">
          <label htmlFor="phoneNumber" className="mb-1 block">
            Phone number
          </label>
          <input
            className="block w-full appearance-none border border-gray-200 py-3 px-4"
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Phone number"
          />
        </div>
        <div id="email-field">
          <label htmlFor="email" className="mb-1 block">
            Email address (required)
          </label>
          <input
            className="block w-full appearance-none border border-gray-200 py-3 px-4"
            id="email"
            name="email"
            // By making this field of type 'email', native browser validation kicks in
            // If the user enters nothing, the string from the JS validation in the loader is displayed
            // If the user enters "B", the native browser validation kicks in and warns the user with a popover
            // If the user enters "B@", the same happens
            // If the user enters "B@A", the string is valid as far as most native browser validation algorithms are concerned,
            // and then the JS validation from the loader takes over, complaining of invalid entry.
            type="email"
            placeholder="Email address"
          />
          {actionData?.validation?.email ? (
            <p className="pt-1 pl-2 text-xs italic text-red-500">
              {actionData.validation.email}
            </p>
          ) : (
            ""
          )}
        </div>
        {/* This textarea input field uses the browser's native `required` attribute — this field is not validated via JS in the loader */}
        <div id="message-field">
          <label htmlFor="message" className="mb-1 block">
            Message (required)
          </label>
          <textarea
            required
            autoComplete="off"
            rows={8}
            className="block w-full appearance-none border border-gray-200 py-3 px-4"
            id="message"
            name="message"
            placeholder="Message"
          />
        </div>
        <div
          id="newsletter-tickbox"
          className="mx-auto flex flex-row items-center gap-x-4"
        >
          <input type="checkbox" name="newsletter" id="newsletter" />
          <label
            htmlFor="newsletter"
            className="select-none hover:cursor-pointer"
          >
            Yes, sign me up to the newsletter
          </label>
        </div>
      </fieldset>
      <input
        type="submit"
        value={
          transition.state === "submitting" ? "Submitting" : "Submit"
        }
        className="mx-auto bg-purple py-3 px-2 text-white hover:cursor-pointer"
      />
    </Form>
  );
}

function SuccessMessage({ submittedData }: any) {
  return (
    <div
      id="success-response-data-message"
      className="flex flex-col justify-center pt-10 lg:m-auto"
    >
      <div id="success-header">
        <div className="mb-5 text-center text-2xl font-bold">
          Contact Us
        </div>
        <div className="mb-5 text-center md:text-base">
          Thank you for your message. We will get back to you shortly.
        </div>
      </div>
      <div
        id="success-response-data"
        className="flex flex-col gap-y-2 py-10"
      >
        <div>Here's what you sent us:</div>
        <div id="submittedData" className="flex flex-col gap-y-2">
          <div className="">
            <span className="font-bold">First name</span>:{" "}
            {submittedData.firstName}
          </div>
          <div className="">
            <span className="font-bold">Last name</span>:{" "}
            {submittedData.lastName}
          </div>
          <div className="">
            <span className="font-bold">Email address</span>:{" "}
            {submittedData.email}
          </div>
          {submittedData.phoneNumber ? (
            <div className="">
              <span className="font-bold">Phone number</span>:{" "}
              {submittedData.phoneNumber}
            </div>
          ) : (
            ""
          )}
          <div className="line-clamp-6 md:max-w-[35vw]">
            <span className="font-bold">Message</span>:{" "}
            <span className="whitespace-pre-line">
              {submittedData.message}
            </span>
          </div>
          {submittedData.subscriber ? (
            <div className="pt-10">
              ✅ You have chosen to subscribe to our newsletter. Thank
              you.
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
function Map() {
  return (
    <div
      id="map-content"
      className="flex flex-col justify-center pt-10 lg:mx-auto lg:pt-0"
    >
      <div
        id="header-address-block"
        className="mx-auto flex flex-row items-center gap-x-5 px-10 pb-5 sm:gap-x-10 "
      >
        <div id="find-us" className="text-2xl font-bold">
          Find Us
        </div>
        <div id="address" className="text-sm">
          <p>220B Pages Road</p>
          <p>Wainoni</p>
          <p>Christchurch 8062</p>
        </div>
      </div>
      <iframe
        className="lg:w- min-h-[50vh] lg:h-[32rem] lg:w-[32rem]"
        title="Telugu Badminton Club on Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d46289.24428014558!2d172.695569!3d-43.521571!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x974a13458cf5afe!2sTelugu%20Badminton%20Club!5e0!3m2!1sen!2sus!4v1668976283083!5m2!1sen!2sus"
      ></iframe>
    </div>
  );
}
