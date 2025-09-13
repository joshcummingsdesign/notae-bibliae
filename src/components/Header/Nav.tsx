"use client";
import { menuItems, MenuNode } from "@/app/menu";
import { useState } from "react";

export const Nav = () => {
  const [path, setPath] = useState<MenuNode[]>([]);

  // Determine the current list to display
  const currentList =
    path.length === 0 ? menuItems : path[path.length - 1].children || [];

  const handleClick = (node: MenuNode) => {
    if (node.children && node.children.length > 0) {
      // Drill down into children
      setPath([...path, node]);
    }
    // Leaf nodes are handled by Link below
  };

  const handleBack = () => {
    setPath(path.slice(0, -1));
  };

  return (
    <div>
      {/* Back button */}
      {path.length > 0 && (
        <button onClick={handleBack} style={{ marginBottom: "0.5rem" }}>
          ← Back
        </button>
      )}

      {/* Current list */}
      <ul>
        {currentList.map((node) => (
          <li key={node.link} style={{ marginBottom: "0.25rem" }}>
            {node.children && node.children.length > 0 ? (
              <button
                onClick={() => handleClick(node)}
                style={{ cursor: "pointer" }}
              >
                {node.title}
              </button>
            ) : (
              <button onClick={() => alert(node.link)}>{node.title}</button>
            )}
          </li>
        ))}
      </ul>

      {/* Breadcrumb */}
      {path.length > 0 && (
        <div style={{ marginTop: "1rem", fontStyle: "italic" }}>
          Breadcrumb: {path.map((n) => n.title).join(" > ")}
        </div>
      )}
    </div>
  );
};
