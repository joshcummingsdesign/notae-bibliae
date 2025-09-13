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
        title: "Old Testament",
        link: "/bible/old-testament",
        children: [
          {
            title: "Poetic Books",
            link: "/bible/old-testament/poetic-books",
            children: [
              {
                title: "Psalms",
                link: "/bible/old-testament/poetic-books/psalms",
                children: null,
              },
            ],
          },
        ],
      },
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
    ],
  },
];
