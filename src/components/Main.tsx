"use client";
import { styled } from "@mui/material";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_LG } from "./Navigation/Sidebar";
import { HEADER_HEIGHT } from "./Navigation";
import { useLoading } from "./LoadingProvider";

interface Props {
  children: React.ReactNode;
}

export const MAIN_WIDTH = 600;

export const Main: React.FC<Props> = ({ children }) => {
  const { isLoading } = useLoading();

  return (
    <Wrapper>
      <Inner>
        <LoadingWrapper isLoading={isLoading}>{children}</LoadingWrapper>
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled("main")(({ theme }) => ({
  marginTop: HEADER_HEIGHT,
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  padding: "20px",

  [theme.breakpoints.up("md")]: {
    padding: `20px 20px 20px ${SIDEBAR_WIDTH + 20}px`,
  },
  [theme.breakpoints.up("lg")]: {
    padding: `20px 20px 20px ${SIDEBAR_WIDTH_LG + 20}px`,
  },
}));

const Inner = styled("div")({
  maxWidth: MAIN_WIDTH,
  margin: "0 auto 40px",

  h2: {
    scrollMarginTop: HEADER_HEIGHT + 20,
  },
});

const LoadingWrapper = styled("span", {
  shouldForwardProp: (prop) => prop !== "isLoading",
})<{ isLoading: boolean }>(({ isLoading }) => ({
  opacity: isLoading ? 0 : 1,
  transition: "opacity 0.3s ease-in-out",
}));
