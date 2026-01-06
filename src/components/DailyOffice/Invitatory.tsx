import Link from "next/link";

interface Props {
  page: number;
  isSolemn: boolean;
  isOctaveOfEaster: boolean;
}

export const Invitatory: React.FC<Props> = ({
  page,
  isSolemn,
  isOctaveOfEaster,
}) => {
  if (isSolemn) {
    return (
      <p>
        [ <em>Omit Invitatory</em> ]
      </p>
    );
  }

  if (isOctaveOfEaster) {
    return (
      <p>
        <strong>
          <Link href="/liturgy/music/chants/pascha-nostrum" target="_blank">
            Pascha nostrum
          </Link>
        </strong>{" "}
        (SDP 342)
      </p>
    );
  }

  return (
    <p>
      <strong>
        <Link href="/liturgy/music/chants/venite" target="_blank">
          Venite
        </Link>
      </strong>{" "}
      (SDP {page})
    </p>
  );
};
