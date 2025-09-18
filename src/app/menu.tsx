export type MenuNode = {
  title: string;
  link: string;
  children?: MenuNode[];
  inPageNav?: boolean;
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
              },
              {
                title: "Mark",
                link: "/bible/new-testament/gospels/mark",
              },
              {
                title: "Luke",
                link: "/bible/new-testament/gospels/luke",
              },
              {
                title: "John",
                link: "/bible/new-testament/gospels/john",
              },
              {
                title: "Harmony of the Gospels",
                link: "/bible/new-testament/gospels/harmony",
              },
            ],
          },
          {
            title: "Acts",
            link: "/bible/new-testament/acts",
            inPageNav: true,
          },
          {
            title: "Epistles",
            link: "/bible/new-testament/epistles",
            children: [
              {
                title: "Romans",
                link: "/bible/new-testament/epistles/romans",
              },
              {
                title: "1 Corinthians",
                link: "/bible/new-testament/epistles/1-corinthians",
              },
              {
                title: "2 Corinthians",
                link: "/bible/new-testament/epistles/2-corinthians",
              },
              {
                title: "Galatians",
                link: "/bible/new-testament/epistles/galatians",
              },
              {
                title: "Ephesians",
                link: "/bible/new-testament/epistles/ephesians",
              },
              {
                title: "Philippians",
                link: "/bible/new-testament/epistles/philippians",
              },
              {
                title: "Colossians",
                link: "/bible/new-testament/epistles/colossians",
              },
              {
                title: "1 Thessalonians",
                link: "/bible/new-testament/epistles/1-thessalonians",
              },
              {
                title: "2 Thessalonians",
                link: "/bible/new-testament/epistles/2-thessalonians",
              },
              {
                title: "1 Timothy",
                link: "/bible/new-testament/epistles/1-timothy",
              },
              {
                title: "2 Timothy",
                link: "/bible/new-testament/epistles/2-timothy",
              },
              {
                title: "Titus",
                link: "/bible/new-testament/epistles/titus",
              },
              {
                title: "Philemon",
                link: "/bible/new-testament/epistles/philemon",
              },
              {
                title: "Hebrews",
                link: "/bible/new-testament/epistles/hebrews",
              },
              {
                title: "James",
                link: "/bible/new-testament/epistles/james",
              },
              {
                title: "1 Peter",
                link: "/bible/new-testament/epistles/1-peter",
              },
              {
                title: "2 Peter",
                link: "/bible/new-testament/epistles/2-peter",
              },
              {
                title: "1 John",
                link: "/bible/new-testament/epistles/1-john",
              },
              {
                title: "2 John",
                link: "/bible/new-testament/epistles/2-john",
              },
              {
                title: "3 John",
                link: "/bible/new-testament/epistles/3-john",
              },
              {
                title: "Jude",
                link: "/bible/new-testament/epistles/jude",
              },
            ],
          },
          {
            title: "Revelation",
            link: "/bible/new-testament/revelation",
          },
          {
            title: "Chronological Order (NT)",
            link: "/bible/new-testament/chronological-order",
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
                inPageNav: true,
              },
              {
                title: "Exodus",
                link: "/bible/old-testament/pentateuch/exodus",
                inPageNav: true,
              },
              {
                title: "Leviticus",
                link: "/bible/old-testament/pentateuch/leviticus",
                inPageNav: true,
              },
              {
                title: "Numbers",
                link: "/bible/old-testament/pentateuch/numbers",
                inPageNav: true,
              },
              {
                title: "Deuteronomy",
                link: "/bible/old-testament/pentateuch/deuteronomy",
                inPageNav: true,
              },
            ],
          },
          {
            title: "Historical Books",
            link: "/bible/old-testament/historical-books",
            children: [
              {
                title: "Joshua",
                link: "/bible/old-testament/historical-books/joshua",
                inPageNav: true,
              },
              {
                title: "Judges",
                link: "/bible/old-testament/historical-books/judges",
                inPageNav: true,
              },
              {
                title: "Ruth",
                link: "/bible/old-testament/historical-books/ruth",
                inPageNav: true,
              },
              {
                title: "1 Samuel",
                link: "/bible/old-testament/historical-books/1-samuel",
                inPageNav: true,
              },
              {
                title: "2 Samuel",
                link: "/bible/old-testament/historical-books/2-samuel",
                inPageNav: true,
              },
              {
                title: "1 Kings",
                link: "/bible/old-testament/historical-books/1-kings",
                inPageNav: true,
              },
              {
                title: "2 Kings",
                link: "/bible/old-testament/historical-books/2-kings",
                inPageNav: true,
              },
              {
                title: "1 Chronicles",
                link: "/bible/old-testament/historical-books/1-chronicles",
                inPageNav: true,
              },
              {
                title: "2 Chronicles",
                link: "/bible/old-testament/historical-books/2-chronicles",
                inPageNav: true,
              },
              {
                title: "Ezra",
                link: "/bible/old-testament/historical-books/ezra",
                inPageNav: true,
              },
              {
                title: "Nehemiah",
                link: "/bible/old-testament/historical-books/nehemiah",
                inPageNav: true,
              },
              {
                title: "Esther",
                link: "/bible/old-testament/historical-books/esther",
                inPageNav: true,
              },
            ],
          },
          {
            title: "Poetic Books",
            link: "/bible/old-testament/poetic-books",
            children: [
              {
                title: "Job",
                link: "/bible/old-testament/poetic-books/job",
                inPageNav: true,
              },
              {
                title: "Psalms",
                link: "/bible/old-testament/poetic-books/psalms",
                inPageNav: true,
              },
              {
                title: "Proverbs",
                link: "/bible/old-testament/poetic-books/proverbs",
                inPageNav: true,
              },
              {
                title: "Ecclesiastes",
                link: "/bible/old-testament/poetic-books/ecclesiastes",
                inPageNav: true,
              },
            ],
          },
          {
            title: "Prophetic Books",
            link: "/bible/old-testament/prophetic-books",
          },
          {
            title: "Jewish Order (OT)",
            link: "/bible/old-testament/jewish-order",
            children: [
              {
                title: "Torah",
                link: "/bible/old-testament/jewish-order/torah",
              },
              {
                title: "Nevi'im",
                link: "/bible/old-testament/jewish-order/neviim",
              },
              {
                title: "Ketuvim",
                link: "/bible/old-testament/jewish-order/ketuvim",
              },
            ],
          },
          {
            title: "Chronological Order (OT)",
            link: "/bible/old-testament/chronological-order",
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
          },
          {
            title: "Biblical Aramaic",
            link: "/bible/languages/biblical-aramaic",
          },
          {
            title: "Koine Greek",
            link: "/bible/languages/koine-greek",
          },
        ],
      },
      {
        title: "Translations",
        link: "/bible/translations",
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
      },
      {
        title: "Prayers",
        link: "/liturgy/prayers",
      },
      {
        title: "Creeds",
        link: "/liturgy/creeds",
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
      },
      {
        title: "Luther",
        link: "/meditations?category=Luther",
      },
      {
        title: "Repentance",
        link: "/meditations?category=Repentance",
      },
      {
        title: "Theology",
        link: "/meditations?category=Theology",
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
      },
      {
        title: "Latin",
        link: "/glossary/latin",
      },
      {
        title: "Greek",
        link: "/glossary/greek",
      },
      {
        title: "Hebrew",
        link: "/glossary/hebrew",
      },
    ],
  },
];
