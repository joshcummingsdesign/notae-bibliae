import Link from "next/link";

interface Props {
  shouldOmit: boolean;
}

export const Benedictus: React.FC<Props> = ({ shouldOmit }) => {
  if (shouldOmit) {
    return (
      <p>
        <strong>
          <Link href="/liturgy/music/chants/jubilate-deo" target="_blank">
            Jubilate Deo
          </Link>
        </strong>{" "}
        (SDP 138)
      </p>
    );
  }

  return (
    <p>
      <strong>
        <Link href="/liturgy/music/chants/benedictus" target="_blank">
          Benedictus
        </Link>
      </strong>{" "}
      (SDP 420)
    </p>
  );
};
