import { Form } from "@remix-run/react";

export default function ContactForm() {
  return (
    <div id="form-content" className="mx-auto px-4 pt-5 pb-10 text-sm">
      <Form
        method="post"
        action="/messages"
        autoComplete="on"
        aria-describedby="contact-form-desc"
        className="flex flex-col gap-y-4"
      >
        <fieldset className="flex flex-col gap-y-4">
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
              required
              className="block w-full appearance-none border border-gray-200 py-3 px-4"
              id="firstname"
              type="text"
              placeholder="First name" // See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values
              // and https://www.w3.org/TR/WCAG21/#input-purposes
              autoComplete="given-name"
            />
          </div>
          {/* <p className="text-xs italic text-red-500">Please fill out this field.</p> */}
          <div id="lastname-field">
            <label htmlFor="lastname" className="mb-1 block">
              Last name (required)
            </label>
            <input
              required
              className="block w-full appearance-none border border-gray-200 py-3 px-4"
              id="lastname"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
            />
          </div>
          <div id="phone-number-field">
            <label htmlFor="phoneNumber" className="mb-1 block">
              Phone number
            </label>
            <input
              className="block w-full appearance-none border border-gray-200 py-3 px-4"
              id="phoneNumber"
              type="tel"
              placeholder="Phone number"
            />
          </div>
          <div id="email-field">
            <label htmlFor="email" className="mb-1 block">
              Email address
            </label>
            <input
              className="block w-full appearance-none border border-gray-200 py-3 px-4"
              id="email"
              type="email"
              placeholder="Email address"
            />
          </div>
          <div id="message-field">
            <label htmlFor="message" className="mb-1 block">
              Message
            </label>
            <textarea
              autoComplete="off"
              rows={8}
              className="block w-full appearance-none border border-gray-200 py-3 px-4"
              id="message"
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
          name="Submit"
          value="Submit"
          className="mx-auto bg-purple py-3 px-2 text-white hover:cursor-pointer"
        />
      </Form>
    </div>
  );
}