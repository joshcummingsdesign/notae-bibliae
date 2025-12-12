import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { getCalendarData } from "@/lib/calendar";
import { OtCanticle } from "./OtCanticle";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const TeDeum = () => {
  const {
    today,
    groupedCalendarData,
    currentDay,
    easter,
    passionSunday,
    liturgicalYear,
    seasons,
  } = getCalendarData();

  const todayItem = groupedCalendarData[today.format("YYYY-MM-DD")] || [];

  const advent = seasons.find((s) => s.name === "Advent");
  const preLent = seasons.find((s) => s.name === "Pre-Lent");
  const whitsuntide = seasons.find((s) => s.name === "Whitsuntide");

  const isFeast = todayItem.some((item) => item.isFeast);
  const isLordsDay = today.day() === 0;
  const isEaster = today.isSame(easter, "day");
  const isPentecost = currentDay.includes("Pentecost");

  const isAdvent =
    advent &&
    today.isSameOrAfter(advent.start, "day") &&
    today.isSameOrBefore(advent.end, "day");

  // From Christmas through the Octave of Epiphany in this case
  const isChristmas = today.isSame(`${liturgicalYear - 1}-12-25`, "day");
  const isChristmastide =
    today.isSameOrAfter(`${liturgicalYear - 1}-12-25`, "day") &&
    today.isSameOrBefore(`${liturgicalYear}-01-13`, "day");

  const isLent =
    preLent &&
    today.isSameOrAfter(preLent.start, "day") &&
    today.isSameOrBefore(passionSunday, "day");

  const isOctaveOfEaster =
    today.isSameOrAfter(easter, "day") &&
    today.isSameOrBefore(easter.add(7, "day"), "day");

  const isWhitsuntide =
    whitsuntide &&
    today.isSameOrAfter(whitsuntide.start, "day") &&
    today.isSameOrBefore(whitsuntide.end, "day");

  const isSolemn = [
    "Maundy Thursday",
    "Good Friday",
    "Holy Saturday",
    "All Souls' Day",
  ].some((d) => currentDay.includes(d));

  const isHolyInnocents =
    !isLordsDay && currentDay.includes("Holy Innocents' Day");

  const shouldSingTeDeum =
    isFeast ||
    isLordsDay ||
    isChristmastide ||
    isOctaveOfEaster ||
    isWhitsuntide;

  const shouldOmitTeDeum = isAdvent || isHolyInnocents || isLent || isSolemn;

  if (shouldOmitTeDeum || !shouldSingTeDeum) {
    return <OtCanticle today={today} />;
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
      {isChristmas && benedicite}
      {isEaster && victimae}
      {isPentecost && spiritus}
    </>
  );
};
