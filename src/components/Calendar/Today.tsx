import { Calendar } from "@/models/calendar";
import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";

export const Today = () => {
  const calendar = new Calendar();
  const currentDay = calendar.getCurrentDayString();
  return <Markdown remarkPlugins={[remarkSmartypants]}>{currentDay}</Markdown>;
};
