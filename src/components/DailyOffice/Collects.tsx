"use client";
import { Fragment } from "react";
import { styled } from "@mui/material";
import { Calendar } from "@/models/calendar";
import { Collects as CollectsClass } from "@/models/collects";

export const Collects = () => {
  const calendar = new Calendar();
  const collects = new CollectsClass(calendar);
  const { primary, secondary } = collects.getByDay();

  return (
    <>
      {primary && (
        <>
          <p>
            <strong>Collect for {primary.title}</strong>
          </p>
          <CollectText text={primary.collect} />
        </>
      )}
      {secondary.map((secondaryCollect) => (
        <Fragment key={secondaryCollect.title}>
          <p>
            <strong>Collect for {secondaryCollect.title}</strong>
          </p>
          <CollectText text={secondaryCollect.collect} />
        </Fragment>
      ))}
    </>
  );
};

const CollectText: React.FC<{ text: string }> = ({ text }) => (
  <StyledText
    dangerouslySetInnerHTML={{
      __html: text.replaceAll("_", '<span class="dot"></span>'),
    }}
  />
);

const StyledText = styled("p")(({ theme }) => ({
  ".dot": {
    color: theme.palette.brand.red,
    position: "relative",
    top: "2px",

    "&:before": {
      content: "'·'",
      lineHeight: "1.5rem",
      fontSize: "1.75rem",
    },
  },
}));
