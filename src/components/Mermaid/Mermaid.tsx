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

  ".node": {
    rect: {
      fill: `${theme.palette.brand.xLightGrey} !important`,
      stroke: `${theme.palette.brand.grey} !important`,
      rx: `8px !important`,
      ry: `8px !important`,
    },

    "&.female": {
      rect: {
        fill: `${theme.palette.brand.offWhite} !important`,
      },
    },
  },

  ".nodeLabel": {
    color: `${theme.palette.brand.black} !important`,
    ...theme.typography.body1,
    fontWeight: theme.typography.fontWeightBold,
    em: {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },

  ".flowchart-link": {
    stroke: `${theme.palette.brand.lightGrey} !important`,
  },

  ".edgeLabel, .edgeLabel p, .labelBkg": {
    backgroundColor: `${theme.palette.brand.white} !important`,
    color: theme.palette.brand.black,
    ...theme.typography.body1,
  },
}));
