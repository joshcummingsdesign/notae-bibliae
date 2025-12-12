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
      sundayTitle += `: [Laetare Sunday](/liturgy/seasons/lent/laetare-sunday)`;
    } else if (i === 4) {
      sundayTitle += `: [Passion Sunday](/liturgy/seasons/lent/passiontide/passion-sunday)`;
    }

    const cls = i === 4 ? 1 : 3;

    return {
      date: sundays[i].format("YYYY-MM-DD"),
      title: sundayTitle,
      rank: 3,
      class: cls,
    };
  });
};

const getHolyWeekDays = (easter: Dayjs): CalendarItem[] => {
  const holyWeekStart = easter.subtract(7, "day"); // Palm Sunday
  return [
    {
      date: holyWeekStart.format("YYYY-MM-DD"),
      title:
        "Holy Week: [Palm Sunday](/liturgy/seasons/lent/passiontide/palm-sunday)",
      rank: 1,
      class: 1,
      isFeast: true,
    },
    {
      date: holyWeekStart.add(1, "day").format("YYYY-MM-DD"),
      title:
        "Holy Week: [Holy Monday](/liturgy/seasons/lent/passiontide/holy-monday)",
      rank: 1,
      class: 2,
      isFeast: true,
    },
    {
      date: holyWeekStart.add(2, "day").format("YYYY-MM-DD"),
      title:
        "Holy Week: [Holy Tuesday](/liturgy/seasons/lent/passiontide/holy-tuesday)",
      rank: 1,
      class: 2,
      isFeast: true,
    },
    {
      date: holyWeekStart.add(3, "day").format("YYYY-MM-DD"),
      title:
        "Holy Week: [Spy Wednesday](/liturgy/seasons/lent/passiontide/spy-wednesday)",
      rank: 1,
      class: 2,
      isFeast: true,
    },
    {
      date: holyWeekStart.add(4, "day").format("YYYY-MM-DD"),
      title:
        "Holy Week: [Maundy Thursday](/liturgy/seasons/lent/passiontide/maundy-thursday)",
      rank: 1,
      class: 2,
      isFeast: true,
    },
    {
      date: holyWeekStart.add(5, "day").format("YYYY-MM-DD"),
      title:
        "Holy Week: [Good Friday (Passion of the Lord)](/liturgy/seasons/lent/passiontide/good-friday)",
      rank: 1,
      class: 2,
      isFeast: true,
    },
    {
      date: holyWeekStart.add(6, "day").format("YYYY-MM-DD"),
      title:
        "Holy Week: [Holy Saturday](/liturgy/seasons/lent/passiontide/holy-saturday)",
      rank: 1,
      class: 2,
      isFeast: true,
    },
    {
      date: holyWeekStart.add(6, "day").format("YYYY-MM-DD"),
      title: "[Easter Vigil](/liturgy/seasons/eastertide/easter-vigil)",
      rank: 4,
      class: 5,
      isFeast: true,
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
    title: "[Ash Wednesday](/liturgy/seasons/lent/ash-wednesday)",
    rank: 1,
    class: 2,
    isFeast: true,
  },
  {
    date: ashWednesday.add(1, "day").format("YYYY-MM-DD"),
    title: "Thursday in Lent",
    rank: 1,
    class: 9,
  },
  {
    date: ashWednesday.add(2, "day").format("YYYY-MM-DD"),
    title: "Friday in Lent",
    rank: 1,
    class: 9,
  },
  {
    date: ashWednesday.add(3, "day").format("YYYY-MM-DD"),
    title: "Saturday in Lent",
    rank: 1,
    class: 9,
  },
  ...getLentSundays(passionSunday),
  {
    date: annunciation.format("YYYY-MM-DD"),
    title:
      "[Annunciation of the Lord](/liturgy/seasons/eastertide/annunciation)",
    rank: 1,
    class: 5,
    isFeast: true,
  },
  ...getHolyWeekDays(easter),
];
