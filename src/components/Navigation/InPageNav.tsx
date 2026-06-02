"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Close } from "@mui/icons-material";
import {
  IconButton,
  List as ListBase,
  ListItem,
  ListItemButton,
  ListItemText as ListItemTextBase,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { usePathname } from "next/navigation";

interface Props {
  style: React.CSSProperties;
  onBack: () => void;
  onClose: () => void;
  shouldInit: boolean;
}

export const InPageNav: React.FC<Props> = ({
  style,
  onBack,
  onClose,
  shouldInit,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const pathname = usePathname();

  const [activeId, setActiveId] = useState("title");

  const headings = useRef<HTMLElement[]>([]);

  // Build heading list
  useEffect(() => {
    if (!shouldInit) return;

    headings.current = Array.from(document.querySelectorAll("h2")).filter(
      (h2) => h2.id && h2.textContent
    );
  }, [pathname, headings.current, shouldInit]);

  // Highlight active heading
  useEffect(() => {
    if (!shouldInit) return;

    const isAtBottom = () => {
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      return window.innerHeight + window.scrollY >= scrollHeight - 50;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (isAtBottom() && headings.current.length > 0) {
              setActiveId(headings.current[headings.current.length - 1].id);
            } else {
              setActiveId(entry.target.id);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -90% 0px",
        threshold: 0,
      }
    );

    const titleEl = document.getElementById("title");
    if (titleEl) observer.observe(titleEl);
    headings.current.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      if (isAtBottom() && headings.current.length > 0) {
        setActiveId(headings.current[headings.current.length - 1].id);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, headings.current, shouldInit]);

  return (
    <nav style={style}>
      <List>
        <ListHeaderItem disablePadding>
          <ListItemButton onClick={onBack}>
            <ChevronLeft />
            <ListItemText primary="Back" />
          </ListItemButton>
          {!isDesktop && (
            <CloseButton onClick={onClose}>
              <Close />
            </CloseButton>
          )}
        </ListHeaderItem>

        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="#title"
            onClick={!isDesktop ? onClose : undefined}
          >
            <ListItemText primary="Title" selected={activeId === "title"} />
          </ListItemButton>
        </ListItem>

        {headings.current.map((h) => (
          <ListItem key={h.id} disablePadding>
            <ListItemButton
              component="a"
              href={`#${h.id}`}
              onClick={!isDesktop ? onClose : undefined}
            >
              <ListItemText
                primary={h.textContent}
                selected={activeId === h.id}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </nav>
  );
};

const List = styled(ListBase)({
  padding: 0,
});

const ListHeaderItem = styled(ListItem)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1,
  borderBottom: `1px solid ${theme.palette.brand.border}`,
  backgroundColor: theme.palette.brand.white,
}));

const ListItemText = styled(ListItemTextBase, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  ".MuiTypography-root": {
    color: selected ? theme.palette.brand.red : theme.palette.brand.black,
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  transform: "scale(0.8)",
  zIndex: 1,
  top: "6px",
  right: "8px",
  color: theme.palette.brand.black,
}));
