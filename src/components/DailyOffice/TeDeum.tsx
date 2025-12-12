import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { getCalendarData } from "../Calendar/getCalendarData";
import { OtCanticle } from "./OtCanticle";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const TeDeum = () => {
  const today = dayjs();
  const {
    groupedCalendarData,
    currentDay,
    easter,
    passionSunday,
    liturgicalYear,
    seasons,
  } = getCalendarData(today);

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
    today.isSameOrAfter(advent.start) &&
    today.isSameOrBefore(advent.end);

  // From Christmas through the Octave of Epiphany in this case
  const isChristmastide =
    today.isSameOrAfter(`${liturgicalYear - 1}-12-25`) &&
    today.isSameOrBefore(`${liturgicalYear}-01-13`);

  const isLent =
    preLent &&
    today.isSameOrAfter(preLent.start) &&
    today.isSameOrBefore(passionSunday);

  const isOctaveOfEaster =
    today.isSameOrAfter(easter) && today.isSameOrBefore(easter.add(7, "day"));

  const isWhitsuntide =
    whitsuntide &&
    today.isSameOrAfter(whitsuntide.start) &&
    today.isSameOrBefore(whitsuntide.end);

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
    return <OtCanticle />;
  }

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
      {isEaster && victimae}
      {isPentecost && spiritus}
    </>
  );
};
