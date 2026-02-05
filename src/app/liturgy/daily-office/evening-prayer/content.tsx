"use client";
import { Fragment } from "react";
import { Initial } from "@/components/text/Initial";
import { Today } from "@/components/Calendar";
import {
  OpeningSentence,
  OpeningVersicles,
  PsalmsOfTheDay,
  Magnificat,
  NuncDimittis,
  ThirdLesson,
  Collects,
} from "@/components/DailyOffice";
import GeneralConfession from "../shared-content/general-confession.mdx";
import OurFather from "../shared-content/our-father.mdx";
import ApostlesCreed from "../shared-content/apostles-creed.mdx";
import Salutation from "../shared-content/salutation.mdx";
import Suffrages from "./suffrages.mdx";
import OrdinaryCollects from "./ordinary-collects.mdx";
import Grace from "../shared-content/grace.mdx";
import Footer from "./footer.mdx";
import { styled } from "@mui/material";
import { Loader } from "@/components/Loader";
import { useDailyOffice } from "../hooks/useDailyOffice";

export const Content = () => {
  const {
    isLoading,
    isLordsDay,
    isFerial,
    isSolemn,
    currentAntiphon,
    today,
    lessons,
    collects,
  } = useDailyOffice("evening");

  return (
    <>
      {isLoading && <Loader />}
      <Wrapper isLoading={isLoading}>
        <Initial text="Daily Office: Evening Prayer" />
        {!isLoading && <Today {...today!} />}
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
        {!isLoading && <Lesson lessons={lessons!.first} />}
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
        {!isLoading && <Lesson lessons={lessons!.second} />}
        <h2>Nunc dimittis</h2>
        <p>
          [ <em>Stand</em> ]
        </p>
        <NuncDimittis isLordsDay={isLordsDay} />
        <ThirdLesson lesson={"Hilary of Poitier"} page={30} office="evening" />
        <h2>Concluding Rites</h2>
        <hr />
        <ApostlesCreed />
        <Salutation />
        <Suffrages />
        <h2>Collects</h2>
        {!isLoading && (
          <Collects office="evening" collects={collects!} isFerial={isFerial} />
        )}
        <OrdinaryCollects />
        <Grace />
        <Footer />
      </Wrapper>
    </>
  );
};

const Lesson = ({ lessons }: { lessons: string[] }) => (
  <p>
    {lessons.map((lesson, i) => (
      <Fragment key={lesson}>
        <strong>{lesson}</strong>
        {i !== lessons.length && <br />}
      </Fragment>
    ))}
  </p>
);

const Wrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "isLoading",
})<{ isLoading: boolean }>(({ isLoading }) => ({
  opacity: isLoading ? 0 : 1,
  visibility: isLoading ? "hidden" : "visible",
  lineHeight: isLoading ? 0 : undefined,
  height: isLoading ? 0 : undefined,
  overflow: isLoading ? "hidden" : undefined,
  transition: "opacity 0.3s ease-in-out",
}));
