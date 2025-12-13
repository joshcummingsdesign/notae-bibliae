import { Calendar } from "@/models/calendar";

export const Invitatory = () => {
  const calendar = new Calendar();

  let sdpPage = 306; // Default: Advent
  if (calendar.isFeastOfASaint()) {
    sdpPage = 324;
  } else if (calendar.isTransfiguration()) {
    sdpPage = 310;
  } else if (calendar.isAnnunciation()) {
    sdpPage = 322;
  } else if (calendar.isPurification()) {
    sdpPage = 322;
  } else if (calendar.isAscensiontide()) {
    sdpPage = 316;
  } else if (calendar.isAdvent()) {
    sdpPage = 306;
  } else if (calendar.isChristmastide()) {
    sdpPage = 308;
  } else if (calendar.isEpiphanytide()) {
    sdpPage = 310;
  } else if (calendar.isLent()) {
    sdpPage = 312;
  } else if (calendar.isEastertide()) {
    sdpPage = 314;
  } else if (calendar.isWhitsuntide()) {
    sdpPage = 318;
  } else if (calendar.isTrinitytide()) {
    sdpPage = 320;
  }

  if (calendar.isSolemn()) {
    return (
      <p>
        [ <em>Omit Invitatory</em> ]
      </p>
    );
  }

  if (calendar.isOctaveOfEaster()) {
    return (
      <p>
        <strong>
          <a href="/liturgy/music/chants/pascha-nostrum">Pascha nostrum</a>
        </strong>{" "}
        (SDP 342)
      </p>
    );
  }

  return (
    <p>
      <strong>
        <a href="/liturgy/music/chants/venite">Venite</a>
      </strong>{" "}
      (SDP {sdpPage})
    </p>
  );
};
