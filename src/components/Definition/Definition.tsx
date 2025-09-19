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

export const Definition: React.FC<Props> = ({ lang, anchor, text }) => {
  const definition = useDefinition();

  const content =
    definition && definition.glossary && definition.glossary[lang][anchor];

  return (
    <span>
      {content ? (
        <Tooltip title={content}>
          <Text>{text}</Text>
        </Tooltip>
      ) : (
        <Text>{text}</Text>
      )}
    </span>
  );
};

const Text = styled("span")(({ theme }) => ({
  color: theme.palette.brand.red,
}));
