export default function Hero({
  page,
  text,
}: {
  page: string;
  text: string;
}) {
  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`bg-hero-${page} relative h-[calc(100vh-5rem)] bg-cover bg-center bg-no-repeat sm:h-[calc(100vh-8rem)]`}
    >
      <span className="absolute right-8 bottom-8 w-[8ch] text-right text-xl font-bold leading-5 text-heroText sm:w-[14ch] sm:text-4xl xl:text-5xl">
        {text}
      </span>
    </div>
  );
}
