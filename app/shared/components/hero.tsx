import { siteTitle } from "~/root";

export default function Hero() {
  return (
    <div className="relative bg-[url('~/hero.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
      <span className="absolute right-8 bottom-8 w-[14ch] text-5xl font-bold text-heroText text-right">
        {siteTitle}
      </span>
    </div>
  );
}
