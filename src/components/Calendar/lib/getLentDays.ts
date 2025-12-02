import { Dayjs } from "dayjs";
import { CalendarItem } from "../interfaces";

const getLentSundays = (passionSunday: Dayjs): CalendarItem[] => {
  const titles = ["First", "Second", "Third", "Fourth", "Fifth"];

  // Fifth Sunday is Passion Sunday
  const sundays: Dayjs[] = [];
  for (let i = 4; i >= 0; i--) {
    sundays[i] = passionSunday.subtract(4 - i, "week");
  }

  return titles.map((title, i) => {
    let sundayTitle = `${title} Sunday of Lent`;

    if (i === 3) {
      sundayTitle += `: [Laetare Sunday](/liturgy/seasons/lent#laetare-sunday)`;
    } else if (i === 4) {
      sundayTitle += `: [Passion Sunday](/liturgy/seasons/passiontide)`;
    }

    return {
      date: sundays[i].format("YYYY-MM-DD"),
      title: sundayTitle,
      rank: 1,
    };
  });
};

const getHolyWeekDays = (easterSunday: Dayjs): CalendarItem[] => {
  const holyWeekStart = easterSunday.subtract(7, "day"); // Palm Sunday
  return [
    {
      date: holyWeekStart.format("YYYY-MM-DD"),
      title:
        "Holy Week: [Palm Sunday](/liturgy/seasons/passiontide/palm-sunday)",
      rank: 1,
    },
    {
      date: holyWeekStart.add(1, "day").format("YYYY-MM-DD"),
      title:
        "Holy Week: [Holy Monday](/liturgy/seasons/passiontide/holy-monday)",
      rank: 1,
    },
    {
      date: holyWeekStart.add(2, "day").format("YYYY-MM-DD"),
      title:
        "Holy Week: [Holy Tuesday](/liturgy/seasons/passiontide/holy-tuesday)",
      rank: 1,
    },
    {
      date: holyWeekStart.add(3, "day").format("YYYY-MM-DD"),
      title:
        "Holy Week: [Spy Wednesday](/liturgy/seasons/passiontide/spy-wednesday)",
      rank: 1,
    },
    {
      date: holyWeekStart.add(4, "day").format("YYYY-MM-DD"),
      title:
        "Holy Week: [Maundy Thursday](/liturgy/seasons/passiontide/maundy-thursday)",
      rank: 1,
    },
    {
      date: holyWeekStart.add(5, "day").format("YYYY-MM-DD"),
      title:
        "Holy Week: [Good Friday (Passion of the Lord)](/liturgy/seasons/passiontide/good-friday)",
      rank: 1,
    },
    {
      date: holyWeekStart.add(6, "day").format("YYYY-MM-DD"),
      title:
        "Holy Week: [Holy Saturday](/liturgy/seasons/passiontide/holy-saturday)",
      rank: 1,
    },
    {
      date: holyWeekStart.add(6, "day").format("YYYY-MM-DD"),
      title: "[Easter Vigil](/liturgy/seasons/eastertide/easter-vigil)",
      rank: 4,
    },
  ];
};

export const getLentDays = (
  ashWednesday: Dayjs,
  passionSunday: Dayjs,
  annunciation: Dayjs,
  easter: Dayjs
): CalendarItem[] => [
  {
    date: ashWednesday.format("YYYY-MM-DD"),
    title: "[Ash Wednesday](/liturgy/seasons/lent#ash-wednesday)",
    rank: 1,
  },
  ...getLentSundays(passionSunday),
  {
    date: annunciation.format("YYYY-MM-DD"),
    title:
      "[Annunciation of the Lord](/liturgy/seasons/eastertide/annunciation)",
    rank: 1,
  },
  ...getHolyWeekDays(easter),
];
