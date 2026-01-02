import { Calendar } from "@/models/calendar";
import { Lessons } from "@/models/lessons";

interface Props {
  office: "morning" | "evening";
  lesson: "first" | "second";
}

export const Lesson: React.FC<Props> = ({ office, lesson }) => {
  const calendar = new Calendar();
  const lessons = new Lessons(calendar);
  const lessonData = lessons.getToday();

  // TODO: Third Sunday After Trinity
  // TODO: Find alternatives for deuterocanonical books
  // TODO: Cleanup duplicates
  // TODO: Fix malformatted passages
  // TODO: Fix missing days
  // console.log(
  //   Object.entries(lessons.getAll())
  //     .slice(250)
  //     .reduce<any>((acc, [k, v]) => {
  //       acc[k] = v;
  //       return acc;
  //     }, {})
  // );

  return (
    <p>
      <strong>{lessonData[office][lesson]}</strong>
    </p>
  );
};
