"use client";
import { Menu, Search } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";

interface Props {
  onMenuClick: () => void;
}

export const HEADER_HEIGHT = 52;

export const Header: React.FC<Props> = ({ onMenuClick }) => (
  <Wrapper>
    <MenuButton onClick={onMenuClick} aria-label="Menu">
      <Menu />
    </MenuButton>
    <SearchButton aria-label="Search">
      <Search />
    </SearchButton>
  </Wrapper>
);

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

const SearchButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.brand.black,

  "& .MuiTouchRipple-ripple": {
    color: theme.palette.brand.ripple,
  },
}));
