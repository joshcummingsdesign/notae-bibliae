"use client";

import { styled } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  file: string;
}

export const Mermaid: React.FC<Props> = ({ file }) => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/mermaid/${file}.mmd`)
      .then((res) => res.text())
      .then((text) => setData(text));
  }, [file]);

  useEffect(() => {
    if (data && window.mermaid) {
      window.mermaid.initialize({ startOnLoad: true });
      window.mermaid.contentLoaded();
    }
  }, [data]);

  return <Wrapper className="mermaid">{data}</Wrapper>;
};

const Wrapper = styled("div")(({ theme }) => ({
  overflow: "auto",
  width: "100%",
  height: 500,
  border: `1px solid ${theme.palette.brand.border}`,
  background: theme.palette.brand.white,
  color: theme.palette.brand.white,
}));
