import { Calendar } from "@/models/calendar";
import Image from "next/image";

interface Props {
  office: "matins" | "evensong";
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
