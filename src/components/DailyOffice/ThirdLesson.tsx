"use client";
import { fontWeights } from "@/assets/styles";
import { ThirdLessonData } from "@/models/lectionary";
import { styled } from "@mui/material";
import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";

interface Props {
  lesson?: ThirdLessonData;
}

export const ThirdLesson: React.FC<Props> = ({ lesson }) => {
  return lesson ? (
    <>
      <h2>Third Lesson</h2>
      <p>
        [ <em>Sit</em> ]
      </p>
      <TextWrap>
        <Markdown
          remarkPlugins={[remarkSmartypants]}
          components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> }}
        >
          {lesson.title}
        </Markdown>
      </TextWrap>
    </>
  ) : null;
};

const TextWrap = styled("div")({
  a: {
    fontWeight: fontWeights.bold,
  },
});
