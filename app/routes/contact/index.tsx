export default function ContactRoute() {
  return (
    // See https://remix.run/docs/en/v1/guides/data-writes

    <div
      id="contact-page-content"
      className="flex flex-col gap-8 sm:flex-row"
    >
      <div
        id="form-content"
        className="mx-auto px-4 pt-5 text-sm sm:px-12"
      >
        <form
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
                First name
              </label>
              <input
                className="block w-full appearance-none border border-gray-200 py-3 px-4"
                id="firstname"
                type="text"
                placeholder="First name"
              />
            </div>
            {/* <p className="text-xs italic text-red-500">Please fill out this field.</p> */}
            <div id="lastname-field">
              <label htmlFor="lastname" className="mb-1 block">
                Last name
              </label>
              <input
                className="block w-full appearance-none border border-gray-200 py-3 px-4"
                id="lastname"
                type="text"
                placeholder="Last name"
              />
            </div>
            <div id="phone-number-field">
              <label htmlFor="phoneNumber" className="mb-1 block">
                Phone number
              </label>
              <input
                className="block w-full appearance-none border border-gray-200 py-3 px-4"
                id="phoneNumber"
                type="text"
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
                type="text"
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
              <input type="checkbox" name="subscribe" id="subscribe" />
              <label htmlFor="Newsletter" className="">
                Yes, sign me up to the newsletter
              </label>
            </div>
          </fieldset>
          <input
            type="submit"
            name="Submit"
            value="Submit"
            className="mx-auto bg-purple py-3 px-2 text-white"
          />
        </form>
      </div>
      <div id="map-content" className="mx-auto pt-5 sm:px-10">
        <p>Map</p>
      </div>
    </div>
  );
}
