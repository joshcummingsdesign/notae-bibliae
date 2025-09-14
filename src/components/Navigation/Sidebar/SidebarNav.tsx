"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Home } from "@mui/icons-material";
import { menuItems, MenuNode } from "@/app/menu";
import {
  IconButton,
  List as ListBase,
  ListItem,
  ListItemButton,
  ListItemText as ListItemTextBase,
  styled,
} from "@mui/material";

interface Props {
  onClose: () => void;
}

/**
 * Find the path by link.
 */
const findPath = (
  nodes: MenuNode[],
  link: string,
  currentPath: MenuNode[] = []
): MenuNode[] | null => {
  for (const node of nodes) {
    const newPath = [...currentPath, node];
    if (node.link === link) return newPath;
    if (node.children) {
      const childPath = findPath(node.children, link, newPath);
      if (childPath) return childPath;
    }
  }
  return null;
};

export const SidebarNav: React.FC<Props> = ({ onClose }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [path, setPath] = useState<MenuNode[]>([]);

  const currentList =
    path.length === 0 ? menuItems : path[path.length - 1].children || [];

  const backText = path.length <= 1 ? "Home" : path[path.length - 2]?.title;

  const handleClick = (node: MenuNode) => {
    if (node.children && node.children.length > 0) {
      setPath([...path, node]);
    }
  };

  const handleBack = () => {
    if (path.length === 0) {
      router.push("/");
      onClose();
    } else {
      setPath(path.slice(0, -1));
    }
  };

  const handleHome = () => {
    setPath([]);
  };

  // Set the path by the current pathname on mount
  useEffect(() => {
    // Find path to the current node itself
    const nodePath = findPath(menuItems, pathname);
    if (nodePath) {
      const currentNode = nodePath[nodePath.length - 1];
      // if current node has children, use it as active
      if (currentNode.children && currentNode.children.length > 0) {
        setPath(nodePath);
      } else if (nodePath.length > 1) {
        // otherwise, show parent as active
        setPath(nodePath.slice(0, -1));
      } else {
        // top-level leaf
        setPath([currentNode]);
      }
    }
  }, [pathname]);

  return (
    <nav>
      <List>
        <ListHeaderItem disablePadding>
          {path.length > 0 && (
            <IconButton
              component={Link}
              href="/"
              onClick={handleHome}
              sx={(theme) => ({
                position: "absolute",
                zIndex: 1,
                left: 0,
                transform: "scale(0.8)",
                color: theme.palette.brand.black,
              })}
            >
              <Home />
            </IconButton>
          )}
          <ListItemButton
            style={{ paddingLeft: path.length > 0 ? "34px" : undefined }}
            onClick={handleBack}
          >
            {path.length > 0 && <ChevronLeft />}
            <ListItemText
              selected={path.length === 0 && pathname === "/"}
              primary={backText}
            />
          </ListItemButton>
        </ListHeaderItem>

        {path.length > 0 && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href={path[path.length - 1].link}
              onClick={onClose}
            >
              <ListItemText
                selected={pathname === path[path.length - 1].link}
                primary={path[path.length - 1].title}
              />
            </ListItemButton>
          </ListItem>
        )}

        {currentList.map((node) => (
          <ListItem key={node.link} disablePadding>
            {node.children && node.children.length > 0 ? (
              <ListItemButton onClick={() => handleClick(node)}>
                <ListItemText primary={node.title} />
                <ChevronRight />
              </ListItemButton>
            ) : (
              <ListItemButton
                component={Link}
                href={node.link}
                onClick={onClose}
              >
                <ListItemText
                  selected={pathname === node.link}
                  primary={node.title}
                />
              </ListItemButton>
            )}
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
  position: "relative",
  borderBottom: `1px solid ${theme.palette.brand.border}`,
}));

const ListItemText = styled(ListItemTextBase, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  color: selected ? theme.palette.brand.red : theme.palette.brand.black,
}));
