import { HagiographyResponse } from "@/models/hagiography";
import Link from "next/link";

interface Props {
  hagiography: HagiographyResponse | null;
  office: "morning" | "evening";
}

export const ThirdLesson: React.FC<Props> = ({ hagiography, office }) => {
  return hagiography ? (
    <>
      <h2>Third Lesson</h2>
      <p>
        [ <em>Sit</em> ]
      </p>
      {hagiography.link ? (
        <Link href={hagiography.link} target="_blank">
          <strong>{hagiography.title}</strong>
        </Link>
      ) : (
        <strong>{hagiography.title}</strong>
      )}
      {hagiography[office] && ` (${hagiography[office]})`}
    </>
  ) : null;
};
