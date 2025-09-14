"use client";
import { Menu, Search as SearchIcon } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import { Search } from "./Search";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  onMenuClick: () => void;
}

export const HEADER_HEIGHT = 52;

export const Header: React.FC<Props> = ({ onMenuClick }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

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
        open={open}
        onChange={(link) => router.push(link)}
        onClose={() => setOpen(false)}
      />
    </Wrapper>
  );
};

const Wrapper = styled("header")({
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 12px 0",
  height: HEADER_HEIGHT,
});

const MenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.brand.black,

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

  "& .MuiTouchRipple-ripple": {
    color: theme.palette.brand.ripple,
  },
}));
