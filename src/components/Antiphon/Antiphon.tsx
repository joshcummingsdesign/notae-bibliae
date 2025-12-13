import { AntiphonData } from "@/models/calendar";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
  antiphon: AntiphonData;
  title?: string;
  linked?: boolean;
  showVerse?: boolean;
}

export const Antiphon: React.FC<Props> = ({
  antiphon,
  title,
  linked,
  showVerse,
}) => (
  <p>
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
