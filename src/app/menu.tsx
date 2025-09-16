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
            children: [
              {
                title: "Matthew",
                link: "/bible/new-testament/gospels/matthew",
                children: null,
              },
              {
                title: "Mark",
                link: "/bible/new-testament/gospels/mark",
                children: null,
              },
              {
                title: "Luke",
                link: "/bible/new-testament/gospels/luke",
                children: null,
              },
              {
                title: "John",
                link: "/bible/new-testament/gospels/john",
                children: null,
              },
              {
                title: "Harmony",
                link: "/bible/new-testament/gospels/harmony",
                children: null,
              },
            ],
          },
          {
            title: "Acts",
            link: "/bible/new-testament/acts",
            children: null,
          },
          {
            title: "Epistles",
            link: "/bible/new-testament/epistles",
            children: [
              {
                title: "Romans",
                link: "/bible/new-testament/epistles/romans",
                children: null,
              },
              {
                title: "1 Corinthians",
                link: "/bible/new-testament/epistles/1-corinthians",
                children: null,
              },
              {
                title: "2 Corinthians",
                link: "/bible/new-testament/epistles/2-corinthians",
                children: null,
              },
              {
                title: "Galatians",
                link: "/bible/new-testament/epistles/galatians",
                children: null,
              },
              {
                title: "Ephesians",
                link: "/bible/new-testament/epistles/ephesians",
                children: null,
              },
              {
                title: "Philippians",
                link: "/bible/new-testament/epistles/philippians",
                children: null,
              },
              {
                title: "Colossians",
                link: "/bible/new-testament/epistles/colossians",
                children: null,
              },
              {
                title: "1 Thessalonians",
                link: "/bible/new-testament/epistles/1-thessalonians",
                children: null,
              },
              {
                title: "2 Thessalonians",
                link: "/bible/new-testament/epistles/2-thessalonians",
                children: null,
              },
              {
                title: "1 Timothy",
                link: "/bible/new-testament/epistles/1-timothy",
                children: null,
              },
              {
                title: "2 Timothy",
                link: "/bible/new-testament/epistles/2-timothy",
                children: null,
              },
              {
                title: "Titus",
                link: "/bible/new-testament/epistles/titus",
                children: null,
              },
              {
                title: "Philemon",
                link: "/bible/new-testament/epistles/philemon",
                children: null,
              },
              {
                title: "Hebrews",
                link: "/bible/new-testament/epistles/hebrews",
                children: null,
              },
              {
                title: "James",
                link: "/bible/new-testament/epistles/james",
                children: null,
              },
              {
                title: "1 Peter",
                link: "/bible/new-testament/epistles/1-peter",
                children: null,
              },
              {
                title: "2 Peter",
                link: "/bible/new-testament/epistles/2-peter",
                children: null,
              },
              {
                title: "1 John",
                link: "/bible/new-testament/epistles/1-john",
                children: null,
              },
              {
                title: "2 John",
                link: "/bible/new-testament/epistles/2-john",
                children: null,
              },
              {
                title: "3 John",
                link: "/bible/new-testament/epistles/3-john",
                children: null,
              },
              {
                title: "Jude",
                link: "/bible/new-testament/epistles/jude",
                children: null,
              },
            ],
          },
          {
            title: "Revelation",
            link: "/bible/new-testament/revelation",
            children: null,
          },
          {
            title: "Chronological Order",
            link: "/bible/new-testament/chronological-order",
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
            children: [
              {
                title: "Genesis",
                link: "/bible/old-testament/pentateuch/genesis",
                children: null,
              },
              {
                title: "Exodus",
                link: "/bible/old-testament/pentateuch/exodus",
                children: null,
              },
              {
                title: "Leviticus",
                link: "/bible/old-testament/pentateuch/leviticus",
                children: null,
              },
              {
                title: "Numbers",
                link: "/bible/old-testament/pentateuch/numbers",
                children: null,
              },
              {
                title: "Deuteronomy",
                link: "/bible/old-testament/pentateuch/deuteronomy",
                children: null,
              },
            ],
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
            children: [
              {
                title: "Torah",
                link: "/bible/old-testament/jewish-order/torah",
                children: null,
              },
              {
                title: "Nevi’im",
                link: "/bible/old-testament/jewish-order/neviim",
                children: null,
              },
              {
                title: "Ketuvim",
                link: "/bible/old-testament/jewish-order/ketuvim",
                children: null,
              },
            ],
          },
          {
            title: "Chronological Order",
            link: "/bible/old-testament/chronological-order",
            children: null,
          },
        ],
      },
      {
        title: "Languages",
        link: "/bible/languages",
        children: [
          {
            title: "Biblical Hebrew",
            link: "/bible/languages/biblical-hebrew",
            children: null,
          },
          {
            title: "Biblical Aramaic",
            link: "/bible/languages/biblical-aramaic",
            children: null,
          },
          {
            title: "Koine Greek",
            link: "/bible/languages/koine-greek",
            children: null,
          },
        ],
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
        title: "Church History",
        link: "/meditations?category=Church+History",
        children: null,
      },
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
  {
    title: "Glossary",
    link: "/glossary",
    children: [
      {
        title: "English",
        link: "/glossary/english",
        children: null,
      },
      {
        title: "Latin",
        link: "/glossary/latin",
        children: null,
      },
      {
        title: "Greek",
        link: "/glossary/greek",
        children: null,
      },
      {
        title: "Hebrew",
        link: "/glossary/hebrew",
        children: null,
      },
    ],
  },
];
