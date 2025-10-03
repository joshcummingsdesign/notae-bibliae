export type MenuNode = {
  title: string;
  link: string;
  children?: MenuNode[];
  inPageNav?: boolean;
  priority?: number;
};

export const menuItems: MenuNode[] = [
  {
    title: "Bible",
    link: "/bible",
    priority: 0.8,
    children: [
      {
        title: "New Testament",
        link: "/bible/new-testament",
        priority: 0.7,
        children: [
          {
            title: "Gospels",
            link: "/bible/new-testament/gospels",
            priority: 0.6,
            children: [
              {
                title: "Gospel of Matthew",
                link: "/bible/new-testament/gospels/matthew",
              },
              {
                title: "Gospel of Mark",
                link: "/bible/new-testament/gospels/mark",
              },
              {
                title: "Gospel of Luke",
                link: "/bible/new-testament/gospels/luke",
              },
              {
                title: "Gospel of John",
                link: "/bible/new-testament/gospels/john",
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
            priority: 0.6,
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
            inPageNav: true,
          },
          {
            title: "Chronological Order (NT)",
            link: "/bible/new-testament/chronological-order",
            priority: 0.2,
          },
        ],
      },
      {
        title: "Old Testament",
        link: "/bible/old-testament",
        priority: 0.7,
        children: [
          {
            title: "Pentateuch",
            link: "/bible/old-testament/pentateuch",
            priority: 0.6,
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
            priority: 0.6,
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
              },
              {
                title: "Nehemiah",
                link: "/bible/old-testament/historical-books/nehemiah",
              },
              {
                title: "Esther",
                link: "/bible/old-testament/historical-books/esther",
              },
            ],
          },
          {
            title: "Poetic Books",
            link: "/bible/old-testament/poetic-books",
            priority: 0.6,
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
            priority: 0.6,
            children: [
              {
                title: "Isaiah",
                link: "/bible/old-testament/prophetic-books/isaiah",
              },
              {
                title: "Jeremiah",
                link: "/bible/old-testament/prophetic-books/jeremiah",
              },
              {
                title: "Lamentations",
                link: "/bible/old-testament/prophetic-books/lamentations",
              },
              {
                title: "Ezekiel",
                link: "/bible/old-testament/prophetic-books/ezekiel",
              },
              {
                title: "Daniel",
                link: "/bible/old-testament/prophetic-books/daniel",
              },
              {
                title: "Hosea",
                link: "/bible/old-testament/prophetic-books/hosea",
              },
              {
                title: "Joel",
                link: "/bible/old-testament/prophetic-books/joel",
              },
              {
                title: "Amos",
                link: "/bible/old-testament/prophetic-books/amos",
              },
              {
                title: "Obadiah",
                link: "/bible/old-testament/prophetic-books/obadiah",
              },
              {
                title: "Jonah",
                link: "/bible/old-testament/prophetic-books/jonah",
              },
              {
                title: "Micah",
                link: "/bible/old-testament/prophetic-books/micah",
              },
              {
                title: "Nahum",
                link: "/bible/old-testament/prophetic-books/nahum",
              },
              {
                title: "Habakkuk",
                link: "/bible/old-testament/prophetic-books/habakkuk",
              },
              {
                title: "Zephaniah",
                link: "/bible/old-testament/prophetic-books/zephaniah",
              },
              {
                title: "Haggai",
                link: "/bible/old-testament/prophetic-books/haggai",
              },
              {
                title: "Zechariah",
                link: "/bible/old-testament/prophetic-books/zechariah",
              },
              {
                title: "Malachi",
                link: "/bible/old-testament/prophetic-books/malachi",
              },
            ],
          },
          {
            title: "Jewish Order (OT)",
            link: "/bible/old-testament/jewish-order",
            priority: 0.2,
            children: [
              {
                title: "Torah",
                link: "/bible/old-testament/jewish-order/torah",
                priority: 0.2,
              },
              {
                title: "Nevi'im",
                link: "/bible/old-testament/jewish-order/neviim",
                priority: 0.2,
              },
              {
                title: "Ketuvim",
                link: "/bible/old-testament/jewish-order/ketuvim",
                priority: 0.2,
              },
            ],
          },
          {
            title: "Chronological Order (OT)",
            link: "/bible/old-testament/chronological-order",
            priority: 0.2,
          },
        ],
      },
      {
        title: "Apocrypha",
        link: "/bible/apocrypha",
        priority: 0.6,
        children: [
          {
            title: "Gospel of James",
            link: "/bible/apocrypha/gospel-of-james",
          },
          {
            title: "Gospel of Pseudo-Matthew",
            link: "/bible/apocrypha/gospel-of-pseudo-matthew",
            inPageNav: true,
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
        children: [
          {
            title: "Septuagint",
            link: "/bible/translations/septuagint",
          },
          {
            title: "Targum Onkelos",
            link: "/bible/translations/targum-onkelos",
          },
          {
            title: "Targum Jonathan",
            link: "/bible/translations/targum-jonathan",
          },
          {
            title: "Vetus Latina",
            link: "/bible/translations/vetus-latina",
          },
          {
            title: "Vulgate",
            link: "/bible/translations/vulgate",
          },
          {
            title: "Masoretic Text",
            link: "/bible/translations/masoretic-text",
          },
          {
            title: "Wycliffe's Bible",
            link: "/bible/translations/wycliffes-bible",
          },
          {
            title: "Textus Receptus",
            link: "/bible/translations/textus-receptus",
          },
          {
            title: "Luther Bible",
            link: "/bible/translations/luther-bible",
          },
          {
            title: "Tyndale Bible",
            link: "/bible/translations/tyndale-bible",
          },
          {
            title: "Coverdale Bible",
            link: "/bible/translations/coverdale-bible",
          },
          {
            title: "Great Bible",
            link: "/bible/translations/great-bible",
          },
          {
            title: "Geneva Bible",
            link: "/bible/translations/geneva-bible",
          },
          {
            title: "King James Version",
            link: "/bible/translations/king-james-version",
          },
          {
            title: "Westcott and Hort",
            link: "/bible/translations/westcott-and-hort",
          },
          {
            title: "Novum Testamentum Graece",
            link: "/bible/translations/novum-testamentum-graece",
          },
          {
            title: "American Standard Version",
            link: "/bible/translations/american-standard-version",
          },
          {
            title: "Dead Sea Scrolls",
            link: "/bible/translations/dead-sea-scrolls",
          },
          {
            title: "Revised Standard Version",
            link: "/bible/translations/revised-standard-version",
          },
          {
            title: "The Living Bible",
            link: "/bible/translations/the-living-bible",
          },
          {
            title: "New International Version",
            link: "/bible/translations/new-international-version",
          },
          {
            title: "New King James Version",
            link: "/bible/translations/new-king-james-version",
          },
          {
            title: "New Revised Standard Version",
            link: "/bible/translations/new-revised-standard-version",
          },
          {
            title: "New Living Translation",
            link: "/bible/translations/new-living-translation",
          },
          {
            title: "English Standard Version",
            link: "/bible/translations/english-standard-version",
          },
        ],
      },
    ],
  },
  {
    title: "Liturgy",
    link: "/liturgy",
    priority: 0.8,
    children: [
      {
        title: "Liturgical Calendar",
        link: "/liturgy/liturgical-calendar",
        priority: 0.7,
      },
      {
        title: "Feasts",
        link: "/liturgy/feasts",
        priority: 0.7,
      },
      {
        title: "Prayers & Creeds",
        link: "/liturgy/prayers-and-creeds",
        priority: 0.7,
      },
      {
        title: "Rites & Traditions",
        link: "/liturgy/rites-and-traditions",
        priority: 0.7,
      },
      {
        title: "Music",
        link: "/liturgy/music",
        priority: 0.7,
      },
    ],
  },
  {
    title: "People",
    link: "/people",
    priority: 0.8,
    children: [
      {
        title: "Saints",
        link: "/people/saints",
        inPageNav: true,
        priority: 0.7,
        children: [
          {
            title: "Angels",
            link: "/people/saints/angels",
            priority: 0.6,
            children: [
              {
                title: "Gabriel",
                link: "/people/saints/angels/gabriel",
              },
              {
                title: "Michael",
                link: "/people/saints/angels/michael",
              },
            ],
          },
          {
            title: "Apostles",
            link: "/people/saints/apostles",
            priority: 0.6,
            children: [
              {
                title: "Andrew",
                link: "/people/saints/apostles/andrew",
              },
              {
                title: "Barnabas",
                link: "/people/saints/apostles/barnabas",
              },
              {
                title: "Bartholomew",
                link: "/people/saints/apostles/bartholomew",
              },
              {
                title: "James",
                link: "/people/saints/apostles/james",
              },
              {
                title: "James the Less",
                link: "/people/saints/apostles/james-the-less",
              },
              {
                title: "John",
                link: "/people/saints/apostles/john",
              },
              {
                title: "Jude",
                link: "/people/saints/apostles/jude",
              },
              {
                title: "Matthew",
                link: "/people/saints/apostles/matthew",
              },
              {
                title: "Matthias",
                link: "/people/saints/apostles/matthias",
              },
              {
                title: "Peter",
                link: "/people/saints/apostles/peter",
              },
              {
                title: "Paul",
                link: "/people/saints/apostles/paul",
              },
              {
                title: "Philip",
                link: "/people/saints/apostles/philip",
              },
              {
                title: "Simon",
                link: "/people/saints/apostles/simon",
              },
              {
                title: "Thomas",
                link: "/people/saints/apostles/thomas",
              },
            ],
          },
          {
            title: "Evangelists",
            link: "/people/saints/evangelists",
            priority: 0.6,
            children: [
              {
                title: "Luke",
                link: "/people/saints/evangelists/luke",
              },
              {
                title: "Mark",
                link: "/people/saints/evangelists/mark",
              },
            ],
          },
          {
            title: "Biblical Saints",
            link: "/people/saints/biblical",
            priority: 0.6,
            children: [
              {
                title: "Joachim and Anne",
                link: "/people/saints/biblical/joachim-and-anne",
              },
              {
                title: "John the Baptist",
                link: "/people/saints/biblical/john-the-baptist",
              },
              {
                title: "St. Joseph",
                link: "/people/saints/biblical/joseph",
              },
              {
                title: "Lazarus",
                link: "/people/saints/biblical/lazarus",
              },
              {
                title: "Martha",
                link: "/people/saints/biblical/martha",
              },
              {
                title: "Mary",
                link: "/people/saints/biblical/mary",
              },
              {
                title: "Mary of Bethany",
                link: "/people/saints/biblical/mary-of-bethany",
              },
              {
                title: "Mary Magdalene",
                link: "/people/saints/biblical/mary-magdalene",
              },
              {
                title: "Philip the Evangelist",
                link: "/people/saints/biblical/philip-the-evangelist",
              },
              {
                title: "Silas",
                link: "/people/saints/biblical/silas",
              },
              {
                title: "Stephen",
                link: "/people/saints/biblical/stephen",
              },
              {
                title: "Timothy",
                link: "/people/saints/biblical/timothy",
              },
              {
                title: "Titus",
                link: "/people/saints/biblical/titus",
              },
            ],
          },
          {
            title: "Apostolic Fathers",
            link: "/people/saints/apostolic-fathers",
            priority: 0.6,
            children: [
              {
                title: "Clement of Rome",
                link: "/people/saints/apostolic-fathers/clement-of-rome",
              },
              {
                title: "Ignatius of Antioch",
                link: "/people/saints/apostolic-fathers/ignatius-of-antioch",
              },
              {
                title: "Papias of Hierapolis",
                link: "/people/saints/apostolic-fathers/papias-of-hierapolis",
              },
              {
                title: "Polycarp of Smyrna",
                link: "/people/saints/apostolic-fathers/polycarp-of-smyrna",
              },
              {
                title: "Quadratus of Athens",
                link: "/people/saints/apostolic-fathers/quadratus-of-athens",
              },
            ],
          },
          {
            title: "Greek Fathers",
            link: "/people/saints/greek-fathers",
            priority: 0.6,
            children: [
              {
                title: "Athanasius of Alexandria",
                link: "/people/saints/greek-fathers/athanasius-of-alexandria",
              },
              {
                title: "Cyril of Alexandria",
                link: "/people/saints/greek-fathers/cyril-of-alexandria",
              },
              {
                title: "Cyril of Jerusalem",
                link: "/people/saints/greek-fathers/cyril-of-jerusalem",
              },
              {
                title: "Irenaeus of Lyon",
                link: "/people/saints/greek-fathers/irenaeus-of-lyon",
              },
              {
                title: "John Chrysostom",
                link: "/people/saints/greek-fathers/john-chrysostom",
              },
              {
                title: "John of Damascus",
                link: "/people/saints/greek-fathers/john-of-damascus",
              },
              {
                title: "Justin Martyr",
                link: "/people/saints/greek-fathers/justin-martyr",
              },
              {
                title: "Maximus the Confessor",
                link: "/people/saints/greek-fathers/maximus-the-confessor",
              },
            ],
          },
          {
            title: "Cappadocian Fathers",
            link: "/people/saints/cappadocian-fathers",
            priority: 0.6,
            children: [
              {
                title: "Basil the Great",
                link: "/people/saints/cappadocian-fathers/basil-the-great",
              },
              {
                title: "Gregory of Nazianzus",
                link: "/people/saints/cappadocian-fathers/gregory-of-nazianzus",
              },
              {
                title: "Gregory of Nyssa",
                link: "/people/saints/cappadocian-fathers/gregory-of-nyssa",
              },
            ],
          },
          {
            title: "Latin Fathers",
            link: "/people/saints/latin-fathers",
            priority: 0.6,
            children: [
              {
                title: "Ambrose of Milan",
                link: "/people/saints/latin-fathers/ambrose-of-milan",
              },
              {
                title: "Augustine of Hippo",
                link: "/people/saints/latin-fathers/augustine-of-hippo",
              },
              {
                title: "Cyprian of Carthage",
                link: "/people/saints/latin-fathers/cyprian-of-carthage",
              },
              {
                title: "Damasus of Rome",
                link: "/people/saints/latin-fathers/damasus-of-rome",
              },
              {
                title: "Gregory the Great",
                link: "/people/saints/latin-fathers/gregory-the-great",
              },
              {
                title: "Hilary of Poitiers",
                link: "/people/saints/latin-fathers/hilary-of-poitiers",
              },
              {
                title: "Isidore of Seville",
                link: "/people/saints/latin-fathers/isidore-of-seville",
              },
              {
                title: "Jerome of Stridon",
                link: "/people/saints/latin-fathers/jerome-of-stridon",
              },
              {
                title: "Leo the Great",
                link: "/people/saints/latin-fathers/leo-the-great",
              },
            ],
          },
          {
            title: "Syriac Fathers",
            link: "/people/saints/syriac-fathers",
            priority: 0.6,
            children: [
              {
                title: "Aphrahat the Persian",
                link: "/people/saints/syriac-fathers/aphrahat-the-persian",
              },
              {
                title: "Ephrem the Syrian",
                link: "/people/saints/syriac-fathers/ephrem-the-syrian",
              },
              {
                title: "Isaac of Nineveh",
                link: "/people/saints/syriac-fathers/isaac-of-nineveh",
              },
              {
                title: "Jacob of Serugh",
                link: "/people/saints/syriac-fathers/jacob-of-serugh",
              },
            ],
          },
          {
            title: "Desert Fathers",
            link: "/people/saints/desert-fathers",
            priority: 0.6,
            children: [
              {
                title: "Anthony the Great",
                link: "/people/saints/desert-fathers/anthony-the-great",
              },
              {
                title: "Pachomius the Great",
                link: "/people/saints/desert-fathers/pachomius-the-great",
              },
              {
                title: "Paul of Thebes",
                link: "/people/saints/desert-fathers/paul-of-thebes",
              },
            ],
          },
          {
            title: "Early Saints",
            link: "/people/saints/early",
            priority: 0.6,
            children: [
              {
                title: "Christopher of Lycia",
                link: "/people/saints/early/christopher-of-lycia",
              },
              {
                title: "Epiphanius of Salamis",
                link: "/people/saints/early/epiphanius-of-salamis",
              },
              {
                title: "Hippolytus of Rome",
                link: "/people/saints/early/hippolytus-of-rome",
              },
              {
                title: "John Cassian",
                link: "/people/saints/early/john-cassian",
              },
              {
                title: "Nicholas of Myra",
                link: "/people/saints/early/nicholas-of-myra",
              },
              {
                title: "Patrick of Ireland",
                link: "/people/saints/early/patrick-of-ireland",
              },
              {
                title: "Valentine of Rome",
                link: "/people/saints/early/valentine-of-rome",
              },
            ],
          },
          {
            title: "Medieval Saints",
            link: "/people/saints/medieval",
            priority: 0.6,
            children: [
              {
                title: "Anselm of Canterbury",
                link: "/people/saints/medieval/anselm-of-canterbury",
              },
              {
                title: "Benedict of Nursia",
                link: "/people/saints/medieval/benedict-of-nursia",
              },
              {
                title: "Bernard of Clairvaux",
                link: "/people/saints/medieval/bernard-of-clairvaux",
              },
              {
                title: "Bonaventure of Bagnoregio",
                link: "/people/saints/medieval/bonaventure-of-bagnoregio",
              },
              {
                title: "Dominic of Osma",
                link: "/people/saints/medieval/dominic-of-osma",
              },
              {
                title: "Francis of Assisi",
                link: "/people/saints/medieval/francis-of-assisi",
              },
              {
                title: "Thomas Aquinas",
                link: "/people/saints/medieval/thomas-aquinas",
              },
            ],
          },
        ],
      },
      {
        title: "Scholars",
        link: "/people/scholars",
        priority: 0.7,
        children: [
          {
            title: "Boethius",
            link: "/people/scholars/boethius",
          },
          {
            title: "Clement of Alexandria",
            link: "/people/scholars/clement-of-alexandria",
          },
          {
            title: "Duns Scotus",
            link: "/people/scholars/duns-scotus",
          },
          {
            title: "Eusebius",
            link: "/people/scholars/eusebius",
          },
          {
            title: "Origen",
            link: "/people/scholars/origen",
          },
          {
            title: "Peter Lombard",
            link: "/people/scholars/peter-lombard",
          },
          {
            title: "Tertullian",
            link: "/people/scholars/tertullian",
          },
          {
            title: "William of Ockham",
            link: "/people/scholars/william-of-ockham",
          },
        ],
      },
      {
        title: "Patriarchs",
        link: "/people/patriarchs",
        priority: 0.7,
        children: [
          {
            title: "Abraham",
            link: "/people/patriarchs/abraham",
          },
          {
            title: "Isaac",
            link: "/people/patriarchs/isaac",
          },
          {
            title: "Jacob",
            link: "/people/patriarchs/jacob",
          },
        ],
      },
      {
        title: "Twelve Tribes of Israel",
        link: "/people/twelve-tribes-of-israel",
        priority: 0.7,
        children: [
          {
            title: "Reuben",
            link: "/people/twelve-tribes-of-israel/reuben",
          },
          {
            title: "Simeon",
            link: "/people/twelve-tribes-of-israel/simeon",
          },
          {
            title: "Levi",
            link: "/people/twelve-tribes-of-israel/levi",
          },
          {
            title: "Judah",
            link: "/people/twelve-tribes-of-israel/judah",
          },
          {
            title: "Dan",
            link: "/people/twelve-tribes-of-israel/dan",
          },
          {
            title: "Naphtali",
            link: "/people/twelve-tribes-of-israel/naphtali",
          },
          {
            title: "Gad",
            link: "/people/twelve-tribes-of-israel/gad",
          },
          {
            title: "Asher",
            link: "/people/twelve-tribes-of-israel/asher",
          },
          {
            title: "Issachar",
            link: "/people/twelve-tribes-of-israel/issachar",
          },
          {
            title: "Joseph",
            link: "/people/twelve-tribes-of-israel/joseph",
          },
          {
            title: "Manasseh",
            link: "/people/twelve-tribes-of-israel/manasseh",
          },
          {
            title: "Ephraim",
            link: "/people/twelve-tribes-of-israel/ephraim",
          },
          {
            title: "Benjamin",
            link: "/people/twelve-tribes-of-israel/benjamin",
          },
        ],
      },
      {
        title: "Kings of Israel",
        link: "/people/kings-of-israel",
      },
      {
        title: "Pagan Rulers",
        link: "/people/pagan-rulers",
      },
      {
        title: "Genealogies",
        link: "/people/genealogies",
        priority: 0.7,
        children: [
          {
            title: "Biblical Genealogy",
            link: "/people/genealogies/biblical",
          },
          {
            title: "Genealogy of Jesus",
            link: "/people/genealogies/jesus",
          },
        ],
      },
    ],
  },
  {
    title: "Places",
    link: "/places",
    priority: 0.8,
    children: [
      {
        title: "Old Testament Places",
        link: "/places/old-testament",
        priority: 0.7,
        children: [
          {
            title: "Places in Genesis",
            link: "/places/old-testament/genesis",
            priority: 0.6,
            children: [
              {
                title: "Abel-mizraim (Atad)",
                link: "/places/old-testament/genesis/abel-mizraim",
              },
              {
                title: "Achzib (Chezib)",
                link: "/places/old-testament/genesis/achzib",
              },
              {
                title: "Admah",
                link: "/places/old-testament/genesis/admah",
              },
              {
                title: "Adullam",
                link: "/places/old-testament/genesis/adullam",
              },
              {
                title: "Ai",
                link: "/places/old-testament/genesis/ai",
              },
              {
                title: "Ammon",
                link: "/places/old-testament/genesis/ammon",
              },
              {
                title: "Ararat",
                link: "/places/old-testament/genesis/ararat",
              },
              {
                title: "Assyria",
                link: "/places/old-testament/genesis/assyria",
              },
              {
                title: "Babylon (Babel)",
                link: "/places/old-testament/genesis/babylon",
              },
              {
                title: "Babylonia (Shinar)",
                link: "/places/old-testament/genesis/babylonia",
              },
              {
                title: "Beer-lahai-roi",
                link: "/places/old-testament/genesis/beer-lahai-roi",
              },
              {
                title: "Beersheba",
                link: "/places/old-testament/genesis/beersheba",
              },
              {
                title: "Bethel (Luz)",
                link: "/places/old-testament/genesis/bethel",
              },
              {
                title: "Bethlehem (Ephrath)",
                link: "/places/old-testament/genesis/bethlehem",
              },
              {
                title: "Canaan",
                link: "/places/old-testament/genesis/canaan",
              },
              {
                title: "Chaldea",
                link: "/places/old-testament/genesis/chaldea",
              },
              {
                title: "Dead Sea (Salt Sea)",
                link: "/places/old-testament/genesis/dead-sea",
              },
              {
                title: "Dothan",
                link: "/places/old-testament/genesis/dothan",
              },
              {
                title: "Eden",
                link: "/places/old-testament/genesis/eden",
              },
              {
                title: "Edom (Seir)",
                link: "/places/old-testament/genesis/edom",
              },
              {
                title: "Egypt",
                link: "/places/old-testament/genesis/egypt",
              },
              {
                title: "Enaim (Enam)",
                link: "/places/old-testament/genesis/enaim",
              },
              {
                title: "En-mishpat",
                link: "/places/old-testament/genesis/en-mishpat",
              },
              {
                title: "Engedi (Hazazon-tamar)",
                link: "/places/old-testament/genesis/engedi",
              },
              {
                title: "Gaza",
                link: "/places/old-testament/genesis/gaza",
              },
              {
                title: "Gerar",
                link: "/places/old-testament/genesis/gerar",
              },
              {
                title: "Gilead (Geleed)",
                link: "/places/old-testament/genesis/gilead",
              },
              {
                title: "Gomorrah",
                link: "/places/old-testament/genesis/gomorrah",
              },
              {
                title: "Goshen",
                link: "/places/old-testament/genesis/goshen",
              },
              {
                title: "Haran (Paddan-aram)",
                link: "/places/old-testament/genesis/haran",
              },
              {
                title: "Havilah",
                link: "/places/old-testament/genesis/havilah",
              },
              {
                title: "Hebron (Kiriath-arba)",
                link: "/places/old-testament/genesis/hebron",
              },
              {
                title: "Jabbok River",
                link: "/places/old-testament/genesis/jabbok-river",
              },
              {
                title: "Jegar-sahadutha",
                link: "/places/old-testament/genesis/jegar-sahadutha",
              },
              {
                title: "Jerusalem (Salem)",
                link: "/places/old-testament/genesis/jerusalem",
              },
              {
                title: "Jordan River",
                link: "/places/old-testament/genesis/jordan-river",
              },
              {
                title: "Kadesh-barnea",
                link: "/places/old-testament/genesis/kadesh-barnea",
              },
              {
                title: "Machpelah",
                link: "/places/old-testament/genesis/machpelah",
              },
              {
                title: "Mahanaim",
                link: "/places/old-testament/genesis/mahanaim",
              },
              {
                title: "Midian",
                link: "/places/old-testament/genesis/midian",
              },
              {
                title: "Mizpah",
                link: "/places/old-testament/genesis/mizpah",
              },
              {
                title: "Moab",
                link: "/places/old-testament/genesis/moab",
              },
              {
                title: "Mount Moriah",
                link: "/places/old-testament/genesis/mount-moriah",
              },
              {
                title: "Negeb",
                link: "/places/old-testament/genesis/negeb",
              },
              {
                title: "Nineveh",
                link: "/places/old-testament/genesis/nineveh",
              },
              {
                title: "Nod",
                link: "/places/old-testament/genesis/nod",
              },
              {
                title: "Oak of Moreh",
                link: "/places/old-testament/genesis/oak-of-moreh",
              },
              {
                title: "Oaks of Mamre",
                link: "/places/old-testament/genesis/oaks-of-mamre",
              },
              {
                title: "Paran (El-paran)",
                link: "/places/old-testament/genesis/paran",
              },
              {
                title: "Penuel (Peniel)",
                link: "/places/old-testament/genesis/penuel",
              },
              {
                title: "Rameses",
                link: "/places/old-testament/genesis/rameses",
              },
              {
                title: "Shechem",
                link: "/places/old-testament/genesis/shechem",
              },
              {
                title: "Shur (Bered)",
                link: "/places/old-testament/genesis/shur",
              },
              {
                title: "Sidon",
                link: "/places/old-testament/genesis/sidon",
              },
              {
                title: "Sodom",
                link: "/places/old-testament/genesis/sodom",
              },
              {
                title: "Succoth",
                link: "/places/old-testament/genesis/succoth",
              },
              {
                title: "Timnah",
                link: "/places/old-testament/genesis/timnah",
              },
              {
                title: "Tower of the Flock (Eder)",
                link: "/places/old-testament/genesis/tower-of-the-flock",
              },
              {
                title: "Ur",
                link: "/places/old-testament/genesis/ur",
              },
              {
                title: "Valley of Siddim",
                link: "/places/old-testament/genesis/valley-of-siddim",
              },
              {
                title: "Zeboiim",
                link: "/places/old-testament/genesis/zeboiim",
              },
              {
                title: "Zoar (Bela)",
                link: "/places/old-testament/genesis/zoar",
              },
            ],
          },
          {
            title: "Places in Exodus",
            link: "/places/old-testament/exodus",
            priority: 0.6,
            children: [
              {
                title: "Baal-zephon",
                link: "/places/old-testament/exodus/baal-zephon",
              },
              {
                title: "Elim",
                link: "/places/old-testament/exodus/elim",
              },
              {
                title: "Etham",
                link: "/places/old-testament/exodus/etham",
              },
              {
                title: "Marah",
                link: "/places/old-testament/exodus/marah",
              },
              {
                title: "Massah and Meribah",
                link: "/places/old-testament/exodus/massah-and-meribah",
              },
              {
                title: "Migdol",
                link: "/places/old-testament/exodus/migdol",
              },
              {
                title: "Mount Sinai (Horeb)",
                link: "/places/old-testament/exodus/mount-sinai",
              },
              {
                title: "Pi-hahiroth",
                link: "/places/old-testament/exodus/pi-hahiroth",
              },
              {
                title: "Pithom",
                link: "/places/old-testament/exodus/pithom",
              },
              {
                title: "Red Sea",
                link: "/places/old-testament/exodus/red-sea",
              },
              {
                title: "Rephidim",
                link: "/places/old-testament/exodus/rephidim",
              },
              {
                title: "Succoth, Egypt",
                link: "/places/old-testament/exodus/succoth-egypt",
              },
              {
                title: "Wilderness of Sin",
                link: "/places/old-testament/exodus/wilderness-of-sin",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Meditations",
    link: "/meditations",
    priority: 0.8,
    children: [
      {
        title: "Anselm",
        link: "/meditations?category=Anselm",
      },
      {
        title: "Aquinas",
        link: "/meditations?category=Aquinas",
      },
      {
        title: "Augustine",
        link: "/meditations?category=Augustine",
      },
      {
        title: "Bible",
        link: "/meditations?category=Bible",
      },
      {
        title: "Big Concepts",
        link: "/meditations?category=Big+Concepts",
      },
      {
        title: "Calvin",
        link: "/meditations?category=Calvin",
      },
      {
        title: "Church History",
        link: "/meditations?category=Church+History",
      },
      {
        title: "Liturgy",
        link: "/meditations?category=Liturgy",
      },
      {
        title: "Luther",
        link: "/meditations?category=Luther",
      },
      {
        title: "New Testament",
        link: "/meditations?category=New+Testament",
      },
      {
        title: "Old Testament",
        link: "/meditations?category=Old+Testament",
      },
      {
        title: "Philosophy",
        link: "/meditations?category=Philosophy",
      },
      {
        title: "Prayer & Fasting",
        link: "/meditations?category=Prayer+and+Fasting",
      },
      {
        title: "Prophets",
        link: "/meditations?category=Prophets",
      },
      {
        title: "Repentance",
        link: "/meditations?category=Repentance",
      },
      {
        title: "Sacraments",
        link: "/meditations?category=Sacraments",
      },
      {
        title: "The Law",
        link: "/meditations?category=The+Law",
      },
      {
        title: "Theology",
        link: "/meditations?category=Theology",
      },
      {
        title: "Trinity",
        link: "/meditations?category=Trinity",
      },
      {
        title: "Wisdom",
        link: "/meditations?category=Wisdom",
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
        inPageNav: true,
      },
      {
        title: "Liturgical Terms",
        link: "/glossary/liturgical-terms",
        inPageNav: true,
      },
    ],
  },
];
