"use client";
import { styled } from "@mui/material";
import { useDefinition } from "./DefinitionProvider";
import { Glossary } from "@/app/api/glossary/route";
import { Tooltip } from "../Tooltip";

interface Props {
  lang: keyof Glossary;
  anchor: string;
  text: string;
}

const smartQuotes = (text: string) => {
  return text.replace(/"([^"]*)"/g, "“$1”");
};

export const Definition: React.FC<Props> = ({ lang, anchor, text }) => {
  const definition = useDefinition();

  const language = lang.charAt(0).toUpperCase() + lang.slice(1);

  const tooltipContent =
    definition && definition.glossary && definition.glossary[lang][anchor];

  return (
    <span>
      {tooltipContent ? (
        <Tooltip
          title={
            <>
              <strong>{language}:</strong> {smartQuotes(tooltipContent)}
            </>
          }
        >
          <Text>{smartQuotes(text)}</Text>
        </Tooltip>
      ) : (
        <Text>{smartQuotes(text)}</Text>
      )}
    </span>
  );
};

const Text = styled("span")(({ theme }) => ({
  color: theme.palette.brand.red,
}));
