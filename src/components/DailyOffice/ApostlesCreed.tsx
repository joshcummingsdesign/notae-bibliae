import { Calendar } from "@/models/calendar";

export const ApostlesCreed = () => {
  const calendar = new Calendar();

  const isAthanasian =
    calendar.isChristmas() ||
    calendar.isEpiphany() ||
    calendar.isEaster() ||
    calendar.isAscension() ||
    calendar.isPentecost() ||
    calendar.isNativityOfStJohnBaptist() ||
    calendar.isFeastOfStJames() ||
    calendar.isFeastOfStBartholomew() ||
    calendar.isFeastOfStMatthew() ||
    calendar.isFeastOfSsSimonAndJude() ||
    calendar.isFeastOfStAndrew() ||
    calendar.isTrinitySunday();

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
