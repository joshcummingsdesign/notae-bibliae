"use client";
import { Collects as CollectsClass } from "@/models/collects";
import { Calendar } from "@/models/calendar";
import { Lessons } from "@/models/lessons";
import { Initial } from "@/components/text/Initial";
import { Today } from "@/components/Calendar";
import {
  Collects,
  Invitatory,
  OpeningSentence,
  OpeningVersicles,
  PsalmsOfTheDay,
  TeDeum,
} from "@/components/DailyOffice";
import GeneralConfession from "../shared-content/general-confession.mdx";
import OurFather from "../shared-content/our-father.mdx";
import Benedictus from "./benedictus.mdx";
import ApostlesCreed from "../shared-content/apostles-creed.mdx";
import Salutation from "../shared-content/salutation.mdx";
import Suffrages from "./suffrages.mdx";
import OrdinaryCollects from "./ordinary-collects.mdx";
import Grace from "../shared-content/grace.mdx";
import Footer from "./footer.mdx";

export const Content = () => {
  const calendar = new Calendar();
  const lessons = new Lessons(calendar);
  const lessonData = lessons.getToday();
  const today = calendar.getToday();
  const currentDay = calendar.getCurrentDayString();
  const isSolemn = calendar.isSolemn();
  const isOctaveOfEaster = calendar.isOctaveOfEaster();
  const isChristmas = calendar.isChristmas();
  const isEaster = calendar.isEaster();
  const isPentecost = calendar.isPentecost();
  const collects = new CollectsClass(calendar);
  const { primary, secondary } = collects.getByDay();
  const isFestal = calendar.isFeastDay() || calendar.isLordsDay();
  const isFerial = calendar.isSolemn() || !isFestal;

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

  const shouldSingTeDeum =
    calendar.isFeastDay() ||
    calendar.isLordsDay() ||
    calendar.isChristmastide() ||
    calendar.isOctaveOfEpiphany() ||
    calendar.isEastertide() ||
    calendar.isWhitsuntide();

  const shouldOmitTeDeum =
    calendar.isAdvent() ||
    (calendar.isHolyInnocents() && !calendar.isLordsDay()) ||
    calendar.isSeptuagesimaToPassion() ||
    calendar.isRogationDay() ||
    calendar.isSolemn();

  return (
    <>
      <Initial text="Daily Office: Morning Prayer" />
      <Today today={today} currentDay={currentDay} />
      <h2>Introductory Rites</h2>
      <hr />
      <h2>Opening Sentence</h2>
      <OpeningSentence id="daily-office" />
      <GeneralConfession />
      <OurFather />
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
      <h2>Psalms of the Day</h2>
      <p>
        [ <em>Sit</em> ]
      </p>
      <PsalmsOfTheDay id="psalm" />
      <h2>First Lesson</h2>
      <p>
        <strong>{lessonData["morning"]["first"]}</strong>
      </p>
      <TeDeum
        today={today}
        shouldSing={shouldSingTeDeum}
        shouldOmit={shouldOmitTeDeum}
        isChristmas={isChristmas}
        isEaster={isEaster}
        isPentecost={isPentecost}
      />
      <h2>Second Lesson</h2>
      <p>
        [ <em>Sit</em> ]
      </p>
      <p>
        <strong>{lessonData["morning"]["second"]}</strong>
      </p>
      <Benedictus />
      <h2>Concluding Rites</h2>
      <hr />
      <ApostlesCreed />
      <Salutation />
      <Suffrages />
      <h2>Collects</h2>
      <Collects primary={primary} secondary={secondary} isFerial={isFerial} />
      <OrdinaryCollects />
      <Grace />
      <Footer />
    </>
  );
};
