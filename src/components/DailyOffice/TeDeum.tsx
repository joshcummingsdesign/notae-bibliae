import { Calendar } from "@/models/calendar";
import { OtCanticle } from "./OtCanticle";
import Link from "next/link";

export const TeDeum = () => {
  const calendar = new Calendar();

  const shouldSingTeDeum =
    calendar.isFeastDay() ||
    calendar.isLordsDay() ||
    calendar.isChristmastide() ||
    calendar.isOctaveOfEpiphany() ||
    calendar.isEastertide() ||
    calendar.isWhitsuntide();

  const shouldOmitTeDeum =
    calendar.isAdvent() ||
    (calendar.isHolyInnocents() && !calendar.isLordsDay()) ||
    calendar.isSeptuagesimaToPassion() ||
    calendar.isRogationDay() ||
    calendar.isSolemn();

  if (shouldOmitTeDeum || !shouldSingTeDeum) {
    return <OtCanticle today={calendar.getToday()} />;
  }

  const facta = (
    <p>
      <em>
        Optionally add the{" "}
        <Link href="/liturgy/music/chants/facta-est-cum-angelo">
          Facta est cum Angelo
        </Link>
      </em>
    </p>
  );

  const benedicite = (
    <>
      <p>
        <strong>— or —</strong>
      </p>
      <p>
        <strong>
          <Link href="/liturgy/music/chants/benedicite">Benedicite</Link>
        </strong>{" "}
        (SDP 367, Tone VII 4)
      </p>
      {facta}
    </>
  );

  const victimae = (
    <p>
      <em>
        Optionally replace with the{" "}
        <Link href="/liturgy/music/chants/victimae-paschali-laudes">
          Victimae paschali laudes
        </Link>
      </em>
    </p>
  );

  const spiritus = (
    <p>
      <em>
        Optionally replace with the{" "}
        <Link href="/liturgy/music/chants/veni-sancte-spiritus">
          Veni Sancte Spiritus
        </Link>
      </em>
    </p>
  );

  return (
    <>
      <h2 id="te-deum">Te Deum</h2>
      <p>
        [ <em>Stand</em> ]
      </p>
      <p>
        <strong>
          <Link href="/liturgy/music/chants/te-deum">Te Deum</Link>
        </strong>{" "}
        (SDP 357)
      </p>
      {calendar.isChristmas() && benedicite}
      {calendar.isEaster() && victimae}
      {calendar.isPentecost() && spiritus}
    </>
  );
};
