"use client";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useMediaQuery, useTheme } from "@mui/material";

export const Navigation = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = useState(isDesktop);

  useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Header onMenuClick={toggleDrawer(true)} />
      <Sidebar open={open} onClose={toggleDrawer(false)} />
    </>
  );
};
