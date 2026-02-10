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
        title: "Liturgical Year",
        link: "/liturgy/liturgical-year",
        priority: 0.7,
        children: [
          {
            title: "Preface",
            link: "/liturgy/liturgical-year/preface",
            priority: 0.6,
          },
          {
            title: "Calendar",
            link: "/liturgy/liturgical-year/calendar",
            priority: 0.6,
          },
          {
            title: "Seasons",
            link: "/liturgy/liturgical-year/seasons",
            priority: 0.6,
            children: [
              {
                title: "Advent",
                link: "/liturgy/liturgical-year/seasons/advent",
                children: [
                  {
                    title: "Conception of the Blessed Virgin Mary",
                    link: "/liturgy/liturgical-year/seasons/advent/conception-of-the-blessed-virgin-mary",
                  },
                  {
                    title: "Gaudete Sunday",
                    link: "/liturgy/liturgical-year/seasons/advent/gaudete-sunday",
                  },
                ],
              },
              {
                title: "Christmastide",
                link: "/liturgy/liturgical-year/seasons/christmastide",
                children: [
                  {
                    title: "Christmas Day",
                    link: "/liturgy/liturgical-year/seasons/christmastide/christmas-day",
                  },
                  {
                    title: "The Holy Innocents",
                    link: "/liturgy/liturgical-year/seasons/christmastide/holy-innocents",
                  },
                  {
                    title: "Circumcision and Holy Name of Jesus",
                    link: "/liturgy/liturgical-year/seasons/christmastide/circumcision-and-holy-name-of-jesus",
                  },
                ],
              },
              {
                title: "Epiphanytide",
                link: "/liturgy/liturgical-year/seasons/epiphanytide",
                children: [
                  {
                    title: "The Epiphany",
                    link: "/liturgy/liturgical-year/seasons/epiphanytide/epiphany",
                  },
                  {
                    title: "Presentation of the Lord",
                    link: "/liturgy/liturgical-year/seasons/epiphanytide/presentation-of-the-lord",
                  },
                ],
              },
              {
                title: "Pre-Lent",
                link: "/liturgy/liturgical-year/seasons/pre-lent",
                children: [
                  {
                    title: "Septuagesima",
                    link: "/liturgy/liturgical-year/seasons/pre-lent/septuagesima",
                  },
                  {
                    title: "Sexagesima",
                    link: "/liturgy/liturgical-year/seasons/pre-lent/sexagesima",
                  },
                  {
                    title: "Quinquagesima",
                    link: "/liturgy/liturgical-year/seasons/pre-lent/quinquagesima",
                  },
                ],
              },
              {
                title: "Lent",
                link: "/liturgy/liturgical-year/seasons/lent",
                children: [
                  {
                    title: "Ash Wednesday",
                    link: "/liturgy/liturgical-year/seasons/lent/ash-wednesday",
                  },
                  {
                    title: "Laetare Sunday",
                    link: "/liturgy/liturgical-year/seasons/lent/laetare-sunday",
                  },
                  {
                    title: "Passiontide",
                    link: "/liturgy/liturgical-year/seasons/lent/passiontide",
                    children: [
                      {
                        title: "Passion Sunday",
                        link: "/liturgy/liturgical-year/seasons/lent/passiontide/passion-sunday",
                      },
                      {
                        title: "Palm Sunday",
                        link: "/liturgy/liturgical-year/seasons/lent/passiontide/palm-sunday",
                      },
                      {
                        title: "Monday of Holy Week",
                        link: "/liturgy/liturgical-year/seasons/lent/passiontide/holy-monday",
                      },
                      {
                        title: "Tuesday of Holy Week",
                        link: "/liturgy/liturgical-year/seasons/lent/passiontide/holy-tuesday",
                      },
                      {
                        title: "Wednesday of Holy Week",
                        link: "/liturgy/liturgical-year/seasons/lent/passiontide/holy-wednesday",
                      },
                      {
                        title: "Maundy Thursday",
                        link: "/liturgy/liturgical-year/seasons/lent/passiontide/maundy-thursday",
                      },
                      {
                        title: "Good Friday",
                        link: "/liturgy/liturgical-year/seasons/lent/passiontide/good-friday",
                      },
                      {
                        title: "Holy Saturday",
                        link: "/liturgy/liturgical-year/seasons/lent/passiontide/holy-saturday",
                      },
                    ],
                  },
                ],
              },
              {
                title: "Eastertide",
                link: "/liturgy/liturgical-year/seasons/eastertide",
                children: [
                  {
                    title: "Easter Vigil",
                    link: "/liturgy/liturgical-year/seasons/eastertide/easter-vigil",
                  },
                  {
                    title: "Easter Day",
                    link: "/liturgy/liturgical-year/seasons/eastertide/easter-day",
                  },
                  {
                    title: "Second Sunday of Easter",
                    link: "/liturgy/liturgical-year/seasons/eastertide/second-sunday-of-easter",
                  },
                  {
                    title: "Annunciation of the Lord",
                    link: "/liturgy/liturgical-year/seasons/eastertide/annunciation",
                  },
                  {
                    title: "Ascensiontide",
                    link: "/liturgy/liturgical-year/seasons/eastertide/ascensiontide",
                    children: [
                      {
                        title: "Ascension Day",
                        link: "/liturgy/liturgical-year/seasons/eastertide/ascensiontide/ascension-day",
                      },
                    ],
                  },
                ],
              },
              {
                title: "Whitsuntide",
                link: "/liturgy/liturgical-year/seasons/whitsuntide",
                children: [
                  {
                    title: "Pentecost (Whitsunday)",
                    link: "/liturgy/liturgical-year/seasons/whitsuntide/pentecost",
                  },
                ],
              },
              {
                title: "Trinitytide",
                link: "/liturgy/liturgical-year/seasons/trinitytide",
                children: [
                  {
                    title: "Trinity Sunday",
                    link: "/liturgy/liturgical-year/seasons/trinitytide/trinity-sunday",
                  },
                  {
                    title: "Corpus Christi",
                    link: "/liturgy/liturgical-year/seasons/trinitytide/corpus-christi",
                  },
                  {
                    title: "Visitation of the Blessed Virgin Mary",
                    link: "/liturgy/liturgical-year/seasons/trinitytide/visitation",
                  },
                  {
                    title: "Transfiguration of the Lord",
                    link: "/liturgy/liturgical-year/seasons/trinitytide/transfiguration",
                  },
                  {
                    title: "Nativity of the Blessed Virgin Mary",
                    link: "/liturgy/liturgical-year/seasons/trinitytide/nativity-of-the-blessed-virgin-mary",
                  },
                  {
                    title: "Holy Cross Day",
                    link: "/liturgy/liturgical-year/seasons/trinitytide/holy-cross-day",
                  },
                  {
                    title: "Allhallowtide",
                    link: "/liturgy/liturgical-year/seasons/trinitytide/allhallowtide",
                    children: [
                      {
                        title: "All Hallows' Eve",
                        link: "/liturgy/liturgical-year/seasons/trinitytide/allhallowtide/all-hallows-eve",
                      },
                      {
                        title: "All Saints' Day",
                        link: "/liturgy/liturgical-year/seasons/trinitytide/allhallowtide/all-saints-day",
                      },
                      {
                        title: "All Souls' Day",
                        link: "/liturgy/liturgical-year/seasons/trinitytide/allhallowtide/all-souls-day",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: "Ranking",
            link: "/liturgy/liturgical-year/ranking",
            priority: 0.6,
            inPageNav: true,
          },
          {
            title: "Commentary",
            link: "/liturgy/liturgical-year/commentary",
            priority: 0.6,
          },
        ],
      },
      {
        title: "Daily Office",
        link: "/liturgy/daily-office",
        priority: 0.7,
        children: [
          {
            title: "Preface",
            link: "/liturgy/daily-office/preface",
          },
          {
            title: "Ordinary",
            link: "/liturgy/daily-office/ordinary",
            inPageNav: true,
          },
          {
            title: "Morning Prayer",
            link: "/liturgy/daily-office/morning-prayer",
          },
          {
            title: "Evening Prayer",
            link: "/liturgy/daily-office/evening-prayer",
          },
          {
            title: "Lectionary",
            link: "/liturgy/daily-office/lectionary",
          },
          {
            title: "Chant Rubrics",
            link: "/liturgy/daily-office/chant-rubrics",
            inPageNav: true,
          },
          {
            title: "Psalter",
            link: "/liturgy/daily-office/psalter",
            inPageNav: true,
          },
        ],
      },
      {
        title: "Rites",
        link: "/liturgy/rites",
        priority: 0.7,
        children: [
          {
            title: "Roman Rite",
            link: "/liturgy/rites/roman-rite",
            priority: 0.6,
            children: [
              {
                title: "Mass",
                link: "/liturgy/rites/roman-rite/mass",
                inPageNav: true,
              },
            ],
          },
          {
            title: "Benedictine Rite",
            link: "/liturgy/rites/benedictine-rite",
            priority: 0.6,
            children: [
              {
                title: "Liturgy of the Hours",
                link: "/liturgy/rites/benedictine-rite/liturgy-of-the-hours",
                inPageNav: true,
              },
            ],
          },
          {
            title: "Sarum Rite",
            link: "/liturgy/rites/sarum-rite",
            priority: 0.6,
            children: [
              {
                title: "Liturgy of the Hours",
                link: "/liturgy/rites/sarum-rite/liturgy-of-the-hours",
                inPageNav: true,
              },
            ],
          },
          {
            title: "Book of Common Prayer",
            link: "/liturgy/rites/book-of-common-prayer",
            priority: 0.6,
            children: [
              {
                title: "Matins",
                link: "/liturgy/rites/book-of-common-prayer/matins",
                inPageNav: true,
              },
              {
                title: "Evensong",
                link: "/liturgy/rites/book-of-common-prayer/evensong",
                inPageNav: true,
              },
            ],
          },
        ],
      },
      {
        title: "Prayers",
        link: "/liturgy/prayers",
        priority: 0.7,
        children: [
          {
            title: "Sign of the Cross",
            link: "/liturgy/prayers/sign-of-the-cross",
          },
          {
            title: "Our Father",
            link: "/liturgy/prayers/our-father",
          },
          {
            title: "Glory Be",
            link: "/liturgy/prayers/glory-be",
          },
          {
            title: "Jesus Prayer",
            link: "/liturgy/prayers/jesus-prayer",
          },
          {
            title: "Hail Mary",
            link: "/liturgy/prayers/hail-mary",
          },
          {
            title: "Hail Holy Queen",
            link: "/liturgy/prayers/hail-holy-queen",
          },
          {
            title: "O My Jesus",
            link: "/liturgy/prayers/o-my-jesus",
          },
          {
            title: "Rosary",
            link: "/liturgy/prayers/rosary",
          },
          {
            title: "Luther Morning Prayer",
            link: "/liturgy/prayers/luther-morning-prayer",
          },
          {
            title: "Luther Evening Prayer",
            link: "/liturgy/prayers/luther-evening-prayer",
          },
        ],
      },
      {
        title: "Creeds",
        link: "/liturgy/creeds",
        priority: 0.7,
        children: [
          {
            title: "Apostles' Creed",
            link: "/liturgy/creeds/apostles-creed",
          },
          {
            title: "Nicene Creed",
            link: "/liturgy/creeds/nicene-creed",
          },
          {
            title: "Niceno-Constantinopolitan Creed",
            link: "/liturgy/creeds/niceno-constantinopolitan-creed",
          },
          {
            title: "Chalcedonian Creed",
            link: "/liturgy/creeds/chalcedonian-creed",
          },
          {
            title: "Nicene Creed with Filioque",
            link: "/liturgy/creeds/nicene-creed-with-filioque",
          },
          {
            title: "Athanasian Creed",
            link: "/liturgy/creeds/athanasian-creed",
          },
        ],
      },

      {
        title: "Music",
        link: "/liturgy/music",
        priority: 0.7,
        children: [
          {
            title: "Chants",
            link: "/liturgy/music/chants",
            priority: 0.6,
            children: [
              {
                title: "Agnus Dei",
                link: "/liturgy/music/chants/agnus-dei",
              },
              {
                title: "Alleluia",
                link: "/liturgy/music/chants/alleluia",
              },
              {
                title: "Alleluia confitemini",
                link: "/liturgy/music/chants/alleluia-confitemini",
              },
              {
                title: "Benedicamus",
                link: "/liturgy/music/chants/benedicamus",
              },
              {
                title: "Benedicite",
                link: "/liturgy/music/chants/benedicite",
              },
              {
                title: "Benedictus",
                link: "/liturgy/music/chants/benedictus",
              },
              {
                title: "Credo",
                link: "/liturgy/music/chants/credo",
              },
              {
                title: "Deus in adjutorium",
                link: "/liturgy/music/chants/deus-in-adjutorium",
              },
              {
                title: "Domine labia mea",
                link: "/liturgy/music/chants/domine-labia-mea",
              },
              {
                title: "Facta est cum Angelo",
                link: "/liturgy/music/chants/facta-est-cum-angelo",
              },
              {
                title: "Gloria",
                link: "/liturgy/music/chants/gloria",
              },
              {
                title: "Gloria Patri",
                link: "/liturgy/music/chants/gloria-patri",
              },
              {
                title: "Iste pauper",
                link: "/liturgy/music/chants/iste-pauper",
              },
              {
                title: "Kyrie",
                link: "/liturgy/music/chants/kyrie",
              },
              {
                title: "Magnificat",
                link: "/liturgy/music/chants/magnificat",
              },
              {
                title: "Multitudo languentium",
                link: "/liturgy/music/chants/multitudo-languentium",
              },
              {
                title: "Nunc dimittis",
                link: "/liturgy/music/chants/nunc-dimittis",
              },
              {
                title: "O Adonai",
                link: "/liturgy/music/chants/o-adonai",
              },
              {
                title: "O Clavis David",
                link: "/liturgy/music/chants/o-clavis-david",
              },
              {
                title: "O Emmanuel",
                link: "/liturgy/music/chants/o-emmanuel",
              },
              {
                title: "O Oriens",
                link: "/liturgy/music/chants/o-oriens",
              },
              {
                title: "O Radix Jesse",
                link: "/liturgy/music/chants/o-radix-jesse",
              },
              {
                title: "O Rex gentium",
                link: "/liturgy/music/chants/o-rex-gentium",
              },
              {
                title: "O Sapientia",
                link: "/liturgy/music/chants/o-sapientia",
              },
              {
                title: "O Virgo virginum",
                link: "/liturgy/music/chants/o-virgo-virginum",
              },
              {
                title: "Pascha nostrum",
                link: "/liturgy/music/chants/pascha-nostrum",
              },
              {
                title: "Salva nos Domine",
                link: "/liturgy/music/chants/salva-nos-domine",
              },
              {
                title: "Sanctus",
                link: "/liturgy/music/chants/sanctus",
              },
              {
                title: "Song of Habakkuk",
                link: "/liturgy/music/chants/song-of-habakkuk",
              },
              {
                title: "Song of Hannah",
                link: "/liturgy/music/chants/song-of-hannah",
              },
              {
                title: "Song of Hezekiah",
                link: "/liturgy/music/chants/song-of-hezekiah",
              },
              {
                title: "Song of Isaiah",
                link: "/liturgy/music/chants/song-of-isaiah",
              },
              {
                title: "Song of Moses from Deut., Pt. 1",
                link: "/liturgy/music/chants/song-of-moses-deut-pt-1",
              },
              {
                title: "Song of Moses from Deut., Pt. 2",
                link: "/liturgy/music/chants/song-of-moses-deut-pt-2",
              },
              {
                title: "Song of Moses from Exod.",
                link: "/liturgy/music/chants/song-of-moses-exod",
              },
              {
                title: "Te decet laus",
                link: "/liturgy/music/chants/te-decet-laus",
              },
              {
                title: "Te Deum",
                link: "/liturgy/music/chants/te-deum",
              },
              {
                title: "Veni Sancte Spiritus",
                link: "/liturgy/music/chants/veni-sancte-spiritus",
              },
              {
                title: "Venite",
                link: "/liturgy/music/chants/venite",
              },
              {
                title: "Victimae paschali laudes",
                link: "/liturgy/music/chants/victimae-paschali-laudes",
              },
            ],
          },
          {
            title: "Hymns",
            link: "/liturgy/music/hymns",
            priority: 0.6,
            children: [
              {
                title: "40 Days and 40 Nights",
                link: "/liturgy/music/hymns/40-days-and-40-nights",
              },
              {
                title: "A Mighty Fortress Is Our God",
                link: "/liturgy/music/hymns/a-mighty-fortress-Is-our-god",
              },
              {
                title: "Abendlied",
                link: "/liturgy/music/hymns/abendlied",
              },
              {
                title: "Again We Keep This Solemn Fast",
                link: "/liturgy/music/hymns/again-we-keep-this-solemn-fast",
              },
              {
                title: "All Creatures of Our God and King",
                link: "/liturgy/music/hymns/all-creatures-of-our-god-and-king",
              },
              {
                title: "Amazing Grace",
                link: "/liturgy/music/hymns/amazing-grace",
              },
              {
                title: "Angels from the Realms of Glory",
                link: "/liturgy/music/hymns/angels-from-the-realms-of-glory",
              },
              {
                title: "Angels We Have Heard on High",
                link: "/liturgy/music/hymns/angels-we-have-heard-on-high",
              },
              {
                title: "Away in a Manger",
                link: "/liturgy/music/hymns/away-in-a-manger",
              },
              {
                title: "Be Still My Soul",
                link: "/liturgy/music/hymns/be-still-my-soul",
              },
              {
                title: "Be Thou My Vision",
                link: "/liturgy/music/hymns/be-thou-my-vision",
              },
              {
                title: "Blessed Assurance",
                link: "/liturgy/music/hymns/blessed-assurance",
              },
              {
                title: "Christ the Lord Is Risen Today",
                link: "/liturgy/music/hymns/christ-the-lord-is-risen-today",
              },
              {
                title: "Come, Thou Long Expected Jesus",
                link: "/liturgy/music/hymns/come-thou-long-expected-jesus",
              },
              {
                title: "Come, Thou Redeemer of the Earth",
                link: "/liturgy/music/hymns/come-thou-redeemer-of-the-earth",
              },
              {
                title: "Crown Him with Many Crowns",
                link: "/liturgy/music/hymns/crown-him-with-many-crowns",
              },
              {
                title: "For All the Saints",
                link: "/liturgy/music/hymns/for-all-the-saints",
              },
              {
                title: "For the Beauty of the Earth",
                link: "/liturgy/music/hymns/for-the-beauty-of-the-earth",
              },
              {
                title: "From Heaven Above to Earth I Come",
                link: "/liturgy/music/hymns/from-heaven-above-to-earth-i-come",
              },
              {
                title: "Go, Tell It on the Mountain",
                link: "/liturgy/music/hymns/go-tell-it-on-the-mountain",
              },
              {
                title: "God Rest Ye Merry Gentlemen",
                link: "/liturgy/music/hymns/god-rest-ye-merry-gentlemen",
              },
              {
                title: "Haleluhu",
                link: "/liturgy/music/hymns/haleluhu",
              },
              {
                title: "Hark! The Herald Angels Sing",
                link: "/liturgy/music/hymns/hark-the-herald-angels-sing",
              },
              {
                title: "Here I Am, Lord",
                link: "/liturgy/music/hymns/here-i-am-lord",
              },
              {
                title: "Hosanna, Loud Hosanna",
                link: "/liturgy/music/hymns/hosanna-loud-hosanna",
              },
              {
                title: "How Firm a Foundation",
                link: "/liturgy/music/hymns/how-firm-a-foundation",
              },
              {
                title: "I Surrender All",
                link: "/liturgy/music/hymns/i-surrender-all",
              },
              {
                title: "I Want to Walk as a Child of the Light",
                link: "/liturgy/music/hymns/i-want-to-walk-as-a-child-of-the-light",
              },
              {
                title: "In the Garden",
                link: "/liturgy/music/hymns/in-the-garden",
              },
              {
                title: "It Is Well with My Soul",
                link: "/liturgy/music/hymns/it-is-well-with-my-soul",
              },
              {
                title: "Jesu, Joy of Man's Desiring",
                link: "/liturgy/music/hymns/jesu-joy-of-mans-desiring",
              },
              {
                title: "Jesus Christ Is Risen Today",
                link: "/liturgy/music/hymns/jesus-christ-is-risen-today",
              },
              {
                title: "Jesus Loves Me",
                link: "/liturgy/music/hymns/jesus-loves-me",
              },
              {
                title: "Joy to the World",
                link: "/liturgy/music/hymns/joy-to-the-world",
              },
              {
                title: "Just as I Am",
                link: "/liturgy/music/hymns/just-as-i-am",
              },
              {
                title: "Let There Be Peace On Earth",
                link: "/liturgy/music/hymns/let-there-be-peace-on-earth",
              },
              {
                title: "Lift High the Cross",
                link: "/liturgy/music/hymns/lift-high-the-cross",
              },
              {
                title: "Lord Jesus, Think on Me",
                link: "/liturgy/music/hymns/lord-jesus-think-on-me",
              },
              {
                title: "Lord, Who Throughout These Forty Days",
                link: "/liturgy/music/hymns/lord-who-throughout-these-forty-days",
              },
              {
                title: "Love Came Down at Christmas",
                link: "/liturgy/music/hymns/love-came-down-at-christmas",
              },
              {
                title: "Morning Has Broken",
                link: "/liturgy/music/hymns/morning-has-broken",
              },
              {
                title: "Now Thank We All Our God",
                link: "/liturgy/music/hymns/now-thank-we-all-our-god",
              },
              {
                title: "O Come, All Ye Faithful",
                link: "/liturgy/music/hymns/o-come-all-ye-faithful",
              },
              {
                title: "O Come, O Come, Emmanuel",
                link: "/liturgy/music/hymns/o-come-o-come-emmanuel",
              },
              {
                title: "O Holy Night",
                link: "/liturgy/music/hymns/o-holy-night",
              },
              {
                title: "O How I Love Jesus",
                link: "/liturgy/music/hymns/o-how-i-love-jesus",
              },
              {
                title: "O Little Town of Bethlehem",
                link: "/liturgy/music/hymns/o-little-town-of-bethlehem",
              },
              {
                title: "O for a Thousand Tongues to Sing",
                link: "/liturgy/music/hymns/o-for-a-thousand-tongues-to-sing",
              },
              {
                title: "Praise God, from Whom All Blessings Flow",
                link: "/liturgy/music/hymns/praise-god-from-whom-all-blessings-flow",
              },
              {
                title: "Praise to the Lord, the Almighty",
                link: "/liturgy/music/hymns/praise-to-the-lord-the-almighty",
              },
              {
                title: "Praise My Soul, the King of Heaven",
                link: "/liturgy/music/hymns/praise-my-soul-the-king-of-heaven",
              },
              {
                title: "Silent Night",
                link: "/liturgy/music/hymns/silent-night",
              },
              {
                title: "Softly and Tenderly",
                link: "/liturgy/music/hymns/softly-and-tenderly",
              },
              {
                title: "Spirit of the Living God",
                link: "/liturgy/music/hymns/spirit-of-the-living-god",
              },
              {
                title: "Take up Thy Cross, the Savior Said",
                link: "/liturgy/music/hymns/take-up-thy-cross-the-savior-said",
              },
              {
                title: "The First Noel",
                link: "/liturgy/music/hymns/the-first-noel",
              },
              {
                title: "Thine Be the Glory",
                link: "/liturgy/music/hymns/thine-be-the-glory",
              },
              {
                title: "Unto Us Is Born a Son",
                link: "/liturgy/music/hymns/unto-us-is-born-a-son",
              },
              {
                title: "We Three Kings",
                link: "/liturgy/music/hymns/we-three-kings",
              },
              {
                title: "What a Friend We Have in Jesus",
                link: "/liturgy/music/hymns/what-a-friend-we-have-in-jesus",
              },
              {
                title: "Where He Leads Me",
                link: "/liturgy/music/hymns/where-he-leads-me",
              },
            ],
          },
          {
            title: "Songs",
            link: "/liturgy/music/songs",
            priority: 0.6,
            children: [
              {
                title: "Good King Wenceslas",
                link: "/liturgy/music/songs/good-king-wenceslas",
              },
              {
                title: "Handel's Messiah",
                link: "/liturgy/music/songs/handels-messiah",
              },
              {
                title: "Here We Come A-Wassailing",
                link: "/liturgy/music/songs/here-we-come-a-wassailing",
              },
              {
                title: "Hey, Ho, Nobody Home",
                link: "/liturgy/music/songs/hey-ho-nobody-home",
              },
              {
                title: "Souling Song",
                link: "/liturgy/music/songs/souling-song",
              },
              {
                title: "The Holly and the Ivy",
                link: "/liturgy/music/songs/the-holly-and-the-ivy",
              },
            ],
          },
          {
            title: "Composers",
            link: "/liturgy/music/composers",
            priority: 0.6,
            children: [
              {
                title: "Anna Bartlett Warner",
                link: "/liturgy/music/composers/anna-bartlett-warner",
              },
              {
                title: "Charles Austin Miles",
                link: "/liturgy/music/composers/charles-austin-miles",
              },
              {
                title: "Charles Jennens",
                link: "/liturgy/music/composers/charles-jennens",
              },
              {
                title: "Charles W. Everest",
                link: "/liturgy/music/composers/charles-w-everest",
              },
              {
                title: "Charles Wesley",
                link: "/liturgy/music/composers/charles-wesley",
              },
              {
                title: "Charlotte Elliott",
                link: "/liturgy/music/composers/charlotte-elliott",
              },
              {
                title: "Christina Rossetti",
                link: "/liturgy/music/composers/christina-rosetti",
              },
              {
                title: "Claudia Frances Hernaman",
                link: "/liturgy/music/composers/claudia-frances-hernaman",
              },
              {
                title: "Dallán Forgaill",
                link: "/liturgy/music/composers/dallan-forgaill",
              },
              {
                title: "Dan Schutte",
                link: "/liturgy/music/composers/dan-schutte",
              },
              {
                title: "Daniel Iverson",
                link: "/liturgy/music/composers/daniel-iverson",
              },
              {
                title: "Edmond Louis Budry",
                link: "/liturgy/music/composers/edmond-louis-budry",
              },
              {
                title: "Eleanor Farjeon",
                link: "/liturgy/music/composers/eleanor-farjeon",
              },
              {
                title: "Ernest W. Blandy",
                link: "/liturgy/music/composers/ernest-w-blandy",
              },
              {
                title: "Fanny Crosby",
                link: "/liturgy/music/composers/fanny-crosby",
              },
              {
                title: "Folliott Sandford Pierpoint",
                link: "/liturgy/music/composers/folliott-sandford-pierpoint",
              },
              {
                title: "Frederick Whitfield",
                link: "/liturgy/music/composers/frederick-whitfield",
              },
              {
                title: "George Frideric Handel",
                link: "/liturgy/music/composers/george-frideric-handel",
              },
              {
                title: "George Hunt Smyttan",
                link: "/liturgy/music/composers/george-hunt-smyttan",
              },
              {
                title: "George Kitchin",
                link: "/liturgy/music/composers/george-kitchin",
              },
              {
                title: "Henry Francis Lyte",
                link: "/liturgy/music/composers/henry-francis-lyte",
              },
              {
                title: "Horatio Spafford",
                link: "/liturgy/music/composers/horatio-spafford",
              },
              {
                title: "Isaac Watts",
                link: "/liturgy/music/composers/isaac-watts",
              },
              {
                title: "James Chadwick",
                link: "/liturgy/music/composers/james-chadwick",
              },
              {
                title: "James Montgomery",
                link: "/liturgy/music/composers/james-montgomery",
              },
              {
                title: "Jeanette Threlfall",
                link: "/liturgy/music/composers/jeanette-threlfall",
              },
              {
                title: "Jill Jackson-Miller",
                link: "/liturgy/music/composers/jill-jackson-miller",
              },
              {
                title: "Joachim Neander",
                link: "/liturgy/music/composers/joachim-neander",
              },
              {
                title: "Johann Sebastian Bach's",
                link: "/liturgy/music/composers/johann-sebastian-bach",
              },
              {
                title: "John Francis Wade",
                link: "/liturgy/music/composers/john-francis-wade",
              },
              {
                title: "John Henry Hopkins Jr.",
                link: "/liturgy/music/composers/john-henry-hopkins-jr",
              },
              {
                title: "John Mason Neale",
                link: "/liturgy/music/composers/john-mason-neale",
              },
              {
                title: "John Newton",
                link: "/liturgy/music/composers/john-newton",
              },
              {
                title: "Josef Rheinberger",
                link: "/liturgy/music/composers/josef-rheinberger",
              },
              {
                title: "Joseph M. Scriven",
                link: "/liturgy/music/composers/joseph-m-scriven",
              },
              {
                title: "Joseph Mohr",
                link: "/liturgy/music/composers/joseph-mohr",
              },
              {
                title: "Judson W. Van DeVenter",
                link: "/liturgy/music/composers/judson-w-van-deventer",
              },
              {
                title: "Kathleen Thomerson",
                link: "/liturgy/music/composers/kathleen-thomerson",
              },
              {
                title: "Katharina von Schlegel",
                link: "/liturgy/music/composers/katharina-von-schlegel",
              },
              {
                title: "Martin Rinkart",
                link: "/liturgy/music/composers/martin-rinkart",
              },
              {
                title: "Matthew Bridges",
                link: "/liturgy/music/composers/matthew-bridges",
              },
              {
                title: "Phillips Brooks",
                link: "/liturgy/music/composers/phillips-brooks",
              },
              {
                title: "Placide Cappeau",
                link: "/liturgy/music/composers/placide-cappeau",
              },
              {
                title: "Sy Miller",
                link: "/liturgy/music/composers/sy-miller",
              },
              {
                title: "Synesius of Cyrene",
                link: "/liturgy/music/composers/synesius-of-cyrene",
              },
              {
                title: "Thomas Helmore",
                link: "/liturgy/music/composers/thomas-helmore",
              },
              {
                title: "Thomas Ken",
                link: "/liturgy/music/composers/thomas-ken",
              },
              {
                title: "Will L. Thompson",
                link: "/liturgy/music/composers/will-l-thompson",
              },
              {
                title: "William W. How",
                link: "/liturgy/music/composers/william-w-how",
              },
            ],
          },
        ],
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
                title: "Blessed Virgin Mary",
                link: "/people/saints/biblical/blessed-virgin-mary",
              },
              {
                title: "Joachim and Anne",
                link: "/people/saints/biblical/joachim-and-anne",
              },
              {
                title: "John the Baptist",
                link: "/people/saints/biblical/john-the-baptist",
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
                title: "Joseph of Nazareth",
                link: "/people/saints/biblical/joseph-of-nazareth",
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
                title: "Agnes of Rome",
                link: "/people/saints/early/agnes-of-rome",
              },
              {
                title: "Catherine of Alexandria",
                link: "/people/saints/early/catherine-of-alexandria",
              },
              {
                title: "Cecilia of Rome",
                link: "/people/saints/early/cecilia-of-rome",
              },
              {
                title: "Christopher of Lycia",
                link: "/people/saints/early/christopher-of-lycia",
              },
              {
                title: "Denis of Peris",
                link: "/people/saints/early/denis-of-peris",
              },
              {
                title: "Epiphanius of Salamis",
                link: "/people/saints/early/epiphanius-of-salamis",
              },
              {
                title: "George of Lydda",
                link: "/people/saints/early/george-of-lydda",
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
                title: "Lawrence of Rome",
                link: "/people/saints/early/lawrence-of-rome",
              },
              {
                title: "Lucy of Syracuse",
                link: "/people/saints/early/lucy-of-syracuse",
              },
              {
                title: "Martin of Tours",
                link: "/people/saints/early/martin-of-tours",
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
                title: "Perpetua and Felicity",
                link: "/people/saints/early/perpetua-and-felicity",
              },
              {
                title: "Valentine of Rome",
                link: "/people/saints/early/valentine-of-rome",
              },
              {
                title: "Vincent of Saragossa",
                link: "/people/saints/early/vincent-of-saragossa",
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
                title: "Augustine of Canterbury",
                link: "/people/saints/medieval/augustine-of-canterbury",
              },
              {
                title: "Bede the Venerable",
                link: "/people/saints/medieval/bede-the-venerable",
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
                title: "Boniface",
                link: "/people/saints/medieval/boniface",
              },
              {
                title: "Clare of Assisi",
                link: "/people/saints/medieval/clare-of-assisi",
              },
              {
                title: "Dominic of Guzmán",
                link: "/people/saints/medieval/dominic-of-guzman",
              },
              {
                title: "Dunstan of Canterbury",
                link: "/people/saints/medieval/dunstan-of-canterbury",
              },
              {
                title: "Elizabeth of Hungary",
                link: "/people/saints/medieval/elizabeth-of-hungary",
              },
              {
                title: "Francis of Assisi",
                link: "/people/saints/medieval/francis-of-assisi",
              },
              {
                title: "Gregory of Tours",
                link: "/people/saints/medieval/gregory-of-tours",
              },
              {
                title: "Margaret of Scotland",
                link: "/people/saints/medieval/margaret-of-scotland",
              },
              {
                title: "Scholastica of Nursia",
                link: "/people/saints/medieval/scholastica-of-nursia",
              },
              {
                title: "Thomas Aquinas",
                link: "/people/saints/medieval/thomas-aquinas",
              },
              {
                title: "Thomas Becket",
                link: "/people/saints/medieval/thomas-becket",
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
            title: "Zebulun",
            link: "/people/twelve-tribes-of-israel/zebulun",
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
      {
        title: "Historical Terms",
        link: "/glossary/historical-terms",
        inPageNav: true,
      },
    ],
  },
];
