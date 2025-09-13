"use client";
import { Close } from "@mui/icons-material";
import { SidebarNav } from "./SidebarNav";
import {
  ClickAwayListener,
  Drawer as DrawerBase,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
  open: boolean;
  onClose: () => void;
}

export const SIDEBAR_WIDTH = 250;
export const SIDEBAR_WIDTH_LG = 300;

export const Sidebar: React.FC<Props> = ({ className, open, onClose }) => {
  const theme = useTheme();
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [isClosable, setIsClosable] = useState(false);

  // Use timeout to allow for click away listener
  useEffect(() => {
    if (!isDesktop && open) {
      timeoutRef.current = setTimeout(() => {
        setIsClosable(true);
      }, 100);
    } else {
      setIsClosable(false);
      timeoutRef.current && clearTimeout(timeoutRef.current);
    }

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [isDesktop, open, timeoutRef]);

  return (
    <ClickAwayListener
      onClickAway={() => !isDesktop && isClosable && onClose()}
    >
      <Drawer
        className={className}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerContent>
          {!isDesktop && (
            <CloseButton onClick={onClose}>
              <Close />
            </CloseButton>
          )}
          <SidebarNav />
        </DrawerContent>
      </Drawer>
    </ClickAwayListener>
  );
};

const Drawer = styled(DrawerBase)(({ theme }) => ({
  width: SIDEBAR_WIDTH,
  flexShrink: 0,

  [theme.breakpoints.up("lg")]: {
    width: SIDEBAR_WIDTH_LG,
  },

  "& .MuiDrawer-paper": {
    width: SIDEBAR_WIDTH,
    boxSizing: "border-box",

    [theme.breakpoints.up("lg")]: {
      width: SIDEBAR_WIDTH_LG,
    },
  },
}));

const DrawerContent = styled("div")({
  position: "relative",
  minHeight: "100vh",
});

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: "8px",
  right: "8px",
});
