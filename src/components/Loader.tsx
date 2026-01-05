"use client";
import { keyframes, styled } from "@mui/material";

export const Loader = () => (
  <Wrapper role="status">
    <SpinningCircle aria-hidden="true" />
    <SrOnly>Loading…</SrOnly>
  </Wrapper>
);

const Wrapper = styled("div")(({ theme }) => ({
  color: theme.palette.brand.black,
  display: "flex",
  justifyContent: "center",
  paddingTop: "60px",
}));

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinningCircle = styled("div")(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: "50%",
  position: "relative",
  background: `conic-gradient(#111 0deg, ${theme.palette.brand.black} 180deg, transparent 180deg 360deg)`,
  animation: `${spin} 1s linear infinite`,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 4,
    borderRadius: "50%",
    background: theme.palette.brand.white,
  },
}));

const SrOnly = styled("span")({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
});
