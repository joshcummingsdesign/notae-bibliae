"use client";
import { Fragment } from "react";
import { styled } from "@mui/material";
import { CollectItem } from "@/models/collects";
import Link from "next/link";
import { Definition } from "../Definition";
import DOMPurify from "isomorphic-dompurify";
import { Large } from "../text/Large";
import { smartQuotes } from "@/utils/smartQuotes";
import { Grey } from "../text/Grey";

interface Props {
  collects: CollectItem[];
  isFerial: boolean;
}

export const Collects: React.FC<Props> = ({ collects, isFerial }) => {
  let header = (
    <Wrapper>
      <Text>
        ❡ Chanted using the{" "}
        <Link
          href="/liturgy/daily-office/chant-rubrics#the-collects"
          target="_blank"
        >
          festal tone.
        </Link>
      </Text>
    </Wrapper>
  );
  if (isFerial) {
    header = (
      <Wrapper>
        <Text>
          ❡ Chanted{" "}
          <Definition lang="latin" anchor="recto-tono" text="recto tono" />.
        </Text>
      </Wrapper>
    );
  }

  return (
    <>
      {header}
      {collects.map((collect) => {
        const content = smartQuotes(collect.text).replace(
          "Amen",
          "<em>Amen</em>",
        );
        const { largeText, rest } = splitCollectOpening(content);
        return (
          <Fragment key={collect.title}>
            <Title>
              <em>
                <small>
                  <Grey text={`For ${collect.title}`} />
                </small>
              </em>
            </Title>
            <StyledText>
              <Large text={largeText} />
              <CollectText text={rest} />
            </StyledText>
          </Fragment>
        );
      })}
    </>
  );
};

export function splitCollectOpening(text: string): {
  largeText: string;
  rest: string;
} {
  const firstCommaIndex = text.indexOf(",");
  if (firstCommaIndex === -1) {
    const [firstWord, ...restWords] = text.split(" ");

    return {
      largeText: firstWord,
      rest: restWords.length ? ` ${restWords.join(" ")}` : "",
    };
  }

  const opening = text.slice(0, firstCommaIndex + 1);
  const openingWords = opening.replace(/,$/, "").trim().split(/\s+/);

  if (shouldUseFullOpening(openingWords)) {
    return {
      largeText: opening,
      rest: text.slice(opening.length),
    };
  }

  const largeWordCount = openingWords[0].toLowerCase() === "o" ? 2 : 1;
  const largeText = openingWords.slice(0, largeWordCount).join(" ");

  return {
    largeText,
    rest: text.slice(largeText.length),
  };
}

function shouldUseFullOpening(words: string[]): boolean {
  if (words.length === 1) {
    return true;
  }

  const firstWord = words[0].toLowerCase();
  const lastWord = words[words.length - 1].toLowerCase();
  const isDivineAddress = ["god", "lord", "father", "christ"].includes(
    lastWord,
  );

  if (firstWord === "o") {
    return words.length <= 3;
  }

  return words.length <= 3 && isDivineAddress;
}

const CollectText: React.FC<{ text: string }> = ({ text }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(
        smartQuotes(text).replaceAll("·", '<span class="dot"></span>'),
      ),
    }}
  />
);

const Wrapper = styled("div")({
  marginBottom: "1.5rem",
});

const Title = styled("p")({
  marginBottom: "-11px",
});

const Text = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  fontStyle: "italic",
  color: theme.palette.brand.darkGrey,
}));

const StyledText = styled("p")(({ theme }) => ({
  ".dot": {
    color: theme.palette.brand.red,
    position: "relative",
    top: "2px",

    "&:before": {
      content: "'·'",
      lineHeight: "1.5rem",
      fontSize: "1.75rem",
    },
  },
}));
