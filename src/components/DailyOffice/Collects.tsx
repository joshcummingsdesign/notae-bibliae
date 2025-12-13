"use client";
import { Fragment } from "react";
import { styled } from "@mui/material";
import { Calendar } from "@/models/calendar";
import { Collects as CollectsClass } from "@/models/collects";
import { stripMarkdownLinks } from "@/lib/utils/markdown";
import Link from "next/link";
import { Definition } from "../Definition";

export const Collects = () => {
  const calendar = new Calendar();
  const collects = new CollectsClass(calendar);
  const { primary, secondary } = collects.getByDay();
  const isFestal = calendar.isFeastDay() || calendar.isLordsDay();
  const isFerial = calendar.isSolemn() || !isFestal;

  let header = (
    <p>
      <em>
        ❡ Chant the Collects using the{" "}
        <Link href="/liturgy/rites/sarum-rite/chant-rubric#chanting-the-collect">
          festal tone
        </Link>
      </em>{" "}
      (SDP 251)
    </p>
  );
  if (isFerial) {
    header = (
      <p>
        <em>
          ❡ Chant the Collects{" "}
          <Definition lang="latin" anchor="recto-tono" text="recto tono" />
        </em>{" "}
        (SDP 251)
      </p>
    );
  }

  return (
    <>
      {header}
      {primary && (
        <>
          <p>
            <strong>Collect for {stripMarkdownLinks(primary.title)}</strong>
          </p>
          <CollectText text={primary.collect} />
        </>
      )}
      {secondary.map((secondaryCollect) => (
        <Fragment key={secondaryCollect.title}>
          <p>
            <strong>
              Collect for {stripMarkdownLinks(secondaryCollect.title)}
            </strong>
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
