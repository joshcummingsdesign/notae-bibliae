"use client";
import { Initial } from "@/components/text/Initial";
import { Post } from "./getAllPosts";
import Link from "next/link";
import { Autocomplete, styled, TextField } from "@mui/material";
import { fonts } from "@/assets/styles";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  posts: Post[];
}

export const Meditations: React.FC<Props> = ({ posts }) => {
  const router = useRouter();
  const params = useSearchParams();
  const categoryParam = params.get("category");
  const options = [
    ...new Set(["All", ...posts.flatMap((post) => post.categories)]),
  ];
  const [category, setCategory] = useState<string>(categoryParam || "All");

  const filteredPosts =
    category && category !== "All"
      ? posts.filter((post) => post.categories.includes(category))
      : posts;

  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
    } else {
      setCategory("All");
    }
  }, [categoryParam]);

  const handleChange = (value: string) => {
    const p = new URLSearchParams(params.toString());
    if (!value || value === "All") {
      p.delete("category");
    } else {
      p.set("category", value);
    }
    setCategory(value);
    router.push(`?${p.toString()}`);
  };

  return (
    <>
      <Initial text="Meditations" />
      <Category>
        <Autocomplete<string, false, true>
          value={category}
          disableClearable={true}
          disablePortal={true}
          options={options}
          onChange={(_, value) => handleChange(value)}
          renderInput={(params) => (
            <CategoryInput {...params} label="Category" />
          )}
        />
      </Category>
      <Posts>
        {filteredPosts.map((post) => {
          return (
            <PostWrap
              key={post.slug}
              href={`/meditations/${post.slug}`}
              aria-label={`${post.title} - ${post.date}`}
            >
              <PostHeading>{post.title}</PostHeading>
              <PostDate>{dayjs(post.date).format("MMM D, YYYY")}</PostDate>
              <PostDescription>{post.description}</PostDescription>
              <PostLink>Read</PostLink>
            </PostWrap>
          );
        })}
      </Posts>
    </>
  );
};

const Posts = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  margin: "40px 0",
  gap: "30px",
  flexDirection: "column",

  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const PostWrap = styled(Link)(({ theme }) => ({
  borderRadius: "4px",
  maxWidth: "450px",

  [theme.breakpoints.up("sm")]: {
    width: "calc(50% - 15px)",
  },
}));

const PostHeading = styled("h3")({
  fontFamily: fonts.fontBody,
  margin: 0,
});

const PostDate = styled("p")({
  display: "block",
  margin: "10px 0",
});

const PostDescription = styled("p")({
  margin: "10px 0",
});

const PostLink = styled("p")(({ theme }) => ({
  color: theme.palette.brand.red,
  margin: 0,
}));

const Category = styled("div")(({ theme }) => ({
  marginTop: "20px",

  ".MuiPaper-root": {
    boxShadow: "none",
    borderRadius: 0,
    border: `1px solid ${theme.palette.brand.border}`,
    borderTop: "none",

    ".MuiAutocomplete-listbox": {
      maxHeight: "80vh",
    },
  },
}));

const CategoryInput = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.brand.black,
    borderWidth: 1,
  },

  label: {
    color: `${theme.palette.brand.black} !important`,
  },

  fieldset: {
    border: "none",
    borderRadius: 0,
    borderBottom: `1px solid ${theme.palette.brand.border}`,
  },
}));
