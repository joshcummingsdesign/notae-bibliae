import { Calendar } from "@/models/calendar";
import Image from "next/image";

export const Benedicamus = () => {
  const calendar = new Calendar();

  const getText = (t: string) => (
    <p>
      <em>{`❡ ${t} Tone`}</em> (SDP 252).
    </p>
  );

  if (calendar.isEastertide()) {
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

  if (calendar.isFeastDay() || calendar.isLordsDay()) {
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
