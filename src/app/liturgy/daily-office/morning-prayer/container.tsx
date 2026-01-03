"use client";
import { Today } from "@/components/Calendar";
import {
  Invitatory,
  OpeningSentence,
  OpeningVersicles,
} from "@/components/DailyOffice";
import { Initial } from "@/components/text/Initial";
import { Calendar } from "@/models/calendar";
import Confession from "./confession.mdx";

export const Container = () => {
  const calendar = new Calendar();
  const today = calendar.getToday();
  const currentDay = calendar.getCurrentDayString();
  const isSolemn = calendar.isSolemn();
  const isOctaveOfEaster = calendar.isOctaveOfEaster();

  let invitatoryPage = 306; // Default: Advent
  if (calendar.isFeastOfASaint()) {
    invitatoryPage = 324;
  } else if (calendar.isTransfiguration()) {
    invitatoryPage = 310;
  } else if (calendar.isAnnunciation()) {
    invitatoryPage = 322;
  } else if (calendar.isPurification()) {
    invitatoryPage = 322;
  } else if (calendar.isAscensiontide()) {
    invitatoryPage = 316;
  } else if (calendar.isAdvent()) {
    invitatoryPage = 306;
  } else if (calendar.isChristmastide()) {
    invitatoryPage = 308;
  } else if (calendar.isEpiphanytide()) {
    invitatoryPage = 310;
  } else if (calendar.isLent()) {
    invitatoryPage = 312;
  } else if (calendar.isEastertide()) {
    invitatoryPage = 314;
  } else if (calendar.isWhitsuntide()) {
    invitatoryPage = 318;
  } else if (calendar.isTrinitytide()) {
    invitatoryPage = 320;
  }

  return (
    <>
      <Initial text="Daily Office: Morning Prayer" />
      <Today today={today} currentDay={currentDay} />
      <h2>Introductory Rites</h2>
      <hr />
      <h2>Opening Sentence</h2>
      <OpeningSentence id="daily-office" />
      <Confession />
      <h2>Office Proper</h2>
      <hr />
      <h2>Opening Versicles</h2>
      <OpeningVersicles isSolemn={isSolemn} />
      <h2>Invitatory</h2>
      <Invitatory
        page={invitatoryPage}
        isSolemn={isSolemn}
        isOctaveOfEaster={isOctaveOfEaster}
      />
    </>
  );
};
