import { siteTitle } from '~/root';

export default function Hero() {
  return (
    <div className="relative bg-[url('hero.jpg')] bg-cover bg-fixed bg-no-repeat">
      <span className="absolute right-8 bottom-8 w-[14ch] text-right text-5xl font-bold text-heroText">
        {siteTitle}
      </span>
    </div>
  );
}
