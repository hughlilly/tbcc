import { siteTitle } from '~/root';

export default function Hero() {
  return (
    <div className="relative h-[calc(100vh-6rem)] bg-hero bg-cover bg-center bg-no-repeat sm:h-[calc(100vh-8rem)]">
      <span className="absolute right-8 bottom-8 w-[8ch] text-right text-xl font-bold leading-5 text-heroText sm:w-[14ch] sm:text-4xl xl:text-5xl">
        {siteTitle}
      </span>
    </div>
  );
}
