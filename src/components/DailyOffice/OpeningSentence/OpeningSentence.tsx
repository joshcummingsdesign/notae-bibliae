"use client";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  CircularProgress,
  styled,
  TextField,
} from "@mui/material";
import { BiblePassage } from "@/types/BiblePassage";
import openingSentences from "./opening-sentences.json";

type SentenceCategory = keyof typeof openingSentences;

const cache: Record<string, string> = {};

interface Props {
  id: string;
}

export const OpeningSentence: React.FC<Props> = ({ id }) => {
  const categories = Object.keys(openingSentences).sort() as SentenceCategory[];
  const [category, setCategory] = useState<SentenceCategory>("General");
  const [passages, setPassages] = useState(openingSentences[category]);
  const [passage, setPassage] = useState(passages[0]);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const formatContent = (contentString: string): string =>
    contentString
      // Remove paragraph symbols
      .replaceAll("¶", "")
      // LORD => Lord (for CSS small-caps)
      .replaceAll("LORD", "Lord")
      // Remove spaces after line numbers
      .replaceAll(/(?<=[0-9]+)<\/span>\s/g, "</span>")
      // Remove p tags
      .replace(/<p\b[^>]*>/gi, "")
      .replace(/<\/p>/gi, " ");

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

  const storeValues = (
    category: SentenceCategory,
    passage: string,
    content: string
  ) => {
    localStorage.setItem(
      `${id}-opening-sentence`,
      JSON.stringify({ category, passage, content })
    );
  };

  const getStoredValues = (): {
    category: SentenceCategory;
    passage: string;
    content: string;
  } | null => {
    const v = localStorage.getItem(`${id}-opening-sentence`);
    if (v) {
      return JSON.parse(v);
    }
    return null;
  };

  // Get stored values
  useEffect(() => {
    const storedValues = getStoredValues();
    if (storedValues) {
      setCategory(storedValues.category);
      setPassage(storedValues.passage);
      setContent(storedValues.content);
      cache[storedValues.passage] = storedValues.content;
    }

    setInitialLoad(true);
  }, []);

  // Request passage
  useEffect(() => {
    if (!initialLoad) {
      return;
    }

    if (cache[passage]) {
      setContent(cache[passage]);
      storeValues(category, passage, cache[passage]);
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`/api/bible?query=${encodeURIComponent(passage)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          return;
        }

        const contentString = (data as BiblePassage[]).reduce((acc, d) => {
          acc += d.content;
          return acc;
        }, "");

        const formattedContent = formatContent(contentString);

        setContent(formattedContent);
        storeValues(category, passage, formattedContent);
        cache[passage] = formattedContent;
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
      <PassageWrapper>
        {(() => {
          if (error) {
            return (
              <ErrorText>
                <em>❡ An error occurred; use Psalter instead</em> (SDP 256).
              </ErrorText>
            );
          }
          if (loading) {
            return (
              <CircularProgress color="inherit" thickness={2.5} size={25} />
            );
          }
          return <Passage dangerouslySetInnerHTML={{ __html: content }} />;
        })()}
      </PassageWrapper>
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

const PassageWrapper = styled("div")({
  marginTop: 25,
});

const ErrorText = styled("p")(({ theme }) => ({
  color: theme.palette.brand.red,
}));

const Passage = styled("div")({
  ".nd": {
    fontVariantCaps: "small-caps",
  },

  ".v": {
    fontSize: "0.75rem",
    verticalAlign: "super",
    lineHeight: 0,
    marginRight: 2,
  },
});
