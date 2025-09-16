export type MenuNode = {
  title: string;
  link: string;
  children: MenuNode[] | null;
};

export const menuItems: MenuNode[] = [
  {
    title: "Bible",
    link: "/bible",
    children: [
      {
        title: "New Testament",
        link: "/bible/new-testament",
        children: [
          {
            title: "Gospels",
            link: "/bible/new-testament/gospels",
            children: null,
          },
        ],
      },
      {
        title: "Old Testament",
        link: "/bible/old-testament",
        children: [
          {
            title: "Pentateuch",
            link: "/bible/old-testament/pentateuch",
            children: null,
          },
          {
            title: "Historical Books",
            link: "/bible/old-testament/historical-books",
            children: null,
          },
          {
            title: "Poetic Books",
            link: "/bible/old-testament/poetic-books",
            children: null,
          },
          {
            title: "Prophetic Books",
            link: "/bible/old-testament/prophetic-books",
            children: null,
          },
          {
            title: "Jewish Order",
            link: "/bible/old-testament/jewish-order",
            children: null,
          },
          {
            title: "Chronological Order",
            link: "/bible/old-testament/chronological-order",
            children: null,
          },
        ],
      },
      {
        title: "Tanakh",
        link: "/bible/tanakh",
        children: [
          {
            title: "Torah",
            link: "/bible/tanakh/torah",
            children: null,
          },
          {
            title: "Nevi’im",
            link: "/bible/tanakh/neviim",
            children: null,
          },
          {
            title: "Ketuvim",
            link: "/bible/tanakh/ketuvim",
            children: null,
          },
        ],
      },
      {
        title: "Languages",
        link: "/bible/languages",
        children: null,
      },
      {
        title: "Translations",
        link: "/bible/translations",
        children: null,
      },
    ],
  },
  {
    title: "Liturgy",
    link: "/liturgy",
    children: [
      {
        title: "Calendar",
        link: "/liturgy/calendar",
        children: null,
      },
      {
        title: "Prayers",
        link: "/liturgy/prayers",
        children: null,
      },
      {
        title: "Creeds",
        link: "/liturgy/creeds",
        children: null,
      },
    ],
  },
  {
    title: "Meditations",
    link: "/meditations",
    children: [
      {
        title: "Luther",
        link: "/meditations?category=Luther",
        children: null,
      },
      {
        title: "Repentance",
        link: "/meditations?category=Repentance",
        children: null,
      },
      {
        title: "Theology",
        link: "/meditations?category=Theology",
        children: null,
      },
    ],
  },
];
