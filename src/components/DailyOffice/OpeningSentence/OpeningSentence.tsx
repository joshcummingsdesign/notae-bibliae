"use client";
import { useEffect, useState } from "react";
import { Autocomplete, styled, TextField } from "@mui/material";
import openingSentences from "./opening-sentences.json";
import { Large } from "@/components/text/Large";

type Office = keyof typeof openingSentences;
type OpeningSentenceEntry = {
  passage: string;
  text: string;
};

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
    .replace(/(\w)'(\w)/g, "$1'$2")
    .replace(/(\w)'(?=\s|[.,;:!?)]|$)/g, "$1'");
};

export const OpeningSentence: React.FC<Props> = ({ id, office }) => {
  const sentences = openingSentences[office] as Record<
    string,
    OpeningSentenceEntry[]
  >;
  const categories = Object.keys(sentences);
  const [category, setCategory] = useState("General");
  const [hasLoadedStoredValues, setHasLoadedStoredValues] = useState(false);
  const storageKey = `${id}-${office}-opening-sentence`;
  const passages = sentences[category];

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const isSentenceCategory = (value: unknown): value is string => {
    return typeof value === "string" && categories.includes(value);
  };

  const storeValues = (category: string) => {
    localStorage.setItem(storageKey, JSON.stringify({ category }));
  };

  const getStoredValues = (): { category: string } | null => {
    const v = localStorage.getItem(storageKey);
    if (!v) {
      return null;
    }

    try {
      const storedValues = JSON.parse(v) as { category?: unknown };

      if (isSentenceCategory(storedValues.category)) {
        return { category: storedValues.category };
      }
    } catch {
      return null;
    }

    return null;
  };

  useEffect(() => {
    const storedValues = getStoredValues();
    if (storedValues) {
      setCategory(storedValues.category);
    }

    setHasLoadedStoredValues(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredValues) {
      return;
    }

    storeValues(category);
  }, [category, hasLoadedStoredValues]);

  return (
    <>
      <Wrapper>
        <Autocomplete<string, false, true>
          disablePortal
          value={category}
          disableClearable={true}
          options={categories}
          onChange={(_, value) => handleCategoryChange(value)}
          renderInput={(params) => <TextInput {...params} label="Category" />}
        />
      </Wrapper>
      <PassageWrapper>
        {passages.map((passage, i) => {
          let content = smartQuotes(passage.text);

          if (i === 0) {
            const [firstWord, ...restWords] = content.split(" ");
            const rest = restWords.join(" ");
            return (
              <p key={passage.passage}>
                <Large text={firstWord} /> <span>{rest}</span>
                <em>{passage.passage}</em>.
              </p>
            );
          }
          return (
            <p key={passage.passage}>
              <span>{content}</span>
              <em>{passage.passage}</em>.
            </p>
          );
        })}
      </PassageWrapper>
    </>
  );
};

const Wrapper = styled("div")({
  display: "flex",

  ".MuiAutocomplete-root": {
    width: "100%",
  },
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

const PassageWrapper = styled("div")(({ theme }) => ({
  marginTop: 25,

  em: {
    color: theme.palette.brand.grey,
    whiteSpace: "nowrap",
  },
}));
