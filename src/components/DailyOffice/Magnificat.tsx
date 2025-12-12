import dayjs from "dayjs";
import { getCalendarData } from "../Calendar/getCalendarData";

export const Magnificat = () => {
  const today = dayjs();
  const { liturgicalYear } = getCalendarData(today);

  let tone = "Tone VIII S 1";
  let useAltTone = false;
  let antiphon;

  if (today.isSame(`${liturgicalYear - 1}-12-17`, "day")) {
    useAltTone = true;
    antiphon = (
      <>
        <p>
          <strong>O Sapientia</strong>
        </p>
        <p>
          O come, thou Wisdom from on high,
          <br />
          Who orderest all things mightily;
          <br />
          To us the path of knowledge show,
          <br />
          And teach us in her ways to go.
          <br />
          Rejoice! Rejoice! Emmanuel
          <br />
          Shall come to thee, O Israel.
        </p>
      </>
    );
  } else if (today.isSame(`${liturgicalYear - 1}-12-18`, "day")) {
    useAltTone = true;
    antiphon = (
      <>
        <p>
          <strong>O Adonai</strong>
        </p>
        <p>
          O come, O come, thou Lord of Might
          <br />
          Who to thy tribes, on Sinai's height,
          <br />
          In ancient times didst give the law,
          <br />
          In cloud, and majesty, and awe.
          <br />
          Rejoice! Rejoice! Emmanuel
          <br />
          Shall come to thee, O Israel.
        </p>
      </>
    );
  } else if (today.isSame(`${liturgicalYear - 1}-12-19`, "day")) {
    useAltTone = true;
    antiphon = (
      <>
        <p>
          <strong>O Radix Jesse</strong>
        </p>
        <p>
          O come, thou Root of Jesse's tree,
          <br />
          Free them from Satan's tyranny,
          <br />
          That trust thy mighty power to save,
          <br />
          And give them victory o'er the grave.
          <br />
          Rejoice! Rejoice! Emmanuel
          <br />
          Shall come to thee, O Israel.
        </p>
      </>
    );
  } else if (today.isSame(`${liturgicalYear - 1}-12-20`, "day")) {
    useAltTone = true;
    antiphon = (
      <>
        <p>
          <strong>O Clavis David</strong>
        </p>
        <p>
          O come, thou Key of David, come
          <br />
          And open wide our heavenly home;
          <br />
          Make safe the way that leads our hearts to thee,
          <br />
          And close the door to misery.
          <br />
          Rejoice! Rejoice! Emmanuel
          <br />
          Shall come to thee, O Israel.
        </p>
      </>
    );
  } else if (today.isSame(`${liturgicalYear - 1}-12-21`, "day")) {
    useAltTone = true;
    antiphon = (
      <>
        <p>
          <strong>O Oriens</strong>
        </p>
        <p>
          O come, thou Dayspring, come and cheer
          <br />
          Our spirits by thine advent here,
          <br />
          And drive away the gloomy clouds of night,
          <br />
          And death's dark shadows put to flight.
          <br />
          Rejoice! Rejoice! Emmanuel
          <br />
          Shall come to thee, O Israel.
        </p>
      </>
    );
  } else if (today.isSame(`${liturgicalYear - 1}-12-22`, "day")) {
    useAltTone = true;
    antiphon = (
      <>
        <p>
          <strong>O Rex gentium</strong>
        </p>
        <p>
          O come, Desire of nations, bind
          <br />
          In one the hearts of all mankind;
          <br />
          Bid thou our sad divisions cease,
          <br />
          And be thyself our King of Peace.
          <br />
          Rejoice! Rejoice! Emmanuel
          <br />
          Shall come to thee, O Israel.
        </p>
      </>
    );
  } else if (today.isSame(`${liturgicalYear - 1}-12-23`, "day")) {
    useAltTone = true;
    antiphon = (
      <>
        <p>
          <strong>O Emmanuel</strong>
        </p>
        <p>
          O come, O come, Emmanuel
          <br />
          And ransom captive Israel,
          <br />
          That mourns in lonely exile here
          <br />
          Until the Son of God appear.
          <br />
          Rejoice! Rejoice! Emmanuel
          <br />
          Shall come to thee, O Israel.
        </p>
      </>
    );
  }

  if (useAltTone) {
    tone = "Tone II S 1";
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
