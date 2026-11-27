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
    title: "Church",
    link: "/church",
    priority: 0.8,
    children: [
      {
        title: "Liturgical Year",
        link: "/church/liturgical-year",
        priority: 0.7,
        children: [
          {
            title: "Preface",
            link: "/church/liturgical-year/preface",
            priority: 0.6,
          },
          {
            title: "Calendar",
            link: "/church/liturgical-year/calendar",
            priority: 0.6,
          },
          {
            title: "Proper of Seasons",
            link: "/church/liturgical-year/seasons",
            priority: 0.6,
            children: [
              {
                title: "Advent",
                link: "/church/liturgical-year/seasons/advent",
                children: [
                  {
                    title: "Advent Wreath",
                    link: "/church/liturgical-year/seasons/advent/advent-wreath",
                  },
                  {
                    title: "Gaudete Sunday",
                    link: "/church/liturgical-year/seasons/advent/gaudete-sunday",
                  },
                  {
                    title: "Ember Days in Advent",
                    link: "/church/liturgical-year/seasons/advent/ember-days-in-advent",
                  },
                  {
                    title: "O Antiphons",
                    link: "/church/liturgical-year/seasons/advent/o-antiphons",
                  },
                ],
              },
              {
                title: "Christmastide",
                link: "/church/liturgical-year/seasons/christmastide",
                children: [
                  {
                    title: "Christmas Day",
                    link: "/church/liturgical-year/seasons/christmastide/christmas-day",
                  },
                  {
                    title: "Saint Stephen",
                    link: "/church/liturgical-year/seasons/christmastide/stephen",
                  },
                  {
                    title: "Saint John",
                    link: "/church/liturgical-year/seasons/christmastide/john",
                  },
                  {
                    title: "The Holy Innocents",
                    link: "/church/liturgical-year/seasons/christmastide/holy-innocents",
                  },
                  {
                    title: "The Circumcision of Christ",
                    link: "/church/liturgical-year/seasons/christmastide/circumcision-of-christ",
                  },
                ],
              },
              {
                title: "Epiphanytide",
                link: "/church/liturgical-year/seasons/epiphanytide",
                children: [
                  {
                    title: "The Epiphany",
                    link: "/church/liturgical-year/seasons/epiphanytide/epiphany",
                  },
                  {
                    title: "The Purification",
                    link: "/church/liturgical-year/seasons/epiphanytide/purification",
                  },
                ],
              },
              {
                title: "Pre-Lent",
                link: "/church/liturgical-year/seasons/pre-lent",
                children: [
                  {
                    title: "Septuagesima",
                    link: "/church/liturgical-year/seasons/pre-lent/septuagesima",
                  },
                  {
                    title: "Sexagesima",
                    link: "/church/liturgical-year/seasons/pre-lent/sexagesima",
                  },
                  {
                    title: "Quinquagesima",
                    link: "/church/liturgical-year/seasons/pre-lent/quinquagesima",
                  },
                ],
              },
              {
                title: "Lent",
                link: "/church/liturgical-year/seasons/lent",
                children: [
                  {
                    title: "Ash Wednesday",
                    link: "/church/liturgical-year/seasons/lent/ash-wednesday",
                  },
                  {
                    title: "Ember Days in Lent",
                    link: "/church/liturgical-year/seasons/lent/ember-days-in-lent",
                  },
                  {
                    title: "Laetare Sunday",
                    link: "/church/liturgical-year/seasons/lent/laetare-sunday",
                  },
                  {
                    title: "The Annunciation",
                    link: "/church/liturgical-year/seasons/lent/annunciation",
                  },
                  {
                    title: "Passiontide",
                    link: "/church/liturgical-year/seasons/lent/passiontide",
                    children: [
                      {
                        title: "Passion Sunday",
                        link: "/church/liturgical-year/seasons/lent/passiontide/passion-sunday",
                      },
                      {
                        title: "Palm Sunday",
                        link: "/church/liturgical-year/seasons/lent/passiontide/palm-sunday",
                      },
                      {
                        title: "Monday of Holy Week",
                        link: "/church/liturgical-year/seasons/lent/passiontide/holy-monday",
                      },
                      {
                        title: "Tuesday of Holy Week",
                        link: "/church/liturgical-year/seasons/lent/passiontide/holy-tuesday",
                      },
                      {
                        title: "Wednesday of Holy Week",
                        link: "/church/liturgical-year/seasons/lent/passiontide/holy-wednesday",
                      },
                      {
                        title: "Maundy Thursday",
                        link: "/church/liturgical-year/seasons/lent/passiontide/maundy-thursday",
                      },
                      {
                        title: "Good Friday",
                        link: "/church/liturgical-year/seasons/lent/passiontide/good-friday",
                      },
                      {
                        title: "Holy Saturday",
                        link: "/church/liturgical-year/seasons/lent/passiontide/holy-saturday",
                      },
                    ],
                  },
                ],
              },
              {
                title: "Eastertide",
                link: "/church/liturgical-year/seasons/eastertide",
                children: [
                  {
                    title: "Easter Vigil",
                    link: "/church/liturgical-year/seasons/eastertide/easter-vigil",
                  },
                  {
                    title: "Easter Day",
                    link: "/church/liturgical-year/seasons/eastertide/easter-day",
                  },
                  {
                    title: "Second Sunday of Easter",
                    link: "/church/liturgical-year/seasons/eastertide/second-sunday-of-easter",
                  },
                  {
                    title: "Rogation Days",
                    link: "/church/liturgical-year/seasons/eastertide/rogation-days",
                  },
                  {
                    title: "Ascensiontide",
                    link: "/church/liturgical-year/seasons/eastertide/ascensiontide",
                    children: [
                      {
                        title: "Ascension Day",
                        link: "/church/liturgical-year/seasons/eastertide/ascensiontide/ascension-day",
                      },
                    ],
                  },
                ],
              },
              {
                title: "Whitsuntide",
                link: "/church/liturgical-year/seasons/whitsuntide",
                children: [
                  {
                    title: "Pentecost (Whitsunday)",
                    link: "/church/liturgical-year/seasons/whitsuntide/pentecost",
                  },
                  {
                    title: "Ember Days in Whitsuntide",
                    link: "/church/liturgical-year/seasons/whitsuntide/ember-days-in-whitsuntide",
                  },
                ],
              },
              {
                title: "Trinitytide",
                link: "/church/liturgical-year/seasons/trinitytide",
                children: [
                  {
                    title: "Trinity Sunday",
                    link: "/church/liturgical-year/seasons/trinitytide/trinity-sunday",
                  },
                  {
                    title: "Corpus Christi",
                    link: "/church/liturgical-year/seasons/trinitytide/corpus-christi",
                  },
                  {
                    title: "The Visitation",
                    link: "/church/liturgical-year/seasons/trinitytide/visitation",
                  },
                  {
                    title: "The Transfiguration of Christ",
                    link: "/church/liturgical-year/seasons/trinitytide/transfiguration",
                  },
                  {
                    title: "The Holy Name of Jesus",
                    link: "/church/liturgical-year/seasons/trinitytide/holy-name",
                  },
                  {
                    title: "The Exaltation of the Holy Cross",
                    link: "/church/liturgical-year/seasons/trinitytide/holy-cross",
                  },
                  {
                    title: "Ember Days in Trinitytide",
                    link: "/church/liturgical-year/seasons/trinitytide/ember-days-in-trinitytide",
                  },
                  {
                    title: "Allhallowtide",
                    link: "/church/liturgical-year/seasons/trinitytide/allhallowtide",
                    children: [
                      {
                        title: "All Hallows' Eve",
                        link: "/church/liturgical-year/seasons/trinitytide/allhallowtide/all-hallows-eve",
                      },
                      {
                        title: "All Saints' Day",
                        link: "/church/liturgical-year/seasons/trinitytide/allhallowtide/all-saints-day",
                      },
                      {
                        title: "All Souls' Day",
                        link: "/church/liturgical-year/seasons/trinitytide/allhallowtide/all-souls-day",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: "Proper of Saints",
            link: "/church/liturgical-year/saints",
            priority: 0.6,
            inPageNav: true,
            children: [
              {
                title: "Saint Agnes",
                link: "/church/liturgical-year/saints/saint-agnes",
              },
              {
                title: "Saint Ambrose",
                link: "/church/liturgical-year/saints/saint-ambrose",
              },
              {
                title: "Saint Andrew",
                link: "/church/liturgical-year/saints/saint-andrew",
              },
              {
                title: "Saint Anne",
                link: "/church/liturgical-year/saints/saint-anne",
              },
              {
                title: "Saint Anselm",
                link: "/church/liturgical-year/saints/saint-anselm",
              },
              {
                title: "Saint Anthony",
                link: "/church/liturgical-year/saints/saint-anthony",
              },
              {
                title: "Saint Augustine",
                link: "/church/liturgical-year/saints/saint-augustine",
              },
              {
                title: "Saint Augustine of Canterbury",
                link: "/church/liturgical-year/saints/saint-augustine-of-canterbury",
              },
              {
                title: "Saint Barnabas",
                link: "/church/liturgical-year/saints/saint-barnabas",
              },
              {
                title: "Saint Bartholomew",
                link: "/church/liturgical-year/saints/saint-bartholomew",
              },
              {
                title: "Saint Basil the Great",
                link: "/church/liturgical-year/saints/saint-basil-the-great",
              },
              {
                title: "Saint Bede the Venerable",
                link: "/church/liturgical-year/saints/saint-bede-the-venerable",
              },
              {
                title: "The Beheading of Saint John the Baptist",
                link: "/church/liturgical-year/saints/beheading-of-saint-john-the-baptist",
              },
              {
                title: "Saint Benedict",
                link: "/church/liturgical-year/saints/saint-benedict",
              },
              {
                title: "Saint Bernard",
                link: "/church/liturgical-year/saints/saint-bernard",
              },
              {
                title: "The Blessed Virgin Mary",
                link: "/church/liturgical-year/saints/blessed-virgin-mary",
              },
              {
                title: "Saint Boniface",
                link: "/church/liturgical-year/saints/saint-boniface",
              },
              {
                title: "Saint Catherine of Alexandria",
                link: "/church/liturgical-year/saints/saint-catherine-of-alexandria",
              },
              {
                title: "Saint Cecilia",
                link: "/church/liturgical-year/saints/saint-cecilia",
              },
              {
                title: "Saint Clare",
                link: "/church/liturgical-year/saints/saint-clare",
              },
              {
                title: "Saint Clement",
                link: "/church/liturgical-year/saints/saint-clement",
              },
              {
                title: "The Conception of the Blessed Virgin Mary",
                link: "/church/liturgical-year/saints/conception-of-the-blessed-virgin-mary",
              },
              {
                title: "The Conversion of Saint Paul",
                link: "/church/liturgical-year/saints/conversion-of-saint-paul",
              },
              {
                title: "Saint Cyprian",
                link: "/church/liturgical-year/saints/saint-cyprian",
              },
              {
                title: "Saint Denis and Companions",
                link: "/church/liturgical-year/saints/saint-denis-and-companions",
              },
              {
                title: "Saint Dominic",
                link: "/church/liturgical-year/saints/saint-dominic",
              },
              {
                title: "Saint Elizabeth of Hungary",
                link: "/church/liturgical-year/saints/saint-elizabeth-of-hungary",
              },
              {
                title: "Saint Francis of Assisi",
                link: "/church/liturgical-year/saints/saint-francis-of-assisi",
              },
              {
                title: "Saint George",
                link: "/church/liturgical-year/saints/saint-george",
              },
              {
                title: "Saint Gregory the Great",
                link: "/church/liturgical-year/saints/saint-gregory-the-great",
              },
              {
                title: "Saint Hilary",
                link: "/church/liturgical-year/saints/saint-hilary",
              },
              {
                title: "Saint Ignatius",
                link: "/church/liturgical-year/saints/saint-ignatius",
              },
              {
                title: "Saint James",
                link: "/church/liturgical-year/saints/saint-james",
              },
              {
                title: "Saint Jerome",
                link: "/church/liturgical-year/saints/saint-jerome",
              },
              {
                title: "Saint Joachim",
                link: "/church/liturgical-year/saints/saint-joachim",
              },
              {
                title: "Saint John Chrysostom",
                link: "/church/liturgical-year/saints/saint-john-chrysostom",
              },
              {
                title: "Saint Joseph",
                link: "/church/liturgical-year/saints/saint-joseph",
              },
              {
                title: "Saint Lawrence",
                link: "/church/liturgical-year/saints/saint-lawrence",
              },
              {
                title: "Saint Lucy",
                link: "/church/liturgical-year/saints/saint-lucy",
              },
              {
                title: "Saint Luke",
                link: "/church/liturgical-year/saints/saint-luke",
              },
              {
                title: "Saint Mark",
                link: "/church/liturgical-year/saints/saint-mark",
              },
              {
                title: "Saint Martha",
                link: "/church/liturgical-year/saints/saint-martha",
              },
              {
                title: "Saint Martin of Tours",
                link: "/church/liturgical-year/saints/saint-martin-of-tours",
              },
              {
                title: "Saint Mary Magdalene",
                link: "/church/liturgical-year/saints/saint-mary-magdalene",
              },
              {
                title: "Saint Matthew",
                link: "/church/liturgical-year/saints/saint-matthew",
              },
              {
                title: "Saint Matthias",
                link: "/church/liturgical-year/saints/saint-matthias",
              },
              {
                title: "Saint Michael and all Angels",
                link: "/church/liturgical-year/saints/saint-michael-and-all-angels",
              },
              {
                title: "The Nativity of the Blessed Virgin Mary",
                link: "/church/liturgical-year/saints/nativity-of-the-blessed-virgin-mary",
              },
              {
                title: "The Nativity of Saint John the Baptist",
                link: "/church/liturgical-year/saints/nativity-of-saint-john-the-baptist",
              },
              {
                title: "Saint Nicholas",
                link: "/church/liturgical-year/saints/saint-nicholas",
              },
              {
                title: "Saint Patrick",
                link: "/church/liturgical-year/saints/saint-patrick",
              },
              {
                title: "Saints Perpetua and Felicity",
                link: "/church/liturgical-year/saints/saints-perpetua-and-felicity",
              },
              {
                title: "Saints Peter and Paul",
                link: "/church/liturgical-year/saints/saints-peter-and-paul",
              },
              {
                title: "Saints Philip and James",
                link: "/church/liturgical-year/saints/saints-philip-and-james",
              },
              {
                title: "Saint Polycarp",
                link: "/church/liturgical-year/saints/saint-polycarp",
              },
              {
                title: "Saint Scholastica",
                link: "/church/liturgical-year/saints/saint-scholastica",
              },
              {
                title: "Saints Simon and Jude",
                link: "/church/liturgical-year/saints/saints-simon-and-jude",
              },
              {
                title: "Saint Thomas",
                link: "/church/liturgical-year/saints/saint-thomas",
              },
              {
                title: "Saint Thomas Aquinas",
                link: "/church/liturgical-year/saints/saint-thomas-aquinas",
              },
              {
                title: "Saint Thomas of Canterbury",
                link: "/church/liturgical-year/saints/saint-thomas-of-canterbury",
              },
              {
                title: "Saint Vincent",
                link: "/church/liturgical-year/saints/saint-vincent",
              },
            ],
          },
          {
            title: "Ranking",
            link: "/church/liturgical-year/ranking",
            priority: 0.6,
            inPageNav: true,
          },
          {
            title: "Notes",
            link: "/church/liturgical-year/notes",
            priority: 0.6,
          },
        ],
      },
      {
        title: "Daily Office",
        link: "/church/daily-office",
        priority: 0.7,
        children: [
          {
            title: "Preface",
            link: "/church/daily-office/preface",
          },
          {
            title: "Ordinary",
            link: "/church/daily-office/ordinary",
            inPageNav: true,
          },
          {
            title: "Morning Prayer",
            link: "/church/daily-office/morning-prayer",
          },
          {
            title: "Evening Prayer",
            link: "/church/daily-office/evening-prayer",
          },
          {
            title: "Lectionary",
            link: "/church/daily-office/lectionary",
          },
          {
            title: "Chant Rubrics",
            link: "/church/daily-office/chant-rubrics",
            inPageNav: true,
          },
          {
            title: "Psalter",
            link: "/church/daily-office/psalter",
            inPageNav: true,
          },
        ],
      },
      {
        title: "Prayers",
        link: "/church/prayers",
        priority: 0.7,
        children: [
          {
            title: "Sign of the Cross",
            link: "/church/prayers/sign-of-the-cross",
          },
          {
            title: "Eastern Cross",
            link: "/church/prayers/eastern-cross",
          },
          {
            title: "Our Father",
            link: "/church/prayers/our-father",
          },
          {
            title: "Glory Be",
            link: "/church/prayers/glory-be",
          },
          {
            title: "Jesus Prayer",
            link: "/church/prayers/jesus-prayer",
          },
          {
            title: "Hail Mary",
            link: "/church/prayers/hail-mary",
          },
          {
            title: "Hail Holy Queen",
            link: "/church/prayers/hail-holy-queen",
          },
          {
            title: "O My Jesus",
            link: "/church/prayers/o-my-jesus",
          },
          {
            title: "Rosary",
            link: "/church/prayers/rosary",
          },
          {
            title: "Luther Morning Prayer",
            link: "/church/prayers/luther-morning-prayer",
          },
          {
            title: "Luther Evening Prayer",
            link: "/church/prayers/luther-evening-prayer",
          },
        ],
      },
      {
        title: "Creeds",
        link: "/church/creeds",
        priority: 0.7,
        children: [
          {
            title: "Apostles' Creed",
            link: "/church/creeds/apostles-creed",
          },
          {
            title: "Nicene Creed",
            link: "/church/creeds/nicene-creed",
          },
          {
            title: "Niceno-Constantinopolitan Creed",
            link: "/church/creeds/niceno-constantinopolitan-creed",
          },
          {
            title: "Chalcedonian Creed",
            link: "/church/creeds/chalcedonian-creed",
          },
          {
            title: "Nicene Creed with Filioque",
            link: "/church/creeds/nicene-creed-with-filioque",
          },
          {
            title: "Athanasian Creed",
            link: "/church/creeds/athanasian-creed",
          },
        ],
      },
      {
        title: "Music",
        link: "/church/music",
        priority: 0.7,
        children: [
          {
            title: "Chants",
            link: "/church/music/chants",
            priority: 0.6,
            children: [
              {
                title: "Agnus Dei",
                link: "/church/music/chants/agnus-dei",
              },
              {
                title: "Alleluia",
                link: "/church/music/chants/alleluia",
              },
              {
                title: "Benedicamus",
                link: "/church/music/chants/benedicamus",
              },
              {
                title: "Benedicite",
                link: "/church/music/chants/benedicite",
              },
              {
                title: "Benedictus",
                link: "/church/music/chants/benedictus",
              },
              {
                title: "Benedictus es, Domine",
                link: "/church/music/chants/benedictus-es-domine",
              },
              {
                title: "Credo",
                link: "/church/music/chants/credo",
              },
              {
                title: "Deus, Creator omnium",
                link: "/church/music/chants/deus-creator-omnium",
              },
              {
                title: "Deus in adjutorium",
                link: "/church/music/chants/deus-in-adjutorium",
              },
              {
                title: "Domine, labia mea",
                link: "/church/music/chants/domine-labia-mea",
              },
              {
                title: "Facta est cum Angelo",
                link: "/church/music/chants/facta-est-cum-angelo",
              },
              {
                title: "Gloria",
                link: "/church/music/chants/gloria",
              },
              {
                title: "Gloria Patri",
                link: "/church/music/chants/gloria-patri",
              },
              {
                title: "Iste pauper",
                link: "/church/music/chants/iste-pauper",
              },
              {
                title: "Kyrie",
                link: "/church/music/chants/kyrie",
              },
              {
                title: "Magnificat",
                link: "/church/music/chants/magnificat",
              },
              {
                title: "Multitudo languentium",
                link: "/church/music/chants/multitudo-languentium",
              },
              {
                title: "Nunc dimittis",
                link: "/church/music/chants/nunc-dimittis",
              },
              {
                title: "O Adonai",
                link: "/church/music/chants/o-adonai",
              },
              {
                title: "O Clavis David",
                link: "/church/music/chants/o-clavis-david",
              },
              {
                title: "O Emmanuel",
                link: "/church/music/chants/o-emmanuel",
              },
              {
                title: "O Oriens",
                link: "/church/music/chants/o-oriens",
              },
              {
                title: "O Radix Jesse",
                link: "/church/music/chants/o-radix-jesse",
              },
              {
                title: "O Rex gentium",
                link: "/church/music/chants/o-rex-gentium",
              },
              {
                title: "O Sapientia",
                link: "/church/music/chants/o-sapientia",
              },
              {
                title: "O Virgo virginum",
                link: "/church/music/chants/o-virgo-virginum",
              },
              {
                title: "Pascha nostrum",
                link: "/church/music/chants/pascha-nostrum",
              },
              {
                title: "Salva nos, Domine",
                link: "/church/music/chants/salva-nos-domine",
              },
              {
                title: "Sanctus",
                link: "/church/music/chants/sanctus",
              },
              {
                title: "Song of Habakkuk",
                link: "/church/music/chants/song-of-habakkuk",
              },
              {
                title: "Song of Hannah",
                link: "/church/music/chants/song-of-hannah",
              },
              {
                title: "Song of Hezekiah",
                link: "/church/music/chants/song-of-hezekiah",
              },
              {
                title: "Song of Isaiah",
                link: "/church/music/chants/song-of-isaiah",
              },
              {
                title: "Song of Moses from Deut., Pt. 1",
                link: "/church/music/chants/song-of-moses-deut-pt-1",
              },
              {
                title: "Song of Moses from Deut., Pt. 2",
                link: "/church/music/chants/song-of-moses-deut-pt-2",
              },
              {
                title: "Song of Moses from Exod.",
                link: "/church/music/chants/song-of-moses-exod",
              },
              {
                title: "Te decet laus",
                link: "/church/music/chants/te-decet-laus",
              },
              {
                title: "Te Deum",
                link: "/church/music/chants/te-deum",
              },
              {
                title: "Veni, redemptor gentium",
                link: "/church/music/chants/veni-redemptor-gentium",
              },
              {
                title: "Veni Sancte Spiritus",
                link: "/church/music/chants/veni-sancte-spiritus",
              },
              {
                title: "Venite",
                link: "/church/music/chants/venite",
              },
              {
                title: "Victimae paschali laudes",
                link: "/church/music/chants/victimae-paschali-laudes",
              },
            ],
          },
          {
            title: "Hymns",
            link: "/church/music/hymns",
            priority: 0.6,
            children: [
              {
                title: "40 Days and 40 Nights",
                link: "/church/music/hymns/40-days-and-40-nights",
              },
              {
                title: "A Mighty Fortress Is Our God",
                link: "/church/music/hymns/a-mighty-fortress-Is-our-god",
              },
              {
                title: "Again We Keep This Solemn Fast",
                link: "/church/music/hymns/again-we-keep-this-solemn-fast",
              },
              {
                title: "All Creatures of Our God and King",
                link: "/church/music/hymns/all-creatures-of-our-god-and-king",
              },
              {
                title: "All Hail the Power of Jesus' Name",
                link: "/church/music/hymns/all-hail-the-power-of-jesus-name",
              },
              {
                title: "Amazing Grace",
                link: "/church/music/hymns/amazing-grace",
              },
              {
                title: "Angels from the Realms of Glory",
                link: "/church/music/hymns/angels-from-the-realms-of-glory",
              },
              {
                title: "Angels We Have Heard on High",
                link: "/church/music/hymns/angels-we-have-heard-on-high",
              },
              {
                title: "Away in a Manger",
                link: "/church/music/hymns/away-in-a-manger",
              },
              {
                title: "Be Still My Soul",
                link: "/church/music/hymns/be-still-my-soul",
              },
              {
                title: "Be Thou My Vision",
                link: "/church/music/hymns/be-thou-my-vision",
              },
              {
                title: "Blessed Assurance",
                link: "/church/music/hymns/blessed-assurance",
              },
              {
                title: "Christ the Lord Is Risen Today",
                link: "/church/music/hymns/christ-the-lord-is-risen-today",
              },
              {
                title: "Come, Thou Long Expected Jesus",
                link: "/church/music/hymns/come-thou-long-expected-jesus",
              },
              {
                title: "Come, Thou Redeemer of the Earth",
                link: "/church/music/hymns/come-thou-redeemer-of-the-earth",
              },
              {
                title: "Crown Him with Many Crowns",
                link: "/church/music/hymns/crown-him-with-many-crowns",
              },
              {
                title: "For All the Saints",
                link: "/church/music/hymns/for-all-the-saints",
              },
              {
                title: "For the Beauty of the Earth",
                link: "/church/music/hymns/for-the-beauty-of-the-earth",
              },
              {
                title: "From Heaven Above to Earth I Come",
                link: "/church/music/hymns/from-heaven-above-to-earth-i-come",
              },
              {
                title: "Go, Tell It on the Mountain",
                link: "/church/music/hymns/go-tell-it-on-the-mountain",
              },
              {
                title: "God Rest Ye Merry Gentlemen",
                link: "/church/music/hymns/god-rest-ye-merry-gentlemen",
              },
              {
                title: "Haleluhu",
                link: "/church/music/hymns/haleluhu",
              },
              {
                title: "Hark! The Herald Angels Sing",
                link: "/church/music/hymns/hark-the-herald-angels-sing",
              },
              {
                title: "Here I Am, Lord",
                link: "/church/music/hymns/here-i-am-lord",
              },
              {
                title: "Hosanna, Loud Hosanna",
                link: "/church/music/hymns/hosanna-loud-hosanna",
              },
              {
                title: "How Firm a Foundation",
                link: "/church/music/hymns/how-firm-a-foundation",
              },
              {
                title: "I Surrender All",
                link: "/church/music/hymns/i-surrender-all",
              },
              {
                title: "I Want to Walk as a Child of the Light",
                link: "/church/music/hymns/i-want-to-walk-as-a-child-of-the-light",
              },
              {
                title: "In the Garden",
                link: "/church/music/hymns/in-the-garden",
              },
              {
                title: "It Is Well with My Soul",
                link: "/church/music/hymns/it-is-well-with-my-soul",
              },
              {
                title: "Jesu, Joy of Man's Desiring",
                link: "/church/music/hymns/jesu-joy-of-mans-desiring",
              },
              {
                title: "Jesus Christ Is Risen Today",
                link: "/church/music/hymns/jesus-christ-is-risen-today",
              },
              {
                title: "Jesus Loves Me",
                link: "/church/music/hymns/jesus-loves-me",
              },
              {
                title: "Joy to the World",
                link: "/church/music/hymns/joy-to-the-world",
              },
              {
                title: "Just as I Am",
                link: "/church/music/hymns/just-as-i-am",
              },
              {
                title: "Ki L'olam Hasdo",
                link: "/church/music/hymns/ki-lolam-hasdo",
              },
              {
                title: "Let There Be Peace On Earth",
                link: "/church/music/hymns/let-there-be-peace-on-earth",
              },
              {
                title: "Lift High the Cross",
                link: "/church/music/hymns/lift-high-the-cross",
              },
              {
                title: "Lord Jesus, Think on Me",
                link: "/church/music/hymns/lord-jesus-think-on-me",
              },
              {
                title: "Lord, Who Throughout These Forty Days",
                link: "/church/music/hymns/lord-who-throughout-these-forty-days",
              },
              {
                title: "Love Came Down at Christmas",
                link: "/church/music/hymns/love-came-down-at-christmas",
              },
              {
                title: "Morning Has Broken",
                link: "/church/music/hymns/morning-has-broken",
              },
              {
                title: "Now Thank We All Our God",
                link: "/church/music/hymns/now-thank-we-all-our-god",
              },
              {
                title: "O Come, All Ye Faithful",
                link: "/church/music/hymns/o-come-all-ye-faithful",
              },
              {
                title: "O Come, O Come, Emmanuel",
                link: "/church/music/hymns/o-come-o-come-emmanuel",
              },
              {
                title: "O Holy Night",
                link: "/church/music/hymns/o-holy-night",
              },
              {
                title: "O How I Love Jesus",
                link: "/church/music/hymns/o-how-i-love-jesus",
              },
              {
                title: "O Little Town of Bethlehem",
                link: "/church/music/hymns/o-little-town-of-bethlehem",
              },
              {
                title: "O for a Thousand Tongues to Sing",
                link: "/church/music/hymns/o-for-a-thousand-tongues-to-sing",
              },
              {
                title: "Onward, Christian Soldiers",
                link: "/church/music/hymns/onward-christian-soldiers",
              },
              {
                title: "Praise God, from Whom All Blessings Flow",
                link: "/church/music/hymns/praise-god-from-whom-all-blessings-flow",
              },
              {
                title: "Praise to the Lord, the Almighty",
                link: "/church/music/hymns/praise-to-the-lord-the-almighty",
              },
              {
                title: "Praise My Soul, the King of Heaven",
                link: "/church/music/hymns/praise-my-soul-the-king-of-heaven",
              },
              {
                title: "Silent Night",
                link: "/church/music/hymns/silent-night",
              },
              {
                title: "Softly and Tenderly",
                link: "/church/music/hymns/softly-and-tenderly",
              },
              {
                title: "Spirit of the Living God",
                link: "/church/music/hymns/spirit-of-the-living-god",
              },
              {
                title: "Take My Life, and Let It Be",
                link: "/church/music/hymns/take-my-life-and-let-it-be",
              },
              {
                title: "Take up Thy Cross, the Savior Said",
                link: "/church/music/hymns/take-up-thy-cross-the-savior-said",
              },
              {
                title: "The First Noel",
                link: "/church/music/hymns/the-first-noel",
              },
              {
                title: "Thine Be the Glory",
                link: "/church/music/hymns/thine-be-the-glory",
              },
              {
                title: "Unto Us Is Born a Son",
                link: "/church/music/hymns/unto-us-is-born-a-son",
              },
              {
                title: "We Three Kings",
                link: "/church/music/hymns/we-three-kings",
              },
              {
                title: "What a Friend We Have in Jesus",
                link: "/church/music/hymns/what-a-friend-we-have-in-jesus",
              },
              {
                title: "Where Charity and Love Prevail",
                link: "/church/music/hymns/where-charity-and-love-prevail",
              },
              {
                title: "Where He Leads Me",
                link: "/church/music/hymns/where-he-leads-me",
              },
            ],
          },
          {
            title: "Songs",
            link: "/church/music/songs",
            priority: 0.6,
            children: [
              {
                title: "Good King Wenceslas",
                link: "/church/music/songs/good-king-wenceslas",
              },
              {
                title: "Handel's Messiah",
                link: "/church/music/songs/handels-messiah",
              },
              {
                title: "Here We Come A-Wassailing",
                link: "/church/music/songs/here-we-come-a-wassailing",
              },
              {
                title: "Hey, Ho, Nobody Home",
                link: "/church/music/songs/hey-ho-nobody-home",
              },
              {
                title: "Souling Song",
                link: "/church/music/songs/souling-song",
              },
              {
                title: "The Holly and the Ivy",
                link: "/church/music/songs/the-holly-and-the-ivy",
              },
            ],
          },
        ],
      },
      {
        title: "Liturgical Colors",
        link: "/church/liturgical-colors",
      },
      {
        title: "Vesture",
        link: "/church/vesture",
        priority: 0.7,
        children: [
          {
            title: "Vestments",
            link: "/church/vesture/vestments",
          },
          {
            title: "Clerical Dress",
            link: "/church/vesture/clerical-dress",
          },
          {
            title: "Monastic Habit",
            link: "/church/vesture/monastic-habit",
          },
        ],
      },
      {
        title: "Ornaments",
        link: "/church/ornaments",
      },
      {
        title: "Traditions",
        link: "/church/traditions",
        priority: 0.7,
        children: [
          {
            title: "Roman",
            link: "/church/traditions/roman",
            priority: 0.6,
            children: [
              {
                title: "Mass",
                link: "/church/traditions/roman/mass",
                inPageNav: true,
              },
            ],
          },
          {
            title: "Augustinian",
            link: "/church/traditions/augustinian",
            priority: 0.6,
            children: [
              {
                title: "The Rule of Saint Augustine",
                link: "/church/traditions/augustinian/the-rule-of-saint-augustine",
              },
            ],
          },
          {
            title: "Benedictine",
            link: "/church/traditions/benedictine",
            priority: 0.6,
            children: [
              {
                title: "The Rule of Saint Benedict",
                link: "/church/traditions/benedictine/the-rule-of-saint-benedict",
              },
              {
                title: "Liturgy of the Hours",
                link: "/church/traditions/benedictine/liturgy-of-the-hours",
                inPageNav: true,
              },
            ],
          },
          {
            title: "Sarum",
            link: "/church/traditions/sarum",
            priority: 0.6,
            children: [
              {
                title: "Liturgy of the Hours",
                link: "/church/traditions/sarum/liturgy-of-the-hours",
                inPageNav: true,
              },
            ],
          },
          {
            title: "Franciscan",
            link: "/church/traditions/franciscan",
            priority: 0.6,
            children: [
              {
                title: "The Rule of Saint Francis",
                link: "/church/traditions/franciscan/the-rule-of-saint-francis",
              },
            ],
          },
          {
            title: "Dominican",
            link: "/church/traditions/dominican",
            priority: 0.6,
            children: [
              {
                title: "Primitive Constitutions",
                link: "/church/traditions/dominican/primitive-constitutions",
              },
            ],
          },
          {
            title: "Anglican",
            link: "/church/traditions/anglican",
            priority: 0.6,
            children: [
              {
                title: "Book of Common Prayer",
                link: "/church/traditions/anglican/book-of-common-prayer",
                priority: 0.6,
              },
              {
                title: "Morning Prayer",
                link: "/church/traditions/anglican/morning-prayer",
                inPageNav: true,
              },
              {
                title: "Evening Prayer",
                link: "/church/traditions/anglican/evening-prayer",
                inPageNav: true,
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
                title: "Anne",
                link: "/people/saints/biblical/anne",
              },
              {
                title: "The Blessed Virgin Mary",
                link: "/people/saints/biblical/the-blessed-virgin-mary",
              },
              {
                title: "Elizabeth",
                link: "/people/saints/biblical/elizabeth",
              },
              {
                title: "Joachim",
                link: "/people/saints/biblical/joachim",
              },
              {
                title: "John the Baptist",
                link: "/people/saints/biblical/john-the-baptist",
              },
              {
                title: "Joseph of Nazareth",
                link: "/people/saints/biblical/joseph-of-nazareth",
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
                title: "Simeon the Prophet",
                link: "/people/saints/biblical/simeon-the-prophet",
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
              {
                title: "Zechariah the Priest",
                link: "/people/saints/biblical/zechariah-the-priest",
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
                title: "Andrew of Crete",
                link: "/people/saints/greek-fathers/andrew-of-crete",
              },
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
              {
                title: "Sophronius of Jerusalem",
                link: "/people/saints/greek-fathers/sophronius-of-jerusalem",
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
                title: "Denis of Paris",
                link: "/people/saints/early/denis-of-paris",
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
                title: "Boniface of Mainz",
                link: "/people/saints/medieval/boniface-of-mainz",
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
                title: "Osmund of Salisbury",
                link: "/people/saints/medieval/osmund-of-salisbury",
              },
              {
                title: "Peter Damian",
                link: "/people/saints/medieval/peter-damian",
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
                title: "Thomas of Canterbury",
                link: "/people/saints/medieval/thomas-of-canterbury",
              },
            ],
          },
        ],
      },
      {
        title: "Early Christian Writers",
        link: "/people/early-christian-writers",
        priority: 0.7,
        children: [
          {
            title: "Clement of Alexandria",
            link: "/people/early-christian-writers/clement-of-alexandria",
          },
          {
            title: "Eusebius",
            link: "/people/early-christian-writers/eusebius",
          },
          {
            title: "Julius Africanus",
            link: "/people/early-christian-writers/julius-africanus",
          },
          {
            title: "Origen of Alexandria",
            link: "/people/early-christian-writers/origen-of-alexandria",
          },
          {
            title: "Tertullian",
            link: "/people/early-christian-writers/tertullian",
          },
        ],
      },
      {
        title: "Medieval Theologians",
        link: "/people/medieval-theologians",
        priority: 0.7,
        children: [
          {
            title: "Boethius",
            link: "/people/medieval-theologians/boethius",
          },
          {
            title: "Duns Scotus",
            link: "/people/medieval-theologians/duns-scotus",
          },
          {
            title: "Lanfranc of Pavia",
            link: "/people/medieval-theologians/lanfranc-of-pavia",
          },
          {
            title: "Peter Lombard",
            link: "/people/medieval-theologians/peter-lombard",
          },
          {
            title: "William of Ockham",
            link: "/people/medieval-theologians/william-of-ockham",
          },
        ],
      },
      {
        title: "Anglican Divines",
        link: "/people/anglican-divines",
        priority: 0.7,
        children: [
          {
            title: "Lancelot Andrewes",
            link: "/people/anglican-divines/lancelot-andrewes",
          },
          {
            title: "Richard Hooker",
            link: "/people/anglican-divines/richard-hooker",
          },
          {
            title: "Thomas Cranmer",
            link: "/people/anglican-divines/thomas-cranmer",
          },
          {
            title: "Thomas Ken",
            link: "/people/anglican-divines/thomas-ken",
          },
        ],
      },
      {
        title: "Anglican Writers",
        link: "/people/anglican-writers",
        priority: 0.7,
        children: [
          {
            title: "John Henry Blunt",
            link: "/people/anglican-writers/john-henry-blunt",
          },
          {
            title: "John Mason Neale",
            link: "/people/anglican-writers/john-mason-neale",
          },
          {
            title: "Sabine Baring-Gould",
            link: "/people/anglican-writers/sabine-baring-gould",
          },
        ],
      },
      {
        title: "Hymnwriters",
        link: "/people/hymnwriters",
        priority: 0.7,
        children: [
          {
            title: "Anna Bartlett Warner",
            link: "/people/hymnwriters/anna-bartlett-warner",
          },
          {
            title: "Charles Austin Miles",
            link: "/people/hymnwriters/charles-austin-miles",
          },
          {
            title: "Charles Jennens",
            link: "/people/hymnwriters/charles-jennens",
          },
          {
            title: "Charles W. Everest",
            link: "/people/hymnwriters/charles-w-everest",
          },
          {
            title: "Charles Wesley",
            link: "/people/hymnwriters/charles-wesley",
          },
          {
            title: "Charlotte Elliott",
            link: "/people/hymnwriters/charlotte-elliott",
          },
          {
            title: "Christina Rossetti",
            link: "/people/hymnwriters/christina-rosetti",
          },
          {
            title: "Claudia Frances Hernaman",
            link: "/people/hymnwriters/claudia-frances-hernaman",
          },
          {
            title: "Dallán Forgaill",
            link: "/people/hymnwriters/dallan-forgaill",
          },
          {
            title: "Dan Schutte",
            link: "/people/hymnwriters/dan-schutte",
          },
          {
            title: "Daniel Iverson",
            link: "/people/hymnwriters/daniel-iverson",
          },
          {
            title: "Edmond Louis Budry",
            link: "/people/hymnwriters/edmond-louis-budry",
          },
          {
            title: "Edward Perronet",
            link: "/people/hymnwriters/edward-perronet",
          },
          {
            title: "Eleanor Farjeon",
            link: "/people/hymnwriters/eleanor-farjeon",
          },
          {
            title: "Ernest W. Blandy",
            link: "/people/hymnwriters/ernest-w-blandy",
          },
          {
            title: "Fanny Crosby",
            link: "/people/hymnwriters/fanny-crosby",
          },
          {
            title: "Folliott Sandford Pierpoint",
            link: "/people/hymnwriters/folliott-sandford-pierpoint",
          },
          {
            title: "Frances Ridley Havergal",
            link: "/people/hymnwriters/frances-ridley-havergal",
          },
          {
            title: "Frederick Whitfield",
            link: "/people/hymnwriters/frederick-whitfield",
          },
          {
            title: "George Frideric Handel",
            link: "/people/hymnwriters/george-frideric-handel",
          },
          {
            title: "George Hunt Smyttan",
            link: "/people/hymnwriters/george-hunt-smyttan",
          },
          {
            title: "George Kitchin",
            link: "/people/hymnwriters/george-kitchin",
          },
          {
            title: "Henry Francis Lyte",
            link: "/people/hymnwriters/henry-francis-lyte",
          },
          {
            title: "Horatio Spafford",
            link: "/people/hymnwriters/horatio-spafford",
          },
          {
            title: "Isaac Watts",
            link: "/people/hymnwriters/isaac-watts",
          },
          {
            title: "James Chadwick",
            link: "/people/hymnwriters/james-chadwick",
          },
          {
            title: "James Montgomery",
            link: "/people/hymnwriters/james-montgomery",
          },
          {
            title: "Jeanette Threlfall",
            link: "/people/hymnwriters/jeanette-threlfall",
          },
          {
            title: "Jill Jackson-Miller",
            link: "/people/hymnwriters/jill-jackson-miller",
          },
          {
            title: "Joachim Neander",
            link: "/people/hymnwriters/joachim-neander",
          },
          {
            title: "Johann Sebastian Bach's",
            link: "/people/hymnwriters/johann-sebastian-bach",
          },
          {
            title: "John Francis Wade",
            link: "/people/hymnwriters/john-francis-wade",
          },
          {
            title: "John Henry Hopkins Jr.",
            link: "/people/hymnwriters/john-henry-hopkins-jr",
          },
          {
            title: "John Newton",
            link: "/people/hymnwriters/john-newton",
          },
          {
            title: "Joseph M. Scriven",
            link: "/people/hymnwriters/joseph-m-scriven",
          },
          {
            title: "Joseph Mohr",
            link: "/people/hymnwriters/joseph-mohr",
          },
          {
            title: "Judson W. Van DeVenter",
            link: "/people/hymnwriters/judson-w-van-deventer",
          },
          {
            title: "Kathleen Thomerson",
            link: "/people/hymnwriters/kathleen-thomerson",
          },
          {
            title: "Katharina von Schlegel",
            link: "/people/hymnwriters/katharina-von-schlegel",
          },
          {
            title: "Martin Rinkart",
            link: "/people/hymnwriters/martin-rinkart",
          },
          {
            title: "Matthew Bridges",
            link: "/people/hymnwriters/matthew-bridges",
          },
          {
            title: "Paulinus of Aquileia",
            link: "/people/hymnwriters/paulinus-of-aquileia",
          },
          {
            title: "Phillips Brooks",
            link: "/people/hymnwriters/phillips-brooks",
          },
          {
            title: "Placide Cappeau",
            link: "/people/hymnwriters/placide-cappeau",
          },
          {
            title: "Sy Miller",
            link: "/people/hymnwriters/sy-miller",
          },
          {
            title: "Synesius of Cyrene",
            link: "/people/hymnwriters/synesius-of-cyrene",
          },
          {
            title: "Thomas Helmore",
            link: "/people/hymnwriters/thomas-helmore",
          },
          {
            title: "Will L. Thompson",
            link: "/people/hymnwriters/will-l-thompson",
          },
          {
            title: "William W. How",
            link: "/people/hymnwriters/william-w-how",
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
        title: "Church",
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
      {
        title: "Theological Terms",
        link: "/glossary/theological-terms",
        inPageNav: true,
      },
    ],
  },
];
