"use client";
import { Fragment } from "react";
import { styled } from "@mui/material";
import { CollectCalendarItem } from "@/models/collects";
import Link from "next/link";
import { Definition } from "../Definition";
import DOMPurify from "isomorphic-dompurify";

interface Props {
  office: "morning" | "evening";
  collects: CollectCalendarItem[];
  isFerial: boolean;
}

export const Collects: React.FC<Props> = ({ office, collects, isFerial }) => {
  const hasVigil = collects.some((collect) => collect.isVigil);

  let header = (
    <p>
      <em>
        ❡ Chanted using the{" "}
        <Link
          href="/liturgy/daily-office/chant-rubrics#the-collects"
          target="_blank"
        >
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
      {collects.map((collect) => {
        // Omit Vigils from morning office.
        if (office === "morning" && collect.isVigil) {
          return null;
        }

        // Omit weekly collects from Vigils.
        if (office === "evening" && hasVigil && !collect.isVigil) {
          return null;
        }

        return (
          <Fragment key={collect.title}>
            <p>
              <strong>Collect for {collect.title}</strong>
            </p>
            <CollectText
              text={collect.collect.replace("Amen", "<em>Amen</em>")}
            />
          </Fragment>
        );
      })}
    </>
  );
};

const CollectText: React.FC<{ text: string }> = ({ text }) => (
  <StyledText
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(
        text.replaceAll("·", '<span class="dot"></span>'),
      ),
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
