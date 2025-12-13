import { Calendar } from "@/models/calendar";
import Link from "next/link";

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
          <Link href="/liturgy/creeds/athanasian-creed">Athanasian Creed</Link>
        </strong>{" "}
        (SDP 429)
      </p>
    );
  }

  return (
    <p>
      <strong>
        <Link href="/liturgy/creeds/apostles-creed">Apostles' Creed</Link>
      </strong>{" "}
      (SDP 248)
    </p>
  );
};
