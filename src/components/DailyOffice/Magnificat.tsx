import { Calendar } from "@/models/calendar";
import Link from "next/link";
import { Antiphon } from "@/components/Antiphon";
import { Red } from "../text/Red";

interface Props {
  linkAntiphon?: boolean;
  showAntiphonVerse?: boolean;
}

export const Magnificat: React.FC<Props> = ({
  linkAntiphon,
  showAntiphonVerse,
}) => {
  const calendar = new Calendar();
  const today = calendar.getToday();
  const oAntiphons = calendar.getOAntiphons();
  const currentAntiphon = oAntiphons[today.format("YYYY-MM-DD")];

  let tone = !!currentAntiphon ? "Tone II S 1" : "Tone VIII S 1";
  let antiphon;

  if (currentAntiphon) {
    antiphon = (
      <Antiphon
        ant={true}
        linked={linkAntiphon}
        showVerse={showAntiphonVerse}
        antiphon={currentAntiphon}
      />
    );
  }

  return (
    <>
      {antiphon}
      <p>
        <strong>
          <Link href="/liturgy/music/chants/magnificat">Magnificat</Link>
        </strong>{" "}
        (SDP 447, {tone})
      </p>
      {currentAntiphon && (
        <p>
          <strong>
            <Red text="Ant." />
          </strong>{" "}
          Same as above.
        </p>
      )}
    </>
  );
};
