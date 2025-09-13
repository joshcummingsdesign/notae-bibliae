"use client";
import { useState } from "react";
import { Box, Drawer, IconButton, ListItemButton, styled } from "@mui/material";
import { Menu, Search } from "@mui/icons-material";
import { fontWeights } from "@/assets/styles";
import { Nav } from "./Nav";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <header>
      <Navigation>
        <MenuButton onClick={toggleDrawer(true)}>
          <Menu />
        </MenuButton>
        <SearchButton>
          <Search />
        </SearchButton>
      </Navigation>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerContent role="presentation">
          <Nav />
          {/* <List>
            {Object.entries(menuItems).map(([key, value]) => (
              <ListItem key={key} disablePadding>
                <ItemButton>
                  <ListItemText primary={key} />
                </ItemButton>
              </ListItem>
            ))}
          </List> */}
        </DrawerContent>
      </Drawer>
    </header>
  );
};

const Navigation = styled("nav")({
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 12px 0",
});

const MenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.brand.black,

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

const ItemButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.brand.black,

  "& .MuiTouchRipple-ripple": {
    color: theme.palette.brand.ripple,
  },

  ".MuiTypography-root": {
    fontWeight: `${fontWeights.bold}`,
  },
}));

const DrawerContent = styled(Box)({
  width: "300px",
});
