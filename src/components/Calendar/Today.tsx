import { getCalendarData } from "@/lib/calendar";

export const Today = () => {
  const { currentDay } = getCalendarData();
  return <p dangerouslySetInnerHTML={{ __html: currentDay }} />;
};
