"use client";
import { useEffect, useRef } from "react";
import { Close } from "@mui/icons-material";
import { menuItems, MenuNode } from "@/app/menu";
import { Post } from "@/app/meditations/actions";
import {
  Modal as ModalBase,
  Autocomplete,
  styled,
  TextField,
  IconButton,
  ClickAwayListener,
} from "@mui/material";

interface Props {
  posts: Post[];
  open: boolean;
  onChange: (link: string) => void;
  onClose: () => void;
}

interface MenuItem {
  title: string;
  link: string;
}

/**
 * Flatten menu into an array of titles and links.
 */
const flattenMenu = (nodes: MenuNode[]): MenuItem[] => {
  const result: MenuItem[] = [];

  function recurse(nodeList: MenuNode[]) {
    for (const node of nodeList) {
      let title = node.title;

      if (node.link.includes("/meditations?")) {
        title = `Meditations: ${node.title}`;
      }

      result.push({ title, link: node.link });

      if (node.children) {
        recurse(node.children);
      }
    }
  }

  recurse(nodes);
  return result;
};

export const Search: React.FC<Props> = ({ posts, open, onChange, onClose }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const postItems: MenuItem[] = posts.map((post) => ({
    title: post.title,
    link: `/meditations/${post.slug}`,
  }));

  const options = [...postItems, ...flattenMenu(menuItems)].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          const input = inputRef.current.querySelector("input");
          if (input) {
            input.focus();
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <CloseButton onClick={() => onClose()}>
          <Close />
        </CloseButton>
        <ModalContent>
          <ClickAwayListener onClickAway={() => onClose()}>
            <Autocomplete<MenuItem>
              ref={inputRef}
              disablePortal
              options={options}
              onChange={(_, value) => {
                value && onChange(value.link);
                onClose();
              }}
              getOptionLabel={(option) => option.title}
              isOptionEqualToValue={(option: any, value: any) =>
                option.title === value.title
              }
              renderInput={(params) => (
                <SearchInput {...params} label="Search" />
              )}
            />
          </ClickAwayListener>
        </ModalContent>
      </div>
    </Modal>
  );
};

const Modal = styled(ModalBase)(({ theme }) => ({
  ".MuiBackdrop-root": {
    backgroundColor: "rgba(255, 255, 255, 0.96)",
  },

  ".MuiPaper-root": {
    boxShadow: "none",
    borderRadius: 0,
    background: "transparent",

    ".MuiAutocomplete-listbox": {
      maxHeight: "80vh",

      "li[aria-selected='true']": {
        backgroundColor: theme.palette.brand.hover,
      },
    },

    ".MuiAutocomplete-endAdornment": {
      display: "none",
    },
  },
}));

const ModalContent = styled("div")({
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: 550,
  textAlign: "center",
  padding: "20px",
  outline: "none",
});

const SearchInput = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.brand.black,
    borderWidth: 1,
  },

  label: {
    color: `${theme.palette.brand.black} !important`,
  },

  fieldset: {
    border: "none",
    borderRadius: 0,
    borderBottom: `1px solid ${theme.palette.brand.black}`,
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  zIndex: 1,
  top: "12px",
  right: "12px",
  color: theme.palette.brand.black,
}));
