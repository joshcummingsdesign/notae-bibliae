"use client";
import { Menu, Search as SearchIcon } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import { Search } from "./Search";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLoading } from "../Providers";

interface Props {
  onMenuClick: () => void;
}

export const HEADER_HEIGHT = 52;

export const Header: React.FC<Props> = ({ onMenuClick }) => {
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
        open={open}
        onChange={(link) => {
          if (pathname !== link.split("?")[0]) {
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
  zIndex: 1,
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
