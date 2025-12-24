import { Calendar } from "@/models/calendar";
import Image from "next/image";

export const OpeningVersicles = () => {
  const calendar = new Calendar();

  if (calendar.isSolemn()) {
    return (
      <p>
        [ <em>Omit Opening Versicles</em> ]
      </p>
    );
  }

  return (
    <Image
      src="/chants/daily-office-opening-versicles.svg"
      alt="Daily Office Opening Versicles"
      width="600"
      height="368"
    />
  );
};
