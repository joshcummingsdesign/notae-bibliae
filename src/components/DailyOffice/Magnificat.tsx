import { Calendar } from "@/models/calendar";
import { Fragment } from "react";

export const Magnificat = () => {
  const calendar = new Calendar();
  const today = calendar.getToday();
  const oAntiphons = calendar.getOAntiphons();
  const currentAntiphon = oAntiphons[today.format("YYYY-MM-DD")];

  let tone = !!currentAntiphon ? "Tone II S 1" : "Tone VIII S 1";
  let antiphon;

  if (currentAntiphon) {
    antiphon = (
      <>
        <p>
          <strong>{currentAntiphon.title}</strong>
        </p>
        <p>
          {currentAntiphon.text.split("\n").map((line, i) => (
            <Fragment key={i}>
              {line}
              <br />
            </Fragment>
          ))}
        </p>
      </>
    );
  }

  return (
    <>
      {antiphon}
      <p>
        <strong>
          <a href="/liturgy/music/chants/magnificat">Magnificat</a>
        </strong>{" "}
        (SDP 447, {tone})
      </p>
    </>
  );
};
