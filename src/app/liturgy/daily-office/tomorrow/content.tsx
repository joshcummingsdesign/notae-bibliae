"use client";
import { Fragment } from "react";
import { Today } from "@/components/Calendar";
import { Loader } from "@/components/Loader";
import { Initial } from "@/components/text/Initial";
import { styled } from "@mui/material";
import { useTomorrowOffice } from "../hooks/useTomorrowOffice";

export const Content = () => {
  const { isLoading, tomorrow, office } = useTomorrowOffice();

  return (
    <>
      {isLoading && <Loader />}
      <Wrapper isLoading={isLoading}>
        <Initial text="Daily Office: Tomorrow" />
        {!isLoading && tomorrow && <Today {...tomorrow} />}
        {office && (
          <>
            <h2>Morning</h2>
            <hr />
            <h3>First Lesson</h3>
            <Lesson lessons={office.morning.first} />
            <h3>Second Lesson</h3>
            <Lesson lessons={office.morning.second} />
            <h2>Evening</h2>
            <hr />
            <h3>First Lesson</h3>
            <Lesson lessons={office.evening.first} />
            <h3>Second Lesson</h3>
            <Lesson lessons={office.evening.second} />
          </>
        )}
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
