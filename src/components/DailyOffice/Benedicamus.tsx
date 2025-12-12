import { getCalendarData } from "@/lib/calendar";
import Image from "next/image";

export const Benedicamus = () => {
  const { today, seasons, groupedCalendarData } = getCalendarData();

  const todayItem = groupedCalendarData[today.format("YYYY-MM-DD")] || [];

  const eastertide = seasons.find((s) => s.name === "Eastertide");

  const isFeast = todayItem.some((item) => item.isFeast);
  const isLordsDay = today.day() === 0;

  const isEastertide =
    eastertide &&
    today.isSameOrAfter(eastertide.start, "day") &&
    today.isSameOrBefore(eastertide.end, "day");

  const getText = (t: string) => (
    <p>
      <em>{`❡ ${t} Tone`}</em> (SDP 252).
    </p>
  );

  if (isEastertide) {
    return (
      <>
        {getText("Eastertide")}
        <Image
          src="/chants/benedicamus-sarum-eastertide.svg"
          alt="Eastertide Tone"
          width="600"
          height="166"
        />
      </>
    );
  }

  if (isFeast || isLordsDay) {
    return (
      <>
        {getText("Festal")}
        <Image
          src="/chants/benedicamus-sarum-festal.svg"
          alt="Festal Tone"
          width="600"
          height="79"
        />
      </>
    );
  }

  return (
    <>
      {getText("Ferial")}
      <Image
        src="/chants/benedicamus-sarum-ferial.svg"
        alt="Ferial Tone"
        width="600"
        height="78"
      />
    </>
  );
};
