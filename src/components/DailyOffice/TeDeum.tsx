import { OtCanticle } from "./OtCanticle";
import Link from "next/link";

interface Props {
  today: string;
  shouldSing: boolean;
  shouldOmit: boolean;
  isChristmas: boolean;
  isEaster: boolean;
  isPentecost: boolean;
}

export const TeDeum: React.FC<Props> = ({
  today,
  shouldSing,
  shouldOmit,
  isChristmas,
  isEaster,
  isPentecost,
}) => {
  if (shouldOmit || !shouldSing) {
    return <OtCanticle today={today} />;
  }

  const facta = (
    <p>
      <em>
        Optionally add the{" "}
        <Link href="/liturgy/music/chants/facta-est-cum-angelo" target="_blank">
          Facta est cum Angelo
        </Link>
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
          <Link href="/liturgy/music/chants/benedicite" target="_blank">
            Benedicite
          </Link>
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
        <Link
          href="/liturgy/music/chants/victimae-paschali-laudes"
          target="_blank"
        >
          Victimae paschali laudes
        </Link>
      </em>
    </p>
  );

  const spiritus = (
    <p>
      <em>
        Optionally replace with the{" "}
        <Link href="/liturgy/music/chants/veni-sancte-spiritus" target="_blank">
          Veni Sancte Spiritus
        </Link>
      </em>
    </p>
  );

  return (
    <>
      <h2 id="te-deum">Te Deum</h2>
      <p>
        [ <em>Stand</em> ]
      </p>
      <p>
        <strong>
          <Link href="/liturgy/music/chants/te-deum" target="_blank">
            Te Deum
          </Link>
        </strong>{" "}
        (SDP 357)
      </p>
      {isChristmas && benedicite}
      {isEaster && victimae}
      {isPentecost && spiritus}
    </>
  );
};
