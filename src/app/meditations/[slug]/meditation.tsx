"use client";
import { Initial } from "@/components/text/Initial";
import dayjs from "dayjs";
import { PostMeta } from "../actions";
import Link from "@/components/Link";
import { typography } from "@/assets/styles";
import { Button } from "@mui/material";

interface Props {
  postMeta: PostMeta;
  children: React.ReactNode;
}

export const Meditation: React.FC<Props> = ({ postMeta, children }) => (
  <>
    <Initial text={postMeta.title} />
    {postMeta.categories.map((category) => (
      <Button
        key={category}
        variant="text"
        component={Link}
        href={`/meditations?category=${category}`}
        sx={(theme) => ({
          ...typography.body1,
          color: theme.palette.brand.grey,
          border: `1px solid ${theme.palette.brand.border}`,
          textTransform: "none",
          margin: "20px 10px 10px 0",
        })}
      >
        #{category}
      </Button>
    ))}
    <p>{dayjs(postMeta.date).format("MMM D, YYYY")}</p>
    {children}
  </>
);
