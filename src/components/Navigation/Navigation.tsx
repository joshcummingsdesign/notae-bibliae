"use client";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useMediaQuery, useTheme } from "@mui/material";
import { MainMenu } from "./MainMenu";
import { InPageNav } from "./InPageNav";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);
  const [inPageNavOpen, setInPageNavOpen] = useState(false);
  const [shouldInitInPageNav, setShouldInitInPageNav] = useState(false);

  const toggleSidebar = (open: boolean) => () => {
    setSidebarOpen(open);
  };

  const toggleInPageNav = (open: boolean) => () => {
    setInPageNavOpen(open);
  };

  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    setInPageNavOpen(false);
  }, [pathname]);

  return (
    <>
      <Header onMenuClick={toggleSidebar(true)} />
      <Sidebar open={sidebarOpen} onClose={toggleSidebar(false)}>
        <InPageNav
          style={{ display: inPageNavOpen ? "block" : "none" }}
          onBack={toggleInPageNav(false)}
          onClose={toggleSidebar(false)}
          shouldInit={shouldInitInPageNav}
        />
        <MainMenu
          style={{ display: inPageNavOpen ? "none" : "block" }}
          onClose={toggleSidebar(false)}
          onInPageNavOpen={toggleInPageNav(true)}
          onInitInPageNav={setShouldInitInPageNav}
        />
      </Sidebar>
    </>
  );
};
