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
        {line}
        <br />
      </Fragment>
    ))}
  </p>
);
