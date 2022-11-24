import ContactForm from "./../../contact-form";
import { siteTitle } from "~/root";

export function meta() {
  return {
    title: `Contact Us | ${siteTitle}`,
  };
}

export default function ContactRoute() {
  return (
    // See https://remix.run/docs/en/v1/guides/data-writes

    <div
      id="contact-page-content"
      className="flex flex-col divide-y divide-solid lg:flex-row lg:divide-none"
    >
      <ContactForm />
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
    </div>
  );
}
