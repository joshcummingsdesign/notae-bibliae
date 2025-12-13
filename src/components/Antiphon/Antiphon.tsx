import { AntiphonData } from "@/models/calendar";
import { Fragment } from "react";

interface Props {
  antiphon: AntiphonData;
  title?: string;
}

export const Antiphon: React.FC<Props> = ({ antiphon, title }) => (
  <p>
    <strong>{title || antiphon.title}</strong>
    <br />
    {antiphon.text.split("\n").map((line, i) => (
      <Fragment key={i}>
        {line}
        <br />
      </Fragment>
    ))}
  </p>
);
