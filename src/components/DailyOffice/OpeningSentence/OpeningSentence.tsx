"use client";
import {
  Autocomplete,
  CircularProgress,
  styled,
  TextField,
} from "@mui/material";
import openingSentences from "./opening-sentences.json";
import { Fragment, useEffect, useState } from "react";
import { BiblePassage } from "@/lib/types/BiblePassage";

type SentenceCategory = keyof typeof openingSentences;

const cache: Record<string, BiblePassage> = {};

interface Props {
  id: string;
}

export const OpeningSentence: React.FC<Props> = ({ id }) => {
  const categories = Object.keys(openingSentences).sort() as SentenceCategory[];

  const [category, setCategory] = useState<SentenceCategory>("General");
  const [passages, setPassages] = useState(openingSentences[category]);
  const [passage, setPassage] = useState(passages[0]);
  const [content, setContent] = useState<BiblePassage>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleCategoryChange = (value: SentenceCategory) => {
    setCategory(value);
    setPassages(() => {
      const p = openingSentences[value];
      setPassage(p[0]);
      return p;
    });
  };

  const handlePassageChange = (value: string) => {
    setPassage(value);
  };

  const cacheValues = (
    category: SentenceCategory,
    passage: string,
    content: BiblePassage
  ) => {
    localStorage.setItem(
      `${id}-opening-sentence`,
      JSON.stringify({ category, passage, content })
    );
  };

  const getCachedValues = (): {
    category: SentenceCategory;
    passage: string;
    content: BiblePassage;
  } | null => {
    const v = localStorage.getItem(`${id}-opening-sentence`);
    if (v) {
      return JSON.parse(v);
    }
    return null;
  };

  useEffect(() => {
    const cachedValues = getCachedValues();
    if (cachedValues) {
      setCategory(cachedValues.category);
      setPassage(cachedValues.passage);
      cache[passage] = cachedValues.content;
    }

    setInitialLoad(true);
  }, [cache]);

  useEffect(() => {
    if (!initialLoad) {
      return;
    }

    if (cache[passage]) {
      setContent(cache[passage]);
      cacheValues(category, passage, cache[passage]);
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`/api/bible?passage=${encodeURIComponent(passage)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          return;
        }
        cache[passage] = data;
        setContent(data);
        cacheValues(category, passage, data);
      })
      .finally(() => setLoading(false));
  }, [initialLoad, cache, category, passage]);

  return (
    <>
      <Wrapper>
        <Autocomplete<SentenceCategory, false, true>
          disablePortal
          value={category}
          disableClearable={true}
          options={categories}
          onChange={(_, value) => handleCategoryChange(value)}
          renderInput={(params) => <TextInput {...params} label="Category" />}
        />
        <Autocomplete<string, false, true>
          disablePortal
          value={passage}
          disableClearable={true}
          options={passages}
          onChange={(_, value) => handlePassageChange(value)}
          renderInput={(params) => <TextInput {...params} label="Passage" />}
        />
      </Wrapper>
      <Verse>
        {(() => {
          if (error) {
            return <>Error. Use Psalter instead (SDP 256).</>;
          }
          if (loading) {
            return (
              <CircularProgress color="inherit" thickness={2.5} size={25} />
            );
          }
          return Object.entries(content).map(([v, p]) => (
            <Fragment key={v}>
              <VerseNum>{v}</VerseNum> {p}
            </Fragment>
          ));
        })()}
      </Verse>
    </>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "row",

  ".MuiAutocomplete-root": {
    width: "100%",
  },
  gap: 16,
});

const TextInput = styled(TextField)(({ theme }) => ({
  width: "100%",

  ".MuiInputBase-root": {
    height: 30,
  },

  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.brand.border,
    borderWidth: 1,
  },

  label: {
    display: "none",
  },

  fieldset: {
    border: "none",
    borderRadius: 0,
    borderBottom: `1px solid ${theme.palette.brand.border}`,
  },
}));

const VerseNum = styled("sup")(({ theme }) => ({
  color: theme.palette.brand.red,
  fontWeight: theme.typography.fontWeightBold,
  fontSize: "0.6875rem",
}));

const Verse = styled("p")({
  marginTop: 25,
});
