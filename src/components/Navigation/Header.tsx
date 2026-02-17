"use client";
import { Menu, Search as SearchIcon } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import { Search } from "./Search";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLoading } from "../Providers";
import { Post } from "@/app/meditations/actions";
import { Terms } from "@/app/glossary/liturgical-terms/actions";
import { Names } from "@/app/glossary/names/actions";
import { HistoricalTerms } from "@/app/glossary/historical-terms/actions";

interface Props {
  posts: Post[];
  names: Names[];
  terms: Terms[];
  historicalTerms: HistoricalTerms[];
  onMenuClick: () => void;
}

export const HEADER_HEIGHT = 52;

export const Header: React.FC<Props> = ({
  posts,
  names,
  terms,
  historicalTerms,
  onMenuClick,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading } = useLoading();

  const [open, setOpen] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!open && event.ctrlKey && event.key.toLowerCase() === "p") {
      setOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pathname]);

  return (
    <Wrapper>
      <MenuButton onClick={onMenuClick} aria-label="Menu">
        <Menu />
      </MenuButton>
      <SearchButton
        open={open}
        aria-label="Search"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
      </SearchButton>
      <Search
        posts={posts}
        names={names}
        terms={terms}
        historicalTerms={historicalTerms}
        open={open}
        onChange={(link) => {
          const linkPathname = link.split("?")[0].split("#")[0];
          if (pathname !== linkPathname) {
            setIsLoading(true);
          }
          router.push(link);
        }}
        onClose={() => setOpen(false)}
      />
    </Wrapper>
  );
};

const Wrapper = styled("header")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 2,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 12px",
  height: HEADER_HEIGHT,
  borderBottom: `1px solid ${theme.palette.brand.border}`,
  backgroundColor: theme.palette.brand.white,
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.brand.black,
  height: `${HEADER_HEIGHT - 12}px`,
  width: `${HEADER_HEIGHT - 12}px`,

  [theme.breakpoints.up("md")]: {
    visibility: "hidden",
  },

  "& .MuiTouchRipple-ripple": {
    color: theme.palette.brand.ripple,
  },
}));

const SearchButton = styled(IconButton, {
  shouldForwardProp: (prop: string) => !["open"].includes(prop),
})<{ open: boolean }>(({ theme, open }) => ({
  visibility: open ? "hidden" : "visible",
  color: theme.palette.brand.black,
  height: `${HEADER_HEIGHT - 12}px`,
  width: `${HEADER_HEIGHT - 12}px`,

  "& .MuiTouchRipple-ripple": {
    color: theme.palette.brand.ripple,
  },
}));
