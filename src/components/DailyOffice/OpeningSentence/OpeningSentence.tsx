"use client";
import { useEffect, useState } from "react";
import { Autocomplete, styled, TextField } from "@mui/material";
import openingSentences from "./opening-sentences.json";

type Office = keyof typeof openingSentences;
type SentenceCategory = keyof (typeof openingSentences)[Office];
type OpeningSentenceEntry = (typeof openingSentences)[Office][SentenceCategory][number];

interface Props {
  id: string;
  office: Office;
}

const quoteEntities: Record<string, string> = {
  "&quot;": '"',
  "&#34;": '"',
  "&apos;": "'",
  "&#39;": "'",
};

const smartQuotes = (text: string) => {
  return text
    .replace(/&quot;|&#34;|&apos;|&#39;/g, (entity) => quoteEntities[entity])
    .replace(/"([^"]*)"/g, "“$1”")
    .replace(/(\w)'(\w)/g, "$1’$2")
    .replace(/(\w)'(?=\s|[.,;:!?)]|$)/g, "$1’");
};

export const OpeningSentence: React.FC<Props> = ({ id, office }) => {
  const sentences = openingSentences[office];
  const categories = Object.keys(sentences) as SentenceCategory[];
  const [category, setCategory] = useState<SentenceCategory>("General");
  const [passages, setPassages] = useState(sentences[category]);
  const [passage, setPassage] = useState(passages[0]);
  const [hasLoadedStoredValues, setHasLoadedStoredValues] = useState(false);

  const handleCategoryChange = (value: SentenceCategory) => {
    setCategory(value);
    setPassages(() => {
      const p = sentences[value];
      setPassage(p[0]);
      return p;
    });
  };

  const handlePassageChange = (value: OpeningSentenceEntry) => {
    setPassage(value);
  };

  const storeValues = (category: SentenceCategory, passage: string) => {
    localStorage.setItem(
      `${id}-${office}-opening-sentence`,
      JSON.stringify({ category, passage }),
    );
  };

  const getStoredValues = (): {
    category: SentenceCategory;
    passage: string;
  } | null => {
    const v = localStorage.getItem(`${id}-${office}-opening-sentence`);
    if (v) {
      return JSON.parse(v);
    }
    return null;
  };

  useEffect(() => {
    const storedValues = getStoredValues();
    if (storedValues) {
      setCategory(storedValues.category);
      const storedPassages = sentences[storedValues.category];
      setPassages(storedPassages);
      setPassage(
        storedPassages.find((p) => p.passage === storedValues.passage)!,
      );
    }

    setHasLoadedStoredValues(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredValues) {
      return;
    }

    storeValues(category, passage.passage);
  }, [category, hasLoadedStoredValues, passage]);

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
        <Autocomplete<OpeningSentenceEntry, false, true>
          disablePortal
          value={passage}
          disableClearable={true}
          options={passages}
          getOptionLabel={(option) => option.passage}
          isOptionEqualToValue={(option, value) =>
            option.passage === value.passage
          }
          onChange={(_, value) => handlePassageChange(value)}
          renderInput={(params) => <TextInput {...params} label="Passage" />}
        />
      </Wrapper>
      <PassageWrapper>
        <span>{smartQuotes(passage.text)}</span>
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
