import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { getCalendarData } from "../Calendar/getCalendarData";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const Invitatory = () => {
  const today = dayjs();
  const {
    currentDay,
    groupedCalendarData,
    liturgicalYear,
    seasons,
    easter,
    annunciation,
  } = getCalendarData(today);

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
    today.isSameOrAfter(advent.start) &&
    today.isSameOrBefore(advent.end);

  const isChristmastide =
    christmastide &&
    today.isSameOrAfter(christmastide.start) &&
    today.isSameOrBefore(christmastide.end);

  const isEpiphanytide =
    epiphanytide &&
    today.isSameOrAfter(epiphanytide.start) &&
    today.isSameOrBefore(epiphanytide.end);

  const isTransfiguration = today.isSame(`${liturgicalYear}-08-06`);

  const isLent =
    preLent &&
    lent &&
    today.isSameOrAfter(preLent.start) &&
    today.isSameOrBefore(lent.end);

  const isOctaveOfEaster =
    today.isSameOrAfter(easter) && today.isSameOrBefore(easter.add(7, "day"));

  const isEastertide =
    eastertide &&
    today.isSameOrAfter(eastertide.start) &&
    today.isSameOrBefore(eastertide.end);

  const isAscensiontide =
    today.isSameOrAfter(easter.add(39, "day")) &&
    today.isSameOrBefore(easter.add(48, "day"));

  const isWhitsuntide =
    whitsuntide &&
    today.isSameOrAfter(whitsuntide.start) &&
    today.isSameOrBefore(whitsuntide.end);

  const isTrinitytide =
    trinitytide &&
    today.isSameOrAfter(trinitytide.start) &&
    today.isSameOrBefore(trinitytide.end);

  const isPurification = today.isSame(`${liturgicalYear}-02-02`);

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
