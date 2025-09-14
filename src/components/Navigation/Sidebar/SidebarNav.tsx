"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { menuItems, MenuNode } from "@/app/menu";
import {
  List as ListBase,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";

export const SidebarNav = () => {
  const router = useRouter();

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
    } else {
      setPath(path.slice(0, -1));
    }
  };

  return (
    <nav>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleBack}>
            {path.length > 0 && <ChevronLeft />}
            <ListItemText primary={backText} />
          </ListItemButton>
        </ListItem>

        {path.length > 0 && (
          <ListItem disablePadding>
            <ListItemButton component={Link} href={path[path.length - 1].link}>
              <ListItemText primary={path[path.length - 1].title} />
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
              <ListItemButton component={Link} href={node.link}>
                <ListItemText primary={node.title} />
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
