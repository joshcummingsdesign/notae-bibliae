"use client";
import { Fragment } from "react";
import { styled } from "@mui/material";
import { CollectCalendarItem } from "@/models/collects";
import Link from "next/link";
import { Definition } from "../Definition";

interface Props {
  primary: CollectCalendarItem | null;
  secondary: CollectCalendarItem[];
  isFerial: boolean;
}

export const Collects: React.FC<Props> = ({ primary, secondary, isFerial }) => {
  let header = (
    <p>
      <em>
        ❡ Chanted using the{" "}
        <Link href="/liturgy/daily-office/chant-rubrics#chanting-the-collects">
          festal tone
        </Link>
      </em>
    </p>
  );
  if (isFerial) {
    header = (
      <p>
        <em>
          ❡ Chanted{" "}
          <Definition lang="latin" anchor="recto-tono" text="recto tono" />
        </em>
      </p>
    );
  }

  return (
    <>
      {header}
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
