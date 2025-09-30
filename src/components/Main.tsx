"use client";
import { styled } from "@mui/material";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_LG } from "./Navigation/Sidebar";
import { HEADER_HEIGHT } from "./Navigation";
import { useLoading } from "./Providers";
import { LayoutCtx, useLayout } from "./Providers/LayoutProvider";

interface Props {
  children: React.ReactNode;
}

export const MAIN_WIDTH = 600;
export const MAIN_WIDTH_LG = 800;

export const Main: React.FC<Props> = ({ children }) => {
  const { isLoading } = useLoading();
  const { layout } = useLayout();

  return (
    <Wrapper layout={layout}>
      <Inner layout={layout}>
        <LoadingWrapper isLoading={isLoading}>{children}</LoadingWrapper>
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled("main", {
  shouldForwardProp: (prop) => prop !== "layout",
})<{ layout: LayoutCtx["layout"] }>(({ theme, layout }) => ({
  marginTop: HEADER_HEIGHT,
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  padding: layout === "full-width" ? undefined : "20px",

  [theme.breakpoints.up("md")]: {
    padding:
      layout === "full-width"
        ? `0 0 0 ${SIDEBAR_WIDTH}px`
        : `20px 20px 20px ${SIDEBAR_WIDTH + 20}px`,
  },
  [theme.breakpoints.up("lg")]: {
    padding:
      layout === "full-width"
        ? `0 0 0 ${SIDEBAR_WIDTH_LG}px`
        : `20px 20px 20px ${SIDEBAR_WIDTH_LG + 20}px`,
  },
}));

const Inner = styled("div", {
  shouldForwardProp: (prop) => prop !== "layout",
})<{ layout: LayoutCtx["layout"] }>(({ layout }) => ({
  maxWidth:
    layout === "full-width"
      ? undefined
      : layout === "wide"
      ? MAIN_WIDTH_LG
      : MAIN_WIDTH,
  margin: layout === "full-width" ? undefined : "0 auto 40px",

  "h2, [id]": {
    scrollMarginTop: HEADER_HEIGHT + 20,
  },
}));

const LoadingWrapper = styled("span", {
  shouldForwardProp: (prop) => prop !== "isLoading",
})<{ isLoading: boolean }>(({ isLoading }) => ({
  opacity: isLoading ? 0 : 1,
  transition: "opacity 0.3s ease-in-out",
}));
