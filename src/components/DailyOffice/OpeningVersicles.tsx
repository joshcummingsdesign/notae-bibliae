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

  const header = (
    <p>
      [ <em>Stand</em> ]
    </p>
  );

  if (office === "evening-prayer") {
    if (calendar.isPreLent() || calendar.isLent()) {
      return (
        <>
          {header}
          <Image
            src="/chants/evensong-opening-versicles.svg"
            alt="Evening Prayer Opening Versicles"
            width="600"
            height="337"
          />
        </>
      );
    } else {
      return (
        <>
          {header}
          <Image
            src="/chants/evensong-opening-versicles-alleluia.svg"
            alt="Evening Prayer Opening Versicles with Alleluia"
            width="600"
            height="337"
          />
        </>
      );
    }
  }

  return (
    <>
      {header}
      <Image
        src="/chants/matins-opening-versicles.svg"
        alt="Morning Prayer Opening Versicles"
        width="600"
        height="77"
      />
    </>
  );
};
