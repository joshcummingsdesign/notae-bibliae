import dayjs from "dayjs";

export const NuncDimittis = () => {
  const today = dayjs();
  const isSunday = today.day() === 0;

  const salvaNos = (
    <p>
      <em>
        Optionally add the{" "}
        <a href="/liturgy/music/chants/salva-nos-domine">Salva nos Domine</a>
      </em>
    </p>
  );

  return (
    <>
      <p>
        <strong>
          <a href="/liturgy/music/chants/nunc-dimittis">Nunc dimittis</a>
        </strong>{" "}
        (SDP 478, Tone III B 5)
      </p>
      {isSunday && salvaNos}
    </>
  );
};
