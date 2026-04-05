import Image from "next/image";

interface Props {
  isSolemn: boolean;
  isVigil: boolean;
}

export const OpeningVersicles: React.FC<Props> = ({ isSolemn, isVigil }) => {
  if (isSolemn && !isVigil) {
    return (
      <p>
        [ <em>Omit Opening Versicles</em> ]
      </p>
    );
  }

  return (
    <Image
      src="/chants/daily-office-opening-versicles.svg"
      alt="Daily Office Opening Versicles"
      width="600"
      height="368"
    />
  );
};
