import { useLocales } from "~/providers/LocaleProvider";

type IntlDateProps = {
  date: Date;
  timeZone?: string;
};

export const Time = ({ date, timeZone }: IntlDateProps) => {
  const locales = useLocales();
  const isoString = date.toISOString();
  const formattedTime = new Intl.DateTimeFormat(locales, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);

  return <time dateTime={isoString}>{formattedTime}</time>;
};
