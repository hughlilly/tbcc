export default function Hero({
  page,
  text,
}: {
  page: string;
  text: string;
}) {
  const baseString = ` relative h-[calc(100vh-5rem)] bg-cover bg-center bg-no-repeat sm:h-[calc(100vh-8rem)]`;
  return (
    <div
      className={
        page === "home"
          ? "bg-hero-home" + baseString
          : page === "about"
          ? "bg-hero-about" + baseString
          : page === "faq"
          ? "bg-hero-faq" + baseString
          : page === "tournaments"
          ? "bg-hero-tournaments" + baseString
          : page === "laws"
          ? "bg-hero-laws" + baseString
          : page === "training"
          ? "bg-hero-training" + baseString
          : ""
      }
    >
      <span className="absolute right-8 bottom-8 w-[8ch] text-right text-xl font-bold leading-5 text-heroText sm:w-[14ch] sm:text-4xl xl:text-5xl">
        {text}
      </span>
    </div>
  );
}
