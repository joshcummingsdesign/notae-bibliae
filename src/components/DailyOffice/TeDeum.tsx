import { Calendar } from "@/models/calendar";
import { OtCanticle } from "./OtCanticle";

export const TeDeum = () => {
  const calendar = new Calendar();

  const shouldSingTeDeum =
    calendar.isFeastDay() ||
    calendar.isLordsDay() ||
    calendar.isChristmastide() ||
    calendar.isOctaveOfEaster() ||
    calendar.isWhitsuntide();

  const shouldOmitTeDeum =
    calendar.isAdvent() ||
    calendar.isHolyInnocents() ||
    calendar.isLent() ||
    calendar.isSolemn();

  if (shouldOmitTeDeum || !shouldSingTeDeum) {
    return <OtCanticle today={calendar.getToday()} />;
  }

  const facta = (
    <p>
      <em>
        Optionally add the{" "}
        <a href="/liturgy/music/chants/facta-est-cum-angelo">
          Facta est cum Angelo
        </a>
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
          <a href="/liturgy/music/chants/benedicite">Benedicite</a>
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
        <a href="/liturgy/music/chants/victimae-paschali-laudes">
          Victimae paschali laudes
        </a>
      </em>
    </p>
  );

  const spiritus = (
    <p>
      <em>
        Optionally replace with the{" "}
        <a href="/liturgy/music/chants/veni-sancte-spiritus">
          Veni Sancte Spiritus
        </a>
      </em>
    </p>
  );

  return (
    <>
      <p>
        <strong>
          <a href="/liturgy/music/chants/te-deum">Te Deum</a>
        </strong>{" "}
        (SDP 357)
      </p>
      {calendar.isChristmas() && benedicite}
      {calendar.isEaster() && victimae}
      {calendar.isPentecost() && spiritus}
    </>
  );
};
