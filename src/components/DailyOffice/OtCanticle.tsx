import { Dayjs } from "dayjs";
import Link from "next/link";

interface Props {
  today: Dayjs;
}

export const OtCanticle: React.FC<Props> = ({ today }) => {
  const day = today.day();
  const monday = 1;
  const tuesday = 2;
  const wednesday = 3;
  const thursday = 4;
  const friday = 5;
  const saturday = 6;

  let canticle;

  switch (day) {
    case monday:
      canticle = (
        <Canticle
          link="/liturgy/music/chants/song-of-isaiah"
          text="Song of Isaiah"
          notes="SDP 380"
        />
      );
      break;
    case tuesday:
      canticle = (
        <Canticle
          link="/liturgy/music/chants/song-of-hezekiah"
          text="Song of Hezekiah"
          notes="SDP 381"
        />
      );
      break;
    case wednesday:
      canticle = (
        <Canticle
          link="/liturgy/music/chants/song-of-hannah"
          text="Song of Hannah"
          notes="SDP 383"
        />
      );
      break;
    case thursday:
      canticle = (
        <Canticle
          link="/liturgy/music/chants/song-of-moses-exod"
          text="Song of Moses from Exod."
          notes="SDP 386"
        />
      );
      break;
    case friday:
      canticle = (
        <Canticle
          link="/liturgy/music/chants/song-of-habakkuk"
          text="Song of Habakkuk"
          notes="SDP 389"
        />
      );
      break;
    case saturday:
      canticle = (
        <Canticle
          link="/liturgy/music/chants/song-of-moses-deut-pt-1"
          text="Song of Moses from Deut."
          notes="SDP 392"
        />
      );
      break;
  }

  if (!canticle) {
    canticle = (
      <Canticle
        link="/liturgy/music/chants/benedicite"
        text="Benedicite"
        notes="SDP 367, Tone VII 4"
      />
    );
  }

  return canticle;
};

const Canticle: React.FC<{ link: string; text: string; notes: string }> = ({
  text,
  link,
  notes,
}) => (
  <p>
    <strong>
      <Link href={link}>{text}</Link>
    </strong>{" "}
    ({notes})
  </p>
);
