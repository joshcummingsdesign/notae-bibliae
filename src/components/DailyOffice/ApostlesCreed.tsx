import { getCalendarData } from "@/lib/calendar";

export const ApostlesCreed = () => {
  const { today, liturgicalYear, easter } = getCalendarData();
  const isChristmas = today.isSame(`${liturgicalYear - 1}-12-25`, "day");
  const isEpiphany = today.isSame(`${liturgicalYear}-01-06`, "day");
  const isEaster = today.isSame(easter, "day");
  const isAscension = today.isSame(easter.add(39, "day"), "day");
  const isPentecost = today.isSame(easter.add(49, "day"), "day");
  const isJohnBaptist = today.isSame(`${liturgicalYear}-06-24`, "day");
  const isJames = today.isSame(`${liturgicalYear}-07-25`, "day");
  const isBartholomew = today.isSame(`${liturgicalYear}-08-24`, "day");
  const isMatthew = today.isSame(`${liturgicalYear}-09-21`, "day");
  const isSimonJude = today.isSame(`${liturgicalYear}-10-28`, "day");
  const isAndrew = today.isSame(`${liturgicalYear}-11-30`, "day");
  const isTrinitySunday = today.isSame(easter.add(39, "day"), "day");

  const isAthanasian =
    isChristmas ||
    isEpiphany ||
    isEaster ||
    isAscension ||
    isPentecost ||
    isJohnBaptist ||
    isJames ||
    isBartholomew ||
    isMatthew ||
    isSimonJude ||
    isAndrew ||
    isTrinitySunday;

  if (isAthanasian) {
    return (
      <p>
        <strong>
          <a href="/liturgy/creeds/athanasian-creed">Athanasian Creed</a>
        </strong>{" "}
        (SDP 429)
      </p>
    );
  }

  return (
    <p>
      <strong>
        <a href="/liturgy/creeds/apostles-creed">Apostles' Creed</a>
      </strong>{" "}
      (SDP 248)
    </p>
  );
};
