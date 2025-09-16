"use client";
import { styled, Tooltip } from "@mui/material";
import { useDefinition } from "./DefinitionProvider";
import { Glossary } from "@/app/api/glossary/route";
import { typography } from "@/assets/styles";

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
    <>
      {content ? (
        <Tooltip
          title={content}
          slotProps={{
            tooltip: {
              sx: (theme) => ({
                ...typography.body2,
                backgroundColor: theme.palette.brand.darkGrey,
              }),
            },
          }}
        >
          <Text>{text}</Text>
        </Tooltip>
      ) : (
        <Text>{text}</Text>
      )}
    </>
  );
};

const Text = styled("span")(({ theme }) => ({
  color: theme.palette.brand.red,
}));
