"use client";
import { styled } from "@mui/material";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_LG } from "./Navigation/Sidebar";
import { HEADER_HEIGHT } from "./Navigation";

interface Props {
  children: React.ReactNode;
}

export const MAIN_WIDTH = 600;

export const Main: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Inner>{children}</Inner>
    </Wrapper>
  );
};

const Wrapper = styled("main")(({ theme }) => ({
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  padding: "0 20px 20px",

  [theme.breakpoints.up("md")]: {
    padding: `0 20px 20px ${SIDEBAR_WIDTH + 20}px`,
  },
  [theme.breakpoints.up("lg")]: {
    padding: `0 20px 20px ${SIDEBAR_WIDTH_LG + 20}px`,
  },
}));

const Inner = styled("div")({
  maxWidth: MAIN_WIDTH,
  margin: "0 auto",
});
