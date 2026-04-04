import Link from "next/link";

interface Props {
  isEaster: boolean;
  isPentecost: boolean;
}

export const Hymn: React.FC<Props> = ({ isEaster, isPentecost }) => {
  const victimae = (
    <p>
      <strong>
        <Link
          href="/liturgy/music/chants/victimae-paschali-laudes"
          target="_blank"
        >
          Victimae paschali laudes
        </Link>
      </strong>
    </p>
  );

  const spiritus = (
    <p>
      <strong>
        <Link href="/liturgy/music/chants/veni-sancte-spiritus" target="_blank">
          Veni Sancte Spiritus
        </Link>
      </strong>
    </p>
  );

  return (
    <>
      {(isEaster || isPentecost) && <h2 id="hymn">Hymn</h2>}
      {isEaster && victimae}
      {isPentecost && spiritus}
    </>
  );
};
