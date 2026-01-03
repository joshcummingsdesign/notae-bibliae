import Link from "next/link";

interface Props {
  isLordsDay: boolean;
}

export const NuncDimittis: React.FC<Props> = ({ isLordsDay }) => {
  const salvaNos = (
    <p>
      <em>
        Optionally add the{" "}
        <Link href="/liturgy/music/chants/salva-nos-domine">
          Salva nos Domine
        </Link>
      </em>
    </p>
  );

  return (
    <>
      <p>
        <strong>
          <Link href="/liturgy/music/chants/nunc-dimittis">Nunc dimittis</Link>
        </strong>{" "}
        (SDP 478, Tone III B 5)
      </p>
      {isLordsDay && salvaNos}
    </>
  );
};
