import { AntiphonData, Calendar } from "@/models/calendar";
import { Antiphon } from "./Antiphon";

interface Props {
  date: string;
}

export const Oantiphon: React.FC<Props> = ({ date }) => {
  const calendar = new Calendar();
  const oAntiphons = calendar.getOAntiphons();
  const currentAntiphon = Object.entries(oAntiphons).reduce<AntiphonData>(
    (acc, [itemDate, val]) => {
      if (itemDate.includes(date)) {
        acc = { ...val };
      }
      return acc;
    },
    {} as AntiphonData
  );

  return <Antiphon title="Paraphrase" antiphon={currentAntiphon} />;
};
