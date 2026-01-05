"use client";
import { Initial } from "@/components/text/Initial";
import { Today } from "@/components/Calendar";
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

export const Content = () => {
  const {
    isLoading,
    dateString,
    isFerial,
    isSolemn,
    isChristmas,
    isEaster,
    isOctaveOfEaster,
    isPentecost,
    invitatoryPage,
    shouldSingTeDeum,
    shouldOmitTeDeum,
    today,
    lessons,
    collects,
  } = useDailyOffice("morning");

  return (
    <>
      {isLoading && <Loader />}
      <Wrapper isLoading={isLoading}>
        <Initial text="Daily Office: Morning Prayer" />
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
        {!isLoading && (
          <p>
            <strong>{lessons!.first}</strong>
          </p>
        )}
        <TeDeum
          today={dateString}
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
        {!isLoading && (
          <p>
            <strong>{lessons!.second}</strong>
          </p>
        )}
        <Benedictus />
        <h2>Concluding Rites</h2>
        <hr />
        <ApostlesCreed />
        <Salutation />
        <Suffrages />
        <h2>Collects</h2>
        {!isLoading && <Collects collects={collects!} isFerial={isFerial} />}
        <OrdinaryCollects />
        <Grace />
        <Footer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "isLoading",
})<{ isLoading: boolean }>(({ isLoading }) => ({
  opacity: isLoading ? 0 : 1,
  lineHeight: isLoading ? 0 : undefined,
  height: isLoading ? 0 : undefined,
  overflow: isLoading ? "hidden" : undefined,
  transition: "opacity 0.3s ease-in-out",
}));
