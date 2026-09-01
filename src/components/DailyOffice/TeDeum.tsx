import Link from "next/link";

interface Props {
  shouldOmit: boolean;
}

export const TeDeum: React.FC<Props> = ({ shouldOmit }) => {
  if (shouldOmit) {
    return (
      <p>
        <strong>
          <Link href="/liturgy/music/chants/benedicite" target="_blank">
            Benedicite
          </Link>
        </strong>{" "}
        (SDP 367, Tone VII 4)
      </p>
    );
  }

  return (
    <p>
      <strong>
        <Link href="/liturgy/music/chants/te-deum" target="_blank">
          Te Deum
        </Link>
      </strong>{" "}
      (SDP 357)
    </p>
  );
};
