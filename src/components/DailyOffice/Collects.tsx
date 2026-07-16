"use client";
import { Fragment } from "react";
import { styled } from "@mui/material";
import { CollectItem } from "@/models/collects";
import Link from "next/link";
import { Definition } from "../Definition";
import DOMPurify from "isomorphic-dompurify";
import { Large } from "../text/Large";

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
      {collects.map((collect, i) => {
        let content = collect.text.replace("Amen", "<em>Amen</em>");
        const [firstWord, ...restWords] = content.split(" ");
        const rest = restWords.join(" ");
        return (
          <Fragment key={collect.title}>
            <StyledText>
              <Large text={firstWord} /> <CollectText text={rest} />
            </StyledText>
          </Fragment>
        );
      })}
    </>
  );
};

const CollectText: React.FC<{ text: string }> = ({ text }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(
        text.replaceAll("·", '<span class="dot"></span>'),
      ),
    }}
  />
);

const Wrapper = styled("div")({
  marginBottom: "1.5rem",
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
