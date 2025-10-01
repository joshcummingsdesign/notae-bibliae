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

  const [activeId, setActiveId] = useState("");

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -90% 0px",
        threshold: 0,
      }
    );

    headings.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
            <ListItemText primary="Title" selected={true} />
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
  color: selected ? theme.palette.brand.red : theme.palette.brand.black,
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  transform: "scale(0.8)",
  zIndex: 1,
  top: "6px",
  right: "8px",
  color: theme.palette.brand.black,
}));
