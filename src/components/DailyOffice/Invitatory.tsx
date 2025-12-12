import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { getCalendarData } from "@/lib/calendar";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const Invitatory = () => {
  const {
    today,
    currentDay,
    groupedCalendarData,
    liturgicalYear,
    seasons,
    easter,
    annunciation,
  } = getCalendarData();

  const todayItem = groupedCalendarData[today.format("YYYY-MM-DD")] || [];

  const advent = seasons.find((s) => s.name === "Advent");
  const christmastide = seasons.find((s) => s.name === "Christmastide");
  const epiphanytide = seasons.find((s) => s.name === "Epiphanytide");
  const preLent = seasons.find((s) => s.name === "Pre-Lent");
  const lent = seasons.find((s) => s.name === "Lent");
  const eastertide = seasons.find((s) => s.name === "Eastertide");
  const whitsuntide = seasons.find((s) => s.name === "Whitsuntide");
  const trinitytide = seasons.find((s) => s.name === "Trinitytide");

  let isSaint = false;
  let hasSaint = todayItem.some((item) => item.isSaint);
  if (hasSaint) {
    const sorted = todayItem.sort((a, b) => (a.class || 99) - (b.class || 99));
    if (sorted.length && sorted[0].isSaint) {
      isSaint = true;
    }
  }

  const isAdvent =
    advent &&
    today.isSameOrAfter(advent.start, "day") &&
    today.isSameOrBefore(advent.end, "day");

  const isChristmastide =
    christmastide &&
    today.isSameOrAfter(christmastide.start, "day") &&
    today.isSameOrBefore(christmastide.end, "day");

  const isEpiphanytide =
    epiphanytide &&
    today.isSameOrAfter(epiphanytide.start, "day") &&
    today.isSameOrBefore(epiphanytide.end, "day");

  const isTransfiguration = today.isSame(`${liturgicalYear}-08-06`, "day");

  const isLent =
    preLent &&
    lent &&
    today.isSameOrAfter(preLent.start, "day") &&
    today.isSameOrBefore(lent.end, "day");

  const isOctaveOfEaster =
    today.isSameOrAfter(easter, "day") &&
    today.isSameOrBefore(easter.add(7, "day"), "day");

  const isEastertide =
    eastertide &&
    today.isSameOrAfter(eastertide.start, "day") &&
    today.isSameOrBefore(eastertide.end, "day");

  const isAscensiontide =
    today.isSameOrAfter(easter.add(39, "day"), "day") &&
    today.isSameOrBefore(easter.add(48, "day"), "day");

  const isWhitsuntide =
    whitsuntide &&
    today.isSameOrAfter(whitsuntide.start, "day") &&
    today.isSameOrBefore(whitsuntide.end, "day");

  const isTrinitytide =
    trinitytide &&
    today.isSameOrAfter(trinitytide.start, "day") &&
    today.isSameOrBefore(trinitytide.end, "day");

  const isPurification = today.isSame(`${liturgicalYear}-02-02`, "day");

  const isAnnunciation = today.isSame(annunciation, "day");

  const isSolemn = [
    "Maundy Thursday",
    "Good Friday",
    "Holy Saturday",
    "All Souls' Day",
  ].some((d) => currentDay.includes(d));

  let sdpPage = 306; // Default: Advent
  if (isSaint) {
    sdpPage = 324;
  } else if (isTransfiguration) {
    sdpPage = 310;
  } else if (isAnnunciation) {
    sdpPage = 322;
  } else if (isPurification) {
    sdpPage = 322;
  } else if (isAscensiontide) {
    sdpPage = 316;
  } else if (isAdvent) {
    sdpPage = 306;
  } else if (isChristmastide) {
    sdpPage = 308;
  } else if (isEpiphanytide) {
    sdpPage = 310;
  } else if (isLent) {
    sdpPage = 312;
  } else if (isEastertide) {
    sdpPage = 314;
  } else if (isWhitsuntide) {
    sdpPage = 318;
  } else if (isTrinitytide) {
    sdpPage = 320;
  }

  if (isSolemn) {
    return (
      <p>
        [ <em>Omit Invitatory</em> ]
      </p>
    );
  }

  if (isOctaveOfEaster) {
    return (
      <p>
        <strong>
          <a href="/liturgy/music/chants/pascha-nostrum">Pascha nostrum</a>
        </strong>{" "}
        (SDP 342)
      </p>
    );
  }

  return (
    <p>
      <strong>
        <a href="/liturgy/music/chants/venite">Venite</a>
      </strong>{" "}
      (SDP {sdpPage})
    </p>
  );
};
