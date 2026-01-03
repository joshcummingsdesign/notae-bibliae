"use client";
import { Collects as CollectsClass } from "@/models/collects";
import { Calendar } from "@/models/calendar";
import { Lessons } from "@/models/lessons";
import { Initial } from "@/components/text/Initial";
import { Today } from "@/components/Calendar";
import {
  Collects,
  Magnificat,
  NuncDimittis,
  OpeningSentence,
  OpeningVersicles,
  PsalmsOfTheDay,
} from "@/components/DailyOffice";
import GeneralConfession from "../shared-content/general-confession.mdx";
import OurFather from "../shared-content/our-father.mdx";
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
  const isLordsDay = calendar.isLordsDay();
  const collects = new CollectsClass(calendar);
  const { primary, secondary } = collects.getByDay();
  const isFestal = calendar.isFeastDay() || calendar.isLordsDay();
  const isFerial = calendar.isSolemn() || !isFestal;
  const oAntiphons = calendar.getOAntiphons();
  const currentAntiphon = oAntiphons[today.format("YYYY-MM-DD")];

  return (
    <>
      <Initial text="Daily Office: Evening Prayer" />
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
      <h2>Psalms of the Day</h2>
      <p>
        [ <em>Sit</em> ]
      </p>
      <PsalmsOfTheDay id="psalm" />
      <h2>First Lesson</h2>
      <p>
        <strong>{lessonData["evening"]["first"]}</strong>
      </p>
      <h2>Magnificat</h2>
      <p>
        [ <em>Stand</em> ]
      </p>
      <Magnificat
        currentAntiphon={currentAntiphon}
        linkAntiphon={true}
        showAntiphonVerse={true}
      />
      <h2>Second Lesson</h2>
      <p>
        [ <em>Sit</em> ]
      </p>
      <p>
        <strong>{lessonData["evening"]["second"]}</strong>
      </p>
      <h2>Nunc dimittis</h2>
      <p>
        [ <em>Stand</em> ]
      </p>
      <NuncDimittis isLordsDay={isLordsDay} />
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
