"use client";
import { Fragment } from "react";
import { Initial } from "@/components/text/Initial";
import { Today } from "@/components/Calendar";
import { Large } from "@/components/text/Large";
import {
  Invitatory,
  OpeningSentence,
  OpeningVersicles,
  PsalmsOfTheDay,
  TeDeum,
  Collects,
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
import { styled } from "@mui/material";
import { Loader } from "@/components/Loader";
import { useDailyOffice } from "../hooks/useDailyOffice";
import { Rubric } from "@/components/text/Rubric";

export const Content = () => {
  const {
    isLoading,
    isFerial,
    isVigil,
    isSolemn,
    isOctaveOfEaster,
    invitatoryPage,
    shouldSingTeDeum,
    shouldOmitTeDeum,
    today,
    lectionaryData,
  } = useDailyOffice("morning");

  return (
    <>
      {isLoading && <Loader />}
      <Wrapper isLoading={isLoading}>
        <Initial text="Daily Office: Morning Prayer" />

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
        <OpeningSentence id="daily-office" office="morning" />
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
        <Invitatory
          page={invitatoryPage}
          isSolemn={isSolemn}
          isOctaveOfEaster={isOctaveOfEaster}
        />
        <Rubric text={["❡ The people sit. Stand at each Glory Be."]} />
        <PsalmsOfTheDay id="psalm" />
        <br />
        <hr />

        <h2>
          <Large size="xl" text="Lessons and Canticles" />
        </h2>
        <Rubric text={["❡ Sit for the Lessons; stand for the Canticles."]} />
        {!isLoading && <Lesson lessons={lectionaryData!.morning.first} />}
        <TeDeum shouldSing={shouldSingTeDeum} shouldOmit={shouldOmitTeDeum} />
        {!isLoading && <Lesson lessons={lectionaryData!.morning.second} />}
        <Benedictus />
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
            collects={lectionaryData!.morning.collects}
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
