"use client";
import { Menu, Search } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";

interface Props {
  onMenuClick: () => void;
}

export const Header: React.FC<Props> = ({ onMenuClick }) => (
  <Wrapper>
    <MenuButton onClick={onMenuClick}>
      <Menu />
    </MenuButton>
    <SearchButton>
      <Search />
    </SearchButton>
  </Wrapper>
);

const Wrapper = styled("header")({
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 12px 0",
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
