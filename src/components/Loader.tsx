import { CircularProgress, styled } from "@mui/material";

export const Loader = () => (
  <Wrapper>
    <CircularProgress color="inherit" thickness={2.5} size={50} />
  </Wrapper>
);

const Wrapper = styled("div")(({ theme }) => ({
  color: theme.palette.brand.black,
  display: "flex",
  justifyContent: "center",
  paddingTop: "80px",
}));
