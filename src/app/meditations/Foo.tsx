"use client";
import { Initial } from "@/components/text/Initial";
import { Post } from "./actions";
import { Link } from "@/components/Link";
import { Autocomplete, styled, TextField } from "@mui/material";
import { fonts } from "@/assets/styles";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPaginationRange, paginatePosts } from "./pagination";

interface Props {
  allPosts: Post[];
  perPage?: number;
}

export const Meditations: React.FC<Props> = ({ allPosts, perPage = 8 }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const allCategories = [
    ...new Set(["All", ...allPosts.flatMap((post) => post.categories)]),
  ].sort((a, b) => a.localeCompare(b));

  // Filter by category
  const categoryParam = searchParams.get("category");
  const [category, setCategory] = useState<string>(categoryParam || "All");
  const filteredPosts =
    category && category !== "All"
      ? allPosts.filter((post) => post.categories.includes(category))
      : allPosts;

  // Pagination
  const page = parseInt(searchParams.get("page") || "1", 10);
  const { posts, totalPages } = paginatePosts(filteredPosts, page, perPage);

  // Update category state on param change
  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
    } else {
      setCategory("All");
    }
  }, [categoryParam]);

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("page");

    if (!value || value === "All") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    router.push(`?${params.toString()}`);

    setCategory(value);
  };

  const handlePageChange = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (p === 1) {
      params.delete("page");
    } else {
      params.set("page", String(p));
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <Initial text="Meditations" />
      <Category>
        <Autocomplete<string, false, true>
          value={category}
          disableClearable={true}
          disablePortal={true}
          options={allCategories}
          onChange={(_, value) => handleCategoryChange(value)}
          renderInput={(params) => (
            <CategoryInput {...params} label="Category" />
          )}
        />
      </Category>
      <Posts>
        {posts.map((post) => {
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
      {totalPages > 1 && (
        <Pagination>
          {getPaginationRange(page, totalPages).map((p, i) =>
            typeof p === "number" ? (
              <PaginationButton
                key={i}
                selected={p === page}
                aria-current={page === p ? "page" : undefined}
                aria-label={`Page ${p}`}
                onClick={() => handlePageChange(p)}
              >
                {p}
              </PaginationButton>
            ) : (
              <PaginationEllipsis key={i}>{p}</PaginationEllipsis>
            )
          )}
        </Pagination>
      )}
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
  padding: "10px 0",
  borderRadius: "4px",
  maxWidth: "450px",
  color: "inherit",
  textDecoration: "none !important",

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
  marginTop: "30px",

  ".MuiPaper-root": {
    boxShadow: "none",
    borderRadius: 0,
    border: `1px solid ${theme.palette.brand.border}`,
    borderTop: "none",

    ".MuiAutocomplete-listbox": {
      maxHeight: "80vh",

      "li[aria-selected='true']": {
        backgroundColor: theme.palette.brand.hover,
      },
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

const Pagination = styled("div")({
  margin: "40px 0",
});

const PaginationButton = styled("button", {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ theme, selected }) => ({
  ...theme.typography.body1,
  fontWeight: selected
    ? theme.typography.fontWeightBold
    : theme.typography.fontWeightRegular,
  color: selected ? theme.palette.brand.red : theme.palette.brand.black,
  marginRight: "0.5rem",
  background: "none",
  border: "none",
  cursor: "pointer",
}));

const PaginationEllipsis = styled("span")({
  marginRight: "0.5rem",
});
