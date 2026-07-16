import Link from "next/link";

interface Props {
  isLordsDay: boolean;
}

export const NuncDimittis: React.FC<Props> = ({ isLordsDay }) => {
  return (
    <p>
      <strong>
        <Link href="/liturgy/music/chants/nunc-dimittis" target="blank">
          Nunc dimittis
        </Link>
      </strong>{" "}
      (SDP 478, Tone III B 5)
    </p>
  );
};
