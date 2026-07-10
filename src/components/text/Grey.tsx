"use client";
import { styled } from "@mui/material";

interface Props {
  text: string;
}

/**
 * Gre text.
 */
export const Grey: React.FC<Props> = ({ text }) => <Text>{text}</Text>;

const Text = styled("span")(({ theme }) => ({
  color: theme.palette.brand.grey,
}));
