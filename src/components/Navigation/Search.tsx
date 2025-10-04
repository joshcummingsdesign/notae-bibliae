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

  const additionalItems: MenuItem[] = [
    {
      title: "Peter Waldo",
      link: "/meditations/a-brief-history-of-the-reformation-part-2#peter-waldo",
    },
    {
      title: "John Wycliffe",
      link: "/meditations/a-brief-history-of-the-reformation-part-2#john-wycliffe",
    },
    {
      title: "Jan Hus",
      link: "/meditations/a-brief-history-of-the-reformation-part-2#jan-hus",
    },
    {
      title: "Erasmus",
      link: "/meditations/a-brief-history-of-the-reformation-part-3#erasmus",
    },
    {
      title: "Martin Luther",
      link: "/meditations/a-brief-history-of-the-reformation-part-3#martin-luther",
    },
    {
      title: "Ulrich Zwingli",
      link: "/meditations/a-brief-history-of-the-reformation-part-3#ulrich-zwingli",
    },
    {
      title: "William Tyndale",
      link: "/meditations/a-brief-history-of-the-reformation-part-3#william-tyndale",
    },
    {
      title: "John Calvin",
      link: "/meditations/a-brief-history-of-the-reformation-part-3#john-calvin",
    },
    {
      title: "Thomas Cranmer",
      link: "/meditations/a-brief-history-of-the-reformation-part-3#the-book-of-common-prayer",
    },
    {
      title: "Jacobus Arminius",
      link: "/meditations/a-brief-history-of-the-reformation-part-3#jacobus-arminius",
    },
    {
      title: "Thomas Helwys",
      link: "/meditations/a-brief-history-of-the-reformation-part-4#the-baptist-church",
    },
    {
      title: "Roger Williams",
      link: "/meditations/a-brief-history-of-the-reformation-part-4#roger-williams",
    },
    {
      title: "John Gill",
      link: "/meditations/a-brief-history-of-the-reformation-part-4#john-gill",
    },
    {
      title: "John Wesley",
      link: "/meditations/a-brief-history-of-the-reformation-part-4#john-wesley",
    },
  ];

  const options = [...postItems, ...additionalItems, ...flattenMenu(menuItems)]
    .map((item) => ({
      ...item,
      title: item.title.replace(
        /A Brief History of the Reformation, Part (\d): (.*)/,
        "Reformation, Part $1: $2"
      ),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

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
            renderInput={(params) => <SearchInput {...params} label="Search" />}
          />
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
