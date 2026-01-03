"use client";
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

  return (
    <p>
      <strong>{lessonData[office][lesson]}</strong>
    </p>
  );
};
