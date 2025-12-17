import { Calendar } from "@/models/calendar";
import Image from "next/image";

interface Props {
  office: "morning-prayer" | "evening-prayer";
}

export const OpeningVersicles: React.FC<Props> = ({ office }) => {
  const calendar = new Calendar();

  if (calendar.isSolemn()) {
    return (
      <p>
        [ <em>Omit Opening Versicles</em> ]
      </p>
    );
  }

  if (office === "evening-prayer") {
    if (calendar.isPreLent() || calendar.isLent()) {
      return (
        <Image
          src="/chants/evensong-opening-versicles.svg"
          alt="Evening Prayer Opening Versicles"
          width="600"
          height="337"
        />
      );
    } else {
      return (
        <Image
          src="/chants/evensong-opening-versicles-alleluia.svg"
          alt="Evening Prayer Opening Versicles with Alleluia"
          width="600"
          height="337"
        />
      );
    }
  }

  return (
    <Image
      src="/chants/matins-opening-versicles.svg"
      alt="Morning Prayer Opening Versicles"
      width="600"
      height="77"
    />
  );
};
