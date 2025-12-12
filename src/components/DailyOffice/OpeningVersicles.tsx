import Image from "next/image";
import dayjs from "dayjs";
import { getCalendarData } from "../Calendar/getCalendarData";

interface Props {
  office: "matins" | "evensong";
}

export const OpeningVersicles: React.FC<Props> = ({ office }) => {
  const today = dayjs();
  const { currentDay } = getCalendarData(today);

  const isSolemn = [
    "Maundy Thursday",
    "Good Friday",
    "Holy Saturday",
    "All Souls' Day",
  ].some((d) => currentDay.includes(d));

  if (isSolemn) {
    return (
      <p>
        [ <em>Omit Opening Versicles</em> ]
      </p>
    );
  }

  if (office === "evensong") {
    return (
      <Image
        src="/chants/evensong-opening-versicles.svg"
        alt="Evensong Opening Versicles"
        width="600"
        height="371"
      />
    );
  }

  return (
    <Image
      src="/chants/matins-opening-versicles.svg"
      alt="Matins Opening Versicles"
      width="600"
      height="456"
    />
  );
};
