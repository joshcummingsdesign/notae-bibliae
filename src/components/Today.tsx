import dayjs from "dayjs";
import { getCalendarData } from "./Calendar/getCalendarData";

export const Today = () => {
  const today = dayjs();
  const { currentDay } = getCalendarData(today);
  return <p dangerouslySetInnerHTML={{ __html: currentDay }} />;
};
