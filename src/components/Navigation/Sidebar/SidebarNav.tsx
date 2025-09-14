"use client";
import { useState } from "react";
import { ChevronLeft } from "@mui/icons-material";
import { menuItems, MenuNode } from "@/app/menu";
import {
  List as ListBase,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";

export const SidebarNav = () => {
  const [path, setPath] = useState<MenuNode[]>([]);

  const currentList =
    path.length === 0 ? menuItems : path[path.length - 1].children || [];

  const heading = path.length === 0 ? "Home" : path[path.length - 1]?.title;

  const handleClick = (node: MenuNode) => {
    if (node.children && node.children.length > 0) {
      setPath([...path, node]);
    }
  };

  const handleBack = () => {
    if (path.length === 0) {
      alert("/");
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
            <ListItemText primary={heading} />
          </ListItemButton>
        </ListItem>

        {currentList.map((node) => (
          <ListItem key={node.link} disablePadding>
            {node.children && node.children.length > 0 ? (
              <ListItemButton onClick={() => handleClick(node)}>
                <ListItemText primary={node.title} />
              </ListItemButton>
            ) : (
              <ListItemButton onClick={() => alert(node.link)}>
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
