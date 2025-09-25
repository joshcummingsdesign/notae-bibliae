import { FC } from "react";
import { Drawer, IconButton, styled, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import Markdown from "react-markdown";

interface Props {
  open: boolean;
  heading: string;
  text: string;
  onClose: () => void;
}

export const NotesDrawer: FC<Props> = ({ open, heading, text, onClose }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Wrapper>
      <CloseButton onClick={onClose} aria-label="close">
        <Close />
      </CloseButton>
      <Heading variant="h1">{heading}</Heading>
      <Content>
        <Markdown components={{ a: LinkRenderer }}>{text}</Markdown>
      </Content>
    </Wrapper>
  </Drawer>
);

const LinkRenderer = (props: any) => (
  <a href={props.href} target="_blank">
    {props.children}
  </a>
);

const Wrapper = styled("div")(({ theme }) => ({
  width: "100vw",

  [theme.breakpoints.up("sm")]: {
    width: 425,
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  padding: "60px 30px",
  backgroundColor: theme.palette.brand.border,
}));

const Content = styled("div")(({ theme }) => {
  const baseTypography: any = { ...theme.typography };
  delete baseTypography.body1;
  delete baseTypography.body2;

  return {
    ...baseTypography,
    ...theme.typography.body1,
    padding: "30px",

    h2: {
      ...theme.typography.h2,
      margin: "0 0 0.5em",
    },

    h3: {
      ...theme.typography.h3,
      margin: "0 0 0.5em",
    },

    p: {
      margin: "0 0 1em",
    },

    ul: {
      paddingLeft: "20px",
    },

    li: {
      margin: "0 0 10px",
    },
  };
});

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 5,
  right: 5,
  color: theme.palette.brand.black,

  "& .MuiTouchRipple-ripple": {
    color: theme.palette.brand.ripple,
  },
}));
