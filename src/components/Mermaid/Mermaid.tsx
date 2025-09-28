"use client";

import { styled } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  file: string;
  fullScreen?: boolean;
}

export const Mermaid: React.FC<Props> = ({ file, fullScreen }) => {
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

  return (
    <Wrapper className="mermaid" fullScreen={fullScreen}>
      {data}
    </Wrapper>
  );
};

const Wrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "fullScreen",
})<{ fullScreen?: boolean }>(({ theme, fullScreen }) => ({
  overflow: "auto",
  width: "100%",
  margin: "2em 0",
  height: fullScreen ? undefined : 500,
  border: fullScreen ? undefined : `1px solid ${theme.palette.brand.border}`,
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

    p: {
      fontSize: "1.25rem",
      lineHeight: "1.2",
    },

    em: {
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: "0.875em",
    },

    small: {
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: "0.6875em",
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
