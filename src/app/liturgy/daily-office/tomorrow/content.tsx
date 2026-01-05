"use client";
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
            <p>
              <strong>First Lesson: {office.morning.first}</strong>
            </p>
            <p>
              <strong>Second Lesson: {office.morning.second}</strong>
            </p>
            <h2>Evening</h2>
            <p>
              <strong>First Lesson: {office.evening.first}</strong>
            </p>
            <p>
              <strong>Second Lesson: {office.evening.second}</strong>
            </p>
          </>
        )}
      </Wrapper>
    </>
  );
};

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
