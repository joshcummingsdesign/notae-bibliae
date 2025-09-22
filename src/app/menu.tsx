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
                title: "The Gospel of Matthew",
                link: "/bible/new-testament/gospels/matthew",
                inPageNav: true,
              },
              {
                title: "The Gospel of Mark",
                link: "/bible/new-testament/gospels/mark",
                inPageNav: true,
              },
              {
                title: "The Gospel of Luke",
                link: "/bible/new-testament/gospels/luke",
                inPageNav: true,
              },
              {
                title: "The Gospel of John",
                link: "/bible/new-testament/gospels/john",
                inPageNav: true,
              },
              {
                title: "Harmony of the Gospels",
                link: "/bible/new-testament/gospels/harmony",
                inPageNav: true,
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
                title: "Epistle to Titus",
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
                title: "Epistle of James",
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
                title: "Epistle of Jude",
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
              {
                title: "Song of Songs",
                link: "/bible/old-testament/poetic-books/song-of-songs",
                inPageNav: true,
              },
            ],
          },
          {
            title: "Prophetic Books",
            link: "/bible/old-testament/prophetic-books",
            children: [
              {
                title: "Isaiah",
                link: "/bible/old-testament/prophetic-books/isaiah",
                inPageNav: true,
              },
              {
                title: "Jeremiah",
                link: "/bible/old-testament/prophetic-books/jeremiah",
                inPageNav: true,
              },
              {
                title: "Lamentations",
                link: "/bible/old-testament/prophetic-books/lamentations",
                inPageNav: true,
              },
              {
                title: "Ezekiel",
                link: "/bible/old-testament/prophetic-books/ezekiel",
                inPageNav: true,
              },
              {
                title: "Daniel",
                link: "/bible/old-testament/prophetic-books/daniel",
                inPageNav: true,
              },
              {
                title: "Hosea",
                link: "/bible/old-testament/prophetic-books/hosea",
                inPageNav: true,
              },
              {
                title: "Joel",
                link: "/bible/old-testament/prophetic-books/joel",
                inPageNav: true,
              },
              {
                title: "Amos",
                link: "/bible/old-testament/prophetic-books/amos",
                inPageNav: true,
              },
              {
                title: "Obadiah",
                link: "/bible/old-testament/prophetic-books/obadiah",
                inPageNav: true,
              },
              {
                title: "Jonah",
                link: "/bible/old-testament/prophetic-books/jonah",
                inPageNav: true,
              },
              {
                title: "Micah",
                link: "/bible/old-testament/prophetic-books/micah",
                inPageNav: true,
              },
              {
                title: "Nahum",
                link: "/bible/old-testament/prophetic-books/nahum",
                inPageNav: true,
              },
              {
                title: "Habakkuk",
                link: "/bible/old-testament/prophetic-books/habakkuk",
                inPageNav: true,
              },
              {
                title: "Zephaniah",
                link: "/bible/old-testament/prophetic-books/zephaniah",
                inPageNav: true,
              },
              {
                title: "Haggai",
                link: "/bible/old-testament/prophetic-books/haggai",
                inPageNav: true,
              },
              {
                title: "Zechariah",
                link: "/bible/old-testament/prophetic-books/zechariah",
                inPageNav: true,
              },
              {
                title: "Malachi",
                link: "/bible/old-testament/prophetic-books/malachi",
                inPageNav: true,
              },
            ],
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
    title: "People",
    link: "/people",
    children: [
      {
        title: "Saints",
        link: "/people/saints",
        inPageNav: true,
        children: [
          {
            title: "Peter",
            link: "/people/saints/peter",
          },
          {
            title: "Andrew",
            link: "/people/saints/andrew",
          },
          {
            title: "James",
            link: "/people/saints/james",
          },
          {
            title: "John",
            link: "/people/saints/john",
          },
          {
            title: "Philip",
            link: "/people/saints/philip",
          },
          {
            title: "James the Less",
            link: "/people/saints/james-the-less",
          },
          {
            title: "Jude",
            link: "/people/saints/jude",
          },
        ],
      },
      {
        title: "Patriarchs",
        link: "/people/patriarchs",
      },
      {
        title: "Kings",
        link: "/people/kings",
      },
      {
        title: "Scholars",
        link: "/people/scholars",
      },
      {
        title: "Historical Figures",
        link: "/people/historical-figures",
      },
      {
        title: "Genealogies",
        link: "/people/genealogies",
      },
    ],
  },
  {
    title: "Places",
    link: "/places",
    children: [
      {
        title: "Eden",
        link: "/places/eden",
      },
    ],
  },
  {
    title: "Meditations",
    link: "/meditations",
    children: [
      {
        title: "Repentance",
        link: "/meditations?category=Repentance",
      },
    ],
  },
  {
    title: "Glossary",
    link: "/glossary",
    children: [
      {
        title: "Hebrew",
        link: "/glossary/hebrew",
      },
      {
        title: "Greek",
        link: "/glossary/greek",
      },
      {
        title: "Latin",
        link: "/glossary/latin",
      },
      {
        title: "English",
        link: "/glossary/english",
      },
      {
        title: "Names",
        link: "/glossary/names",
      },
    ],
  },
];
