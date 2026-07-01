"use client";
import { styled } from "@mui/material";
import { AntiphonData } from "@/models/calendar";
import Link from "next/link";
import { Fragment } from "react";
import { Red } from "../text/Red";

interface Props {
  antiphon: AntiphonData;
  ant?: boolean;
  title?: string;
  linked?: boolean;
  showVerse?: boolean;
}

export const Antiphon: React.FC<Props> = ({
  antiphon,
  ant,
  title,
  linked,
  showVerse,
}) => (
  <p>
    {ant && (
      <strong>
        <Red text="Ant." />{" "}
      </strong>
    )}
    {linked ? (
      <strong>
        <Link href={antiphon.link}>{title || antiphon.title}</Link>
      </strong>
    ) : (
      <strong>{title || antiphon.title}</strong>
    )}
    {showVerse && (
      <>
        <small> — {antiphon.verse}</small>
      </>
    )}
    <br />
    {antiphon.text.split("\n").map((line, i) => (
      <Fragment key={i}>
        {line.split("*").map((text, j, parts) => (
          <Fragment key={j}>
            {text}
            {j < parts.length - 1 && <StarText />}
          </Fragment>
        ))}
        <br />
      </Fragment>
    ))}
  </p>
);

const StarText = styled("span")(({ theme }) => ({
  color: theme.palette.brand.red,
  position: "relative",
  paddingLeft: "0.25rem",

  "&:before": {
    content: "'*'",
    position: "absolute",
    fontSize: "1.5rem",
  },
}));
