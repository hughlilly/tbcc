import { Cloudinary } from "@cloudinary/url-gen";
// Import the responsive plugin
import { AdvancedImage, responsive } from "@cloudinary/react";

export default function Hero() {
  const cld = new Cloudinary({ cloud: { cloudName: "demo" } });
  // Use the image with public ID, 'sample'.
  const homeHero = cld.image("sample");

  // Use the responsive plugin, setting the step size to 200 pixels
  return (
    <AdvancedImage cldImg={homeHero} plugins={[responsive({ steps: 200 })]} />
  );
}
