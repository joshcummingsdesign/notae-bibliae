import dayjs from "dayjs";

export const OtCanticle = () => {
  const today = dayjs();
  const day = today.day();
  const monday = 1;
  const tuesday = 2;
  const wednesday = 3;
  const thursday = 4;
  const friday = 5;
  const saturday = 6;
  const isChristmas = today.isSame(dayjs("2025-12-25"), "day");

  let canticle;

  switch (day) {
    case monday:
      canticle = (
        <p>
          <strong>
            <a href="/liturgy/music/chants/song-of-isaiah">Song of Isaiah</a>
          </strong>{" "}
          (SDP 380)
        </p>
      );
      break;
    case tuesday:
      canticle = (
        <p>
          <strong>
            <a href="/liturgy/music/chants/song-of-hezekiah">
              Song of Hezekiah
            </a>
          </strong>{" "}
          (SDP 381)
        </p>
      );
      break;
    case wednesday:
      canticle = (
        <p>
          <strong>
            <a href="/liturgy/music/chants/song-of-hannah">Song of Hannah</a>
          </strong>{" "}
          (SDP 383)
        </p>
      );
      break;
    case thursday:
      canticle = (
        <p>
          <strong>
            <a href="/liturgy/music/chants/song-of-moses-exod">
              Song of Moses from Exod.
            </a>
          </strong>{" "}
          (SDP 386)
        </p>
      );
      break;
    case friday:
      canticle = (
        <p>
          <strong>
            <a href="/liturgy/music/chants/song-of-habakkuk">
              Song of Habakkuk
            </a>
          </strong>{" "}
          (SDP 389)
        </p>
      );
      break;
    case saturday:
      canticle = (
        <p>
          <strong>
            <a href="/liturgy/music/chants/song-of-moses-deut-pt-1">
              Song of Moses from Deut.
            </a>
          </strong>{" "}
          (SDP 392)
        </p>
      );
      break;
  }

  if (!canticle || isChristmas) {
    const facta = (
      <p>
        <em>
          Optionally add the{" "}
          <a href="/liturgy/music/chants/facta-est-cum-angelo">
            Facta est cum Angelo
          </a>
        </em>
      </p>
    );

    canticle = (
      <>
        <p>
          <strong>
            <a href="/liturgy/music/chants/benedicite">Benedicite</a>
          </strong>{" "}
          (SDP 367, Tone VII 4)
        </p>
        {isChristmas && facta}
      </>
    );
  }

  return canticle;
};
