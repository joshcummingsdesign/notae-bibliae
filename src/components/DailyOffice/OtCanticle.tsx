import dayjs from "dayjs";
import Link from "next/link";

interface Props {
  today: string;
}

export interface OtCanticleDefinition {
  link: string;
  text: string;
  notes: string;
}

export const BENEDICITE_CANTICLE: OtCanticleDefinition = {
  link: "/liturgy/music/chants/benedicite",
  text: "Benedicite",
  notes: "SDP 367, Tone VII 4",
};

export const getOtCanticle = (today: string): OtCanticleDefinition => {
  const day = dayjs(today).day();
  const monday = 1;
  const tuesday = 2;
  const wednesday = 3;
  const thursday = 4;
  const friday = 5;
  const saturday = 6;

  switch (day) {
    case monday:
      return {
        link: "/liturgy/music/chants/song-of-isaiah",
        text: "Song of Isaiah",
        notes: "SDP 380",
      };
    case tuesday:
      return {
        link: "/liturgy/music/chants/song-of-hezekiah",
        text: "Song of Hezekiah",
        notes: "SDP 381",
      };
    case wednesday:
      return {
        link: "/liturgy/music/chants/song-of-hannah",
        text: "Song of Hannah",
        notes: "SDP 383",
      };
    case thursday:
      return {
        link: "/liturgy/music/chants/song-of-moses-exod",
        text: "Song of Moses from Exod.",
        notes: "SDP 386",
      };
    case friday:
      return {
        link: "/liturgy/music/chants/song-of-habakkuk",
        text: "Song of Habakkuk",
        notes: "SDP 389",
      };
    case saturday:
      return {
        link: "/liturgy/music/chants/song-of-moses-deut-pt-1",
        text: "Song of Moses from Deut.",
        notes: "SDP 392",
      };
    default:
      return BENEDICITE_CANTICLE;
  }
};

export const CanticleLink: React.FC<{
  canticle: OtCanticleDefinition;
  isOptional?: boolean;
}> = ({ canticle, isOptional }) =>
  isOptional ? (
    <p>
      <em>
        Or optionally,{" "}
        <Link href={canticle.link} target="_blank">
          {canticle.text}
        </Link>{" "}
        ({canticle.notes})
      </em>
    </p>
  ) : (
    <p>
      <strong>
        <Link href={canticle.link} target="_blank">
          {canticle.text}
        </Link>
      </strong>{" "}
      ({canticle.notes})
    </p>
  );
