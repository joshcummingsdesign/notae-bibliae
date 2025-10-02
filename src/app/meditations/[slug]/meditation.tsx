"use client";
import { Initial } from "@/components/text/Initial";
import dayjs from "dayjs";
import { PostMeta } from "../actions";
import { Link } from "@/components/Link";
import { Button, styled } from "@mui/material";

interface Props {
  postMeta: PostMeta;
  children: React.ReactNode;
}

export const Meditation: React.FC<Props> = ({ postMeta, children }) => (
  <>
    <Initial text={postMeta.title} />
    <Buttons>
      {postMeta.categories.map((category) => (
        <Button
          key={category}
          variant="text"
          component={Link}
          href={`/meditations?category=${category}`}
          sx={(theme) => ({
            ...theme.typography.body1,
            color: theme.palette.brand.grey,
            fontSize: "0.9375rem",
            border: `1px solid ${theme.palette.brand.border}`,
            textTransform: "none",
            margin: "5px 10px 5px 0",
          })}
        >
          #{category}
        </Button>
      ))}
    </Buttons>
    <p>{dayjs(postMeta.date).format("MMM D, YYYY")}</p>
    {children}
  </>
);

const Buttons = styled("div")({
  marginTop: "14px",
});
