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

  // // TODO: Third Sunday of Easter
  // console.log(
  //   Object.entries(lessons.getAll())
  //     .slice(100)
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
