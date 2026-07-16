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
import { Large } from "@/components/text/Large";
import { Rubric } from "@/components/text/Rubric";

export const Content = () => {
  const {
    isLoading,
    isLordsDay,
    isFerial,
    isVigil,
    isSolemn,
    currentAntiphon,
    today,
    lectionaryData,
  } = useDailyOffice("evening");

  return (
    <>
      {isLoading && <Loader />}
      <Wrapper isLoading={isLoading}>
        <Initial text="Daily Office: Evening Prayer" />

        {!isLoading && (
          <Today
            season={lectionaryData!.season}
            date={today}
            primaryObservance={lectionaryData!.primaryObservance}
            secondaryObservance={lectionaryData!.secondaryObservance}
          />
        )}

        <h2>
          <Large size="xl" text="Sentences" />
        </h2>
        <OpeningSentence id="daily-office" office="evening" />
        <hr />

        <h2>
          <Large size="xl" text="Confession and Absolution" />
        </h2>
        <GeneralConfession />
        <hr />

        <h2>
          <Large size="xl" text="Opening" />
        </h2>
        <OurFather />
        <OpeningVersicles isSolemn={isSolemn} isVigil={isVigil} />
        <hr />

        <h2>
          <Large size="xl" text="Psalmody" />
        </h2>
        <Rubric text={["❡ The people sit."]} />
        <PsalmsOfTheDay id="psalm" />
        <br />
        <hr />

        <h2>
          <Large size="xl" text="Lessons and Canticles" />
        </h2>
        <Rubric text={["❡ Sit for the Lessons; stand for the Canticles."]} />
        {!isLoading && <Lesson lessons={lectionaryData!.evening.first} />}
        <Magnificat
          currentAntiphon={currentAntiphon}
          linkAntiphon={true}
          showAntiphonVerse={true}
        />
        {!isLoading && <Lesson lessons={lectionaryData!.evening.second} />}
        <NuncDimittis isLordsDay={isLordsDay} />
        <hr />

        <h2>
          <Large size="xl" text="Apostles' Creed" />
        </h2>
        <ApostlesCreed />
        <hr />

        <h2>
          <Large size="xl" text="Prayers" />
        </h2>
        <Salutation />
        <Suffrages />
        <hr />

        <h2>
          <Large size="xl" text="Collects" />
        </h2>
        {!isLoading && (
          <Collects
            collects={lectionaryData!.evening.collects}
            isFerial={isFerial}
          />
        )}
        <OrdinaryCollects />
        <hr />

        <h2>
          <Large size="xl" text="The Grace" />
        </h2>
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
